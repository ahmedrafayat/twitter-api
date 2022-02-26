import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';

import { UserFollowing } from 'typeorm/entities/Follower';
import { Tweet } from 'typeorm/entities/Tweet';
import { User } from 'typeorm/entities/User';

export const listFollowing = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: ownerId will be removed once authentication is set up
  const { ownerId } = req.body;

  try {
    const tweets = await getManager()
      .createQueryBuilder(Tweet, 't')
      .innerJoin(UserFollowing, 'uf', 'uf.follower_id = t.author_id')
      .innerJoin(User, 'u', 't.author_id = u.id')
      .where('u.id = :ownerId', { ownerId })
      .orderBy('t.created_at', 'DESC')
      .getMany();

    res.send(tweets);
  } catch (err) {}
};
