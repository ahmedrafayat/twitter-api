import { expect } from 'chai';
import { agent } from 'supertest';
import { Connection, getRepository, Repository } from 'typeorm';

import { app } from '../src';
import { dbCreateConnection } from '../src/typeorm/connect';
import { Tweet } from '../src/typeorm/entities/Tweet';
import { User } from '../src/typeorm/entities/User';

describe('Users api', () => {
  let dbConnection: Connection;
  let tweetRepository: Repository<Tweet>;
  let userRepository: Repository<User>;

  let user1Token = null;
  let savedUser1 = null;
  const user1Password = 'user1_123';
  const user1 = new User();
  user1.email = 'John.Doe@gmail.com';
  user1.password = user1Password;
  user1.name = 'John Doe';

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
  });

  after(async () => {
    await dbConnection.close();
  });

  beforeEach(async () => {
    savedUser1 = await userRepository.save(user1);
    const res = await agent(app).post('/v1/auth/login').send({ email: user1.email, password: user1Password });
    user1Token = res.body.token;
  });

  afterEach(async () => {
    await userRepository.delete(savedUser1.id);
    user1Token = savedUser1 = null;
  });

  describe('Create Tweet /v1/tweets/create', async () => {
    it('should create a tweet', async () => {
      const content = 'THIS IS a very lArG3 tweet 😄 🥳 🧑🏽 🍊 🍣 ⚾️ 🚎 🖨';
      const res = await agent(app)
        .post('/v1/tweets/create')
        .send({ content })
        .set('Authorization', `Bearer ${user1Token}`);
      expect(res.status).to.equal(200);
      expect(res.body.content).to.equal(content);
    });

    it('should fail to create tweet with less than 5 character', async () => {
      const content = '1 \r 2  3  \n  4 \n\r';
      const res = await agent(app)
        .post('/v1/tweets/create')
        .send({ content })
        .set('Authorization', `Bearer ${user1Token}`);
      expect(res.status).to.equal(400);
    });

    it('should fail with invalid request body', async () => {
      const res = await agent(app).post('/v1/tweets/create').send({}).set('Authorization', `Bearer ${user1Token}`);
      expect(res.status).to.equal(400);
    });
  });
});
