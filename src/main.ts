import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend requests
  app.enableCors({
    origin: 'http://localhost:5173', // Change to match your frontend URL
    credentials: true,
  });

  await app.listen(3001);
  console.log('🚀 Server is running on http://localhost:3001');
}
bootstrap();