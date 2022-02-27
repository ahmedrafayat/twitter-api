import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { UserFollowing } from 'typeorm/entities/UserFollowing';

export const follow = async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = req.user.id;
  const { id } = req.params;

  const followingRepository = getRepository(UserFollowing);
  try {
    const isFollowing = await followingRepository.findOne({ where: { followerId: ownerId, followingId: id } });
    if (isFollowing) {
      const customError = new CustomError(400, 'General', 'Already following this user', [
        `Already following user with id ${id}`,
      ]);
      return next(customError);
    }

    const newUserFollowing = new UserFollowing();
    newUserFollowing.followerId = ownerId;
    newUserFollowing.followingId = Number(id);

    await followingRepository.save(newUserFollowing);
    res.status(200).send('success');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
