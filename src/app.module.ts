import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';

// Inicializa a aplicação. O banco de dados é criado se não existir.
// console.log('process.cwd(): ', process.cwd());
console.log(join(__dirname));
console.log(join(__dirname, '../config/env/'));
console.log(join(__dirname, '../config/env/', `.${process.env.NODE_ENV}.env`));
const uri = 'mongodb://root:root@db_prod:27017/tweets?authSource=admin';
// const uri = 'mongodb://root:root@db:27017/tweets?authSource=admin';
// const uri = 'mongodb://root:root@localhost:27017/tweets?authSource=admin';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '../config/env/', `.${process.env.NODE_ENV}.env`),
      ],
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    MongooseModule.forRoot(uri),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGO_DSN'),
    //   }),
    //   inject: [ConfigService],
    // }),
    TweetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

//tweets - CRUD

//Root - AppModule

//tweetsmodule
