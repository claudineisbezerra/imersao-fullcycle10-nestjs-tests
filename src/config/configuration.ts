const nodeEnv = process.env.NODE_ENV;
const appHost = process.env.APP_HOST || 'localhost';
const appPort = parseInt(process.env.PORT, 10) || 3000;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'root';
const dbHost = process.env.DB_HOST || 'db';
const dbPort = parseInt(process.env.DB_PORT, 10) || 27017;
const dbName = process.env.DB_NAME || 'tweets';
const dbAuthSource = process.env.DB_AUTH_SOURCE || 'admin';

export const configuration = () => ({
  NODE_ENV: nodeEnv,
  APP_HOST: appHost,
  APP_PORT: appPort,
  DB_USER: dbUser,
  DB_PASSWORD: dbPassword,
  DB_HOST: dbHost,
  DB_PORT: dbPort,
  DB_NAME: dbName,
  DB_AUTH_SOURCE: dbAuthSource,
  // MONGO_DSN: `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=${dbAuthSource}`,
  // MONGO_DSN: 'mongodb://root:root@db_prod:27017/tweets?authSource=admin',
  // MONGO_DSN: 'mongodb://root:root@db:27017/tweets?authSource=admin',
  MONGO_DSN: 'mongodb://root:root@db_prod:27017/tweets?authSource=admin',
});
