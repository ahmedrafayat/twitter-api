import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { UserFollowing } from 'typeorm/entities/Follower';

export const listFollowers = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const followers = await getRepository(UserFollowing).find({
      where: { followingId: id },
      select: ['follower', 'following', 'createdAt'],
    });

    res.send(followers);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
