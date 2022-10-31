import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../../../config/configuration';
import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';

describe('Tweet Tests', () => {
  //Testes de unidade
  describe('Tweet Class', () => {
    it('should create a tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'Luiz Carlos',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('Luiz Carlos');
    });
  });

  //teste de integração com DB- menos rapido e mais custoso que unitario
  describe('Using MongoDB', () => {
    let service: ConfigService;
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: [
              join(__dirname, '../config/env/', `.${process.env.NODE_ENV}.env`),
            ],
            load: [configuration],
          }),
        ],
        providers: [ConfigService],
      }).compile();

      service = moduleRef.get<ConfigService>(ConfigService);
      conn = await mongoose.connect(service.get<string>('MONGO_DSN'));
    });

    afterEach(async () => {
      await conn.disconnect();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('create a tweet document', async () => {
      const TweetModel = conn.model('Tweet', TweetSchema);
      const tweet = new TweetModel({
        content: 'Hello World',
        screen_name: 'Luiz Carlos',
      });
      await tweet.save();

      const tweetCreated = await TweetModel.findById(tweet._id);

      expect(tweetCreated.content).toBe('Hello World');
      expect(tweetCreated.screen_name).toBe('Luiz Carlos');
    });
  });
});
