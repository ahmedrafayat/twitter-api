import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { User } from 'typeorm/entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10, { password: 'twitter123' });
  }
}
