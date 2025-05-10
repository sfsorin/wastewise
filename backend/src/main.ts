import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import { Logger } from '@utils/logger.util';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Obține configurația
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');

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
  app.enableCors();

  // Pornire server
  const port = appConfig.port;
  await app.listen(port);

  logger.info(`Aplicația rulează pe: http://localhost:${port}`);
  logger.info(`Documentație API: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
