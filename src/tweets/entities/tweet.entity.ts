// import { ConfigModule, ConfigService } from '@nestjs/config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TweetDocument = Tweet & Document;

export type TweetProps = {
  content: string;
  screen_name: string;
};

@Schema()
// export default (configService: ConfigService) =>
//   new mongoose.Schema({
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: User.name,
//     },
//     createdAt: {
//       type: mongoose.Schema.Types.Date,
//       default: Date.now,
//       expires:
//         ms(configService.get<string>('auth.jwtRefreshTokenExpiresIn')) / 1000,
//     },
//   });
export class Tweet {
  constructor(props: TweetProps) {
    // console.log('tweet.entity: ', configService);
    // console.log('tweet.entity: ', this.configService);
    // private configService: configService: ConfigService;

    Object.assign(this, props);
  }

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  screen_name: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
