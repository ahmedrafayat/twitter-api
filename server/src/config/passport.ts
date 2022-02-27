import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getRepository } from 'typeorm';

import { User } from 'typeorm/entities/User';
import { JwtPayload } from 'types/JwtPayload';

const INVALID_USER_ID = -1;

export default passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    async (jwtPayload: JwtPayload, done) => {
      try {
        const user = await getRepository(User).findOneOrFail(jwtPayload.sub || INVALID_USER_ID);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
