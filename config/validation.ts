import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  APP_HOST: Joi.string().default('localhost'),
  APP_PORT: Joi.number().default(3000),
});
