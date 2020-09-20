import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { CoreStoreModule } from './core/core-store.module';
const logger = new Logger('Bootstrap');
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(CoreStoreModule), { fallbackOnErrors: true });
  await app.listenAsync(process.env.PORT_APP);
}

bootstrap().then(() => logger.verbose('Project-sale API server bootstrapped.'));
