import { User as CustomUser } from 'typeorm/entities/User';

declare global {
  namespace Express {
    interface User extends CustomUser {}

    export interface Request {
      user?: User | undefined;
    }
  }
}
