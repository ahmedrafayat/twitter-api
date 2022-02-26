import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserFollowing } from 'typeorm/entities/Follower';

export const listFollowers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const followers = await getRepository(UserFollowing).find({
    where: { followingId: id },
    select: ['follower', 'following'],
  });

  res.send(followers);
};
