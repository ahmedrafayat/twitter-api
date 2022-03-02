import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { Tweet } from 'typeorm/entities/Tweet';
import { User } from 'typeorm/entities/User';
import { UserFollowing } from 'typeorm/entities/UserFollowing';

export const listFollowing = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user.id;

  try {
    const tweets = await getManager()
      .createQueryBuilder(User, 'u')
      .select(['t.id id', 't.content content', 't.author_id authorId'])
      .innerJoin(UserFollowing, 'uf', 'uf.follower_id = u.id')
      .innerJoin(Tweet, 't', 't.author_id = uf.following_id')
      .where('u.id = :ownerId', { ownerId })
      .orderBy('t.created_at', 'DESC')
      .getRawMany();

    res.send(tweets);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    next(customError);
  }
};
