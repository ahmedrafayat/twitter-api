import { NextFunction, Request, Response } from 'express';
import { getRepository, ILike } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { User } from 'typeorm/entities/User';
import { JwtUtils } from 'utils/JwtUtils';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository
      .createQueryBuilder('users')
      .addSelect('users._password')
      .where({ email: ILike(email) })
      .getOne();

    if (!user || !(await user.validatePassword(password))) {
      const customError = new CustomError(400, 'General', 'Login failed', [`Invalid email address or password`]);
      return next(customError);
    }

    try {
      const token = JwtUtils.createJwtToken(user);
      res.send({ token });
    } catch (err) {
      const customError = new CustomError(500, 'Raw', 'Failed to create authentication token', [
        `Failed to create authentication token, please try again or contact support`,
      ]);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', null, null, err);
    next(customError);
  }
};
