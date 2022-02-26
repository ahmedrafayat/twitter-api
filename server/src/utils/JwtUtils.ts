import jwt from 'jsonwebtoken';

import { User } from 'typeorm/entities/User';
export class JwtUtils {
  static createJwtToken(user: User) {
    return jwt.sign(
      { id: user.id, email: user.email, sub: user.id, iss: 'Twitter knockoff' },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }
    );
  }
}
