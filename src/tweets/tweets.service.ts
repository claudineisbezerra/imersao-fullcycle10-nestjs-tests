import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet, TweetDocument } from './entities/tweet.entity';

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

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private tweetModel: Model<TweetDocument>,
    private readonly configService: ConfigService,
  ) {}

  async create(createTweetDto: CreateTweetDto) {
    console.log('TweetsService.create()');
    // console.log('TweetsService.create()', configService);
    const tweetDoc = new this.tweetModel(createTweetDto);
    await tweetDoc.save();
    return tweetDoc;
  }

  findAll() {
    return this.tweetModel.find().exec();
  }

  findOne(id: string) {
    return this.tweetModel.findById(id).exec();
  }

  update(id: string, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: string) {
    return `This action removes a #${id} tweet`;
  }
}
