import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { UserFollowing } from 'typeorm/entities/Follower';
import { Tweet } from 'typeorm/entities/Tweet';
import { User } from 'typeorm/entities/User';

export const listFollowing = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user.id;

  try {
    const tweets = await getManager()
      .createQueryBuilder(Tweet, 't')
      .innerJoin(UserFollowing, 'uf', 'uf.follower_id = t.author_id')
      .innerJoin(User, 'u', 't.author_id = u.id')
      .where('u.id = :ownerId', { ownerId })
      .orderBy('t.created_at', 'DESC')
      .getMany();

    res.send(tweets);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    next(customError);
  }
};
