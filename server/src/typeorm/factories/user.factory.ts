import Faker, { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { User } from 'typeorm/entities/User';

define(User, () => {
  const name = faker.name.findName();

  const user = new User();
  user.email = faker.internet.email();
  user.name = name;
  user.username = name.toLocaleLowerCase().split(' ').join('_');
  user.password = faker.random.word();
  return user;
});
