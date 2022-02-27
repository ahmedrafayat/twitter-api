import 'dotenv/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConnectionOptions } from 'typeorm-seeding';

const config: ConnectionOptions = {
  type: 'mysql',
  charset: 'utf8mb4',
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
  seeds: ['src/typeorm/seeds/**/*{.ts,.js}'],
  factories: ['src/typeorm/factories/**/*{.ts,.js}'],
};

export = config;
