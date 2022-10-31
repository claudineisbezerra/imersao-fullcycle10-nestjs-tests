import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, ConfigService],
  exports: [TweetsService],
})
export class TweetsModule {}
