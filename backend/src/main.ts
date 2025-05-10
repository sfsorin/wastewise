import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@utils/logger.util';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.info(`Aplicația rulează pe: http://localhost:${port}`);
  logger.info(`Documentație API: http://localhost:${port}/api`);
}
bootstrap();
