import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`bootstrap process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`bootstrap process.env.MONGO_DSN: ${process.env.MONGO_DSN}`);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('APP_PORT', 3000);
  console.log(`bootstrap appPort: ${appPort}`);

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);

  const stage = process.env.NODE_ENV;
  Logger.log(
    'App is running in "' +
      stage +
      '" stage, and it is listening at: http://localhost:' +
      appPort,
  );
}
bootstrap();
