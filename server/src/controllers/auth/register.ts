import { Request, Response, NextFunction } from 'express';
import { getRepository, ILike } from 'typeorm';

import { CustomError } from 'response/CustomError';
import { User } from 'typeorm/entities/User';

import { JwtUtils } from './../../utils/JwtUtils';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email: ILike(email) } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `A user with email ${email} already exists`,
      ]);
      return next(customError);
    }

    try {
      const newUser = new User();
      newUser.email = email;
      newUser.name = name;
      newUser.password = password;

      const savedUser = await userRepository.save(newUser);

      const token = JwtUtils.createJwtToken(savedUser);
      res.send({ token });
    } catch (err) {
      const customError = new CustomError(400, 'Raw', 'Failed to create user', [
        `Failed to create user with email ${email}`,
      ]);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
