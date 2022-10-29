import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;
  let config: ConfigService;

  beforeEach(async () => {
    // const uri = `mongodb://root:root@db_prod:27017/tweets_service_test?authSource=admin`;
    const uri = `mongodb://root:root@db:27017/tweets_service_test?authSource=admin`;
    // const uri = `mongodb://root:root@localhost:27017/tweets_service_test?authSource=admin`;
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService, ConfigService],
    }).compile();
    service = module.get<TweetsService>(TweetsService);
    config = module.get<ConfigService>(ConfigService);

    const MONGO_DSN = config.get<string>('MONGO_DSN');
    console.log(`BEFOREEACH MONGO_DSN: ${MONGO_DSN}`);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const appPort = config.get<number>('APP_PORT', 3000);
    console.log(`SPEC appPort: ${appPort}`);

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
