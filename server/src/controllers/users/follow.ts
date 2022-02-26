import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserFollowing } from 'typeorm/entities/Follower';

export const follow = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: ownerId will be removed once authentication is set up
  const { ownerId } = req.body;
  const { id } = req.params;

  try {
    const followingRepository = getRepository(UserFollowing);
    const newUserFollowing = new UserFollowing();
    newUserFollowing.followerId = ownerId;
    newUserFollowing.followingId = Number(id);

    const savedFollow = await followingRepository.save(newUserFollowing);
    res.sendStatus(200).send('success');
  } catch (err) {}
};
