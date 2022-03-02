import 'dotenv/config';
import devConfig from './ormconfig.dev';

const testConfig: any = { ...devConfig, database: process.env.MYSQL_TEST_DATABASE };

export = testConfig;
