import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';

// banco de dados é criado se não existe
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, './config/env/', `.${process.env.NODE_ENV}.env`),
      ],
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DSN'),
      }),
      inject: [ConfigService],
    }),
    TweetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

//tweets - CRUD

//Root - AppModule

//tweetsmodule
