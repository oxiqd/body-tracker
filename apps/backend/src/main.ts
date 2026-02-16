import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Разрешаем CORS для фронта Render
  app.enableCors({
    origin: [
      'https://frontend-body-tracker.onrender.com', // фронт
      'https://body-tracker.onrender.com', // фронт
      'https://body-tracker-54iq.onrender.com/',
      'http://localhost:5173', // локально
    ],
    credentials: true, // если используешь куки или авторизацию
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
