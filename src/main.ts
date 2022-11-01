import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appPort = configService.get<string>('APP_PORT');
  await app.listen(appPort ? parseInt(appPort) : 3000);

  const stage = process.env.NODE_ENV;
  const appHost = configService.get<string>('APP_HOST');

  console.log('main NODE_ENV:', configService.get<string>('NODE_ENV'));
  console.log('main DB_HOST:', configService.get<string>('DB_HOST'));
  console.log('main DB_NAME:', configService.get<string>('DB_NAME'));
  console.log('main MONGO_DSN:', configService.get<string>('MONGO_DSN'));

  Logger.log(
    `App is running in ${stage} stage, and it is listening at: http://${appHost}:${appPort}`,
  );
}
bootstrap();
