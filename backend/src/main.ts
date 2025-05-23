import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import { Logger } from '@utils/logger.util';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';
import { CsrfMiddleware } from './shared/middleware/csrf.middleware';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Obține configurația
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app') as {
    apiPrefix: string;
    apiVersion: string;
    port: number;
  };

  // Configurare prefix API
  const globalPrefix = `${appConfig.apiPrefix}/${appConfig.apiVersion}`;
  app.setGlobalPrefix(globalPrefix);

  // Configurare validare
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurare CORS
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:5173',
    credentials: true,
  });

  // Adăugare middleware pentru cookie-parser
  app.use(cookieParser());

  // Adăugare middleware pentru CSRF
  const csrfMiddleware = new CsrfMiddleware(configService);
  app.use(csrfMiddleware.use.bind(csrfMiddleware));

  // Adăugare middleware pentru redirecționare de la ruta principală
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance() as {
    use: (path: string, handler: (req: Request, res: Response, next: NextFunction) => void) => void;
  };

  expressApp.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
      return res.redirect('/docs');
    }
    next();
  });

  // Configurare Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('WasteWise API')
    .setDescription('API pentru aplicația WasteWise de management al deșeurilor')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('users', 'Operațiuni pentru gestionarea utilizatorilor')
    .addTag('profiles', 'Operațiuni pentru gestionarea profilurilor utilizatorilor')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Pornire server
  const port = appConfig.port;
  await app.listen(port);

  logger.info(`Aplicația rulează pe: http://localhost:${port}`);
  logger.info(`Documentație API: http://localhost:${port}/docs`);
}
void bootstrap();
