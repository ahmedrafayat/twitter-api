import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { Tweet } from 'typeorm/entities/Tweet';
import { User } from 'typeorm/entities/User';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user.id;
  const { content } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne(ownerId);

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id ${ownerId} does not exist`, [
        'User not found.',
      ]);
      return next(customError);
    }

    const tweetRepository = getRepository(Tweet);
    const tweet = Tweet.createTweet(content, user.id);
    const savedTweet = await tweetRepository.save(tweet);
    res.status(200).send({
      id: tweet.id,
      content: tweet.content,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    next(customError);
  }
};
