import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`bootstrap process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`bootstrap process.env.MONGO_DSN: ${process.env.MONGO_DSN}`);

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  // await app.listen(3000);
}
bootstrap();
