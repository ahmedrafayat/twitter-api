import { Connection, createConnection } from 'typeorm';

import devConfig from 'typeorm/config/ormconfig.dev';
import testConfig from 'typeorm/config/ormconfig.test';

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(process.env.NODE_ENV === 'staging' ? testConfig : devConfig);
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    return conn;
  } catch (err) {
    console.log(err);
  }
  return null;
};
