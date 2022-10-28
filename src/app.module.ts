import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';

// banco de dados é criado se não existe
// console.log(`app.module process.env: ${process.env}`);
// console.log(process.env);
console.log(`app.module process.env.NODE_ENV: ${process.env.NODE_ENV}`);
const dir = join(__dirname, '..', `.${process.env.NODE_ENV}.env`);
console.log(`app.module dir: ${dir}`);

// console.log(`DIR: ${process.env`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', `.${process.env.NODE_ENV}.env`),
        // join(__dirname, '..', '.env'),
      ],
    }),
    MongooseModule.forRoot(process.env.MONGO_DSN),
    TweetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//tweets - CRUD

//Root - AppModule

//tweetsmodule
