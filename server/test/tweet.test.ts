import { faker } from '@faker-js/faker';
import { expect } from 'chai';
import { agent } from 'supertest';
import { Connection, getRepository, Repository } from 'typeorm';

import { app } from '../src';
import { dbCreateConnection } from '../src/typeorm/connect';
import { Tweet } from '../src/typeorm/entities/Tweet';
import { User } from '../src/typeorm/entities/User';
import { UserFollowing } from '../src/typeorm/entities/UserFollowing';

describe('Users api', () => {
  let dbConnection: Connection;
  let tweetRepository: Repository<Tweet>;
  let userRepository: Repository<User>;
  let userFollowingRepository: Repository<UserFollowing>;

  let user1Token = null;
  let savedUser1 = null;
  const userPassword = 'password_test';
  const user1 = User.createUser('John Doe', 'John.Doe@gmail.com', userPassword);

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
    tweetRepository = getRepository(Tweet);
    userFollowingRepository = getRepository(UserFollowing);
  });

  after(async () => {
    await dbConnection.close();
  });

  beforeEach(async () => {
    savedUser1 = await userRepository.save(user1);
    const res = await agent(app).post('/v1/auth/login').send({ email: user1.email, password: userPassword });
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

  describe('Create Tweet /v1/tweets/listfollowers', async () => {
    let following1: User | null, following2: User | null, following3: User | null;
    following1 = following2 = following3 = null;

    let tweets: Tweet[] | null = null;
    beforeEach(async () => {
      [following1, following2, following3] = await userRepository.save([
        User.createUser(`${faker.name.firstName()} ${faker.name.lastName()}`, faker.internet.email(), userPassword),
        User.createUser(`${faker.name.firstName()} ${faker.name.lastName()}`, faker.internet.email(), userPassword),
        User.createUser(`${faker.name.firstName()} ${faker.name.lastName()}`, faker.internet.email(), userPassword),
      ]);
      tweets = await tweetRepository.save([
        Tweet.createTweet(faker.lorem.paragraph(5), following1.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following1.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following1.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following2.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following2.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following2.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following2.id),
        Tweet.createTweet(faker.lorem.paragraph(5), following3.id),
      ]);
      const followings = await userFollowingRepository.save([
        UserFollowing.createFollowing(savedUser1.id, following1.id),
        UserFollowing.createFollowing(savedUser1.id, following2.id),
        UserFollowing.createFollowing(savedUser1.id, following3.id),
      ]);
    });

    afterEach(async () => {
      await userRepository.delete([following1.id, following2.id, following3.id]);
      following1 = following2 = following3 = null;
      tweets = null;
    });

    it('should list tweets of users that actor is following', async () => {
      const res = await agent(app).get('/v1/tweets/listfollowers').set('Authorization', `Bearer ${user1Token}`);

      expect(res.body.length).to.equal(tweets.length);
    });
  });
});
