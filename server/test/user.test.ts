import { expect } from 'chai';
import { describe } from 'mocha';
import { agent } from 'supertest';
import { Connection, getRepository, Repository } from 'typeorm';

import { UserFollowing } from '../src/typeorm/entities/UserFollowing';

import { app } from './../src/index';
import { dbCreateConnection } from './../src/typeorm/connect';
import { User } from './../src/typeorm/entities/User';

describe('Users api', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;
  let userFollowingRepository: Repository<UserFollowing>;

  let user1Token = null;
  let savedUser1 = null;
  const user1Password = 'user1_123';
  const user1 = new User();
  user1.email = 'John.Doe@gmail.com';
  user1.password = user1Password;
  user1.name = 'John Doe';

  let user2Token = null;
  let savedUser2: User | null = null;
  const user2Password = 'user2_123';
  const user2 = new User();
  user2.email = 'Mark.Ruffalo@email.com';
  user2.password = user2Password;
  user2.name = 'Mark Ruffalo';

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
    userFollowingRepository = getRepository(UserFollowing);
  });

  after(async () => {
    await dbConnection.close();
  });

  beforeEach(async () => {
    [savedUser1, savedUser2] = await userRepository.save([user1, user2]);
    let res = await agent(app).post('/v1/auth/login').send({ email: user1.email, password: user1Password });
    user1Token = res.body.token;
    res = await agent(app).post('/v1/auth/login').send({ email: user2.email, password: user2Password });
    user2Token = res.body.token;
  });

  afterEach(async () => {
    await userRepository.delete([savedUser1.id, savedUser2.id]);
    user1Token = user2Token = savedUser1 = savedUser2 = null;
  });

  describe('POST /v1/users/follow/:id', () => {
    it('should follow a user', async () => {
      const followerId = savedUser1.id;
      const followingId = savedUser2.id;
      const res = await agent(app).post(`/v1/users/follow/${followingId}`).set('Authorization', `Bearer ${user1Token}`);
      const following = await userFollowingRepository.findOne({
        where: { followerId: followerId, followingId: followingId },
      });
      expect(res.status).to.equal(200);
      expect(following).to.be.an('object');
      expect(following.followerId).to.equal(followerId);
      expect(following.followingId).to.equal(followingId);
    });
  });
});
