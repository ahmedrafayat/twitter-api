import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const userRepository = getRepository(User);

  try {
    const result = await userRepository.delete(id);
    console.log('🚀 ~ file: delete.ts ~ line 11 ~ remove ~ result', result);
    res.send('success');
  } catch (err) {
    console.error(err);
  }
};
