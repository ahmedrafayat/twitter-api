import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { UserFollowing } from 'typeorm/entities/UserFollowing';

export const followers = async (req: Request, res: Response, next: NextFunction) => {
  const actorId = req.user.id;

  try {
    const followers = await getRepository(UserFollowing).find({
      where: { followingId: actorId },
      select: ['follower'],
    });

    res.send(followers);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    next(customError);
  }
};
