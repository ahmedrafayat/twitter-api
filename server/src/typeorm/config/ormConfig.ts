import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['src/typeorm/entities/**/*.ts'],
  cli: {
    entitiesDir: 'src/typeorm/entities',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
