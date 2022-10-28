import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// @Injectable()
// export class FeatureService {
//   constructor(private readonly configService: ConfigService) {}

//   someFunction(param: string) {
//     const port = this.configService.get<number>('port');
//   }

//   someOtherFunction(param: string) {
//     const pokemonAPIKey = this.configService.get<string>('pokemonService.apiKey');
//   }
// }

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;
  // let config: ConfigService;

  // console.log(`app.module process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  // console.log(`app.module process.env.MONGO_DSN: ${process.env.MONGO_DSN}`);

  beforeEach(async () => {
    // const uri = `mongodb://root:root@db_prod:27017/tweets_service_test?authSource=admin`;
    // const uri = `mongodb://root:root@db:27017/tweets_service_test?authSource=admin`;
    const uri = `mongodb://root:root@localhost:27017/tweets_service_test?authSource=admin`;
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();
    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Hello World',
      screen_name: 'Luiz Carlos',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Luiz Carlos');

    const tweetCreated = await service['tweetModel'].findById(tweet._id);
    expect(tweetCreated.content).toBe('Hello World');
    expect(tweetCreated.screen_name).toBe('Luiz Carlos');
  });

  it('should find all tweets', async () => {
    // criar um tweet
    // const tweets = await service.findAll();
  });

  it('should find one tweet', async () => {
    // criar um tweet
    // const tweet = await service.findOne();
  });
});
