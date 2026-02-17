import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { appEnv } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Разрешаем CORS для фронта Render
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(appEnv.port, '0.0.0.0');
}
bootstrap();
