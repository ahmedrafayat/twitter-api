import { Router } from 'express';

import auth from './auth';
import tweets from './tweets';
import users from './users';

const router = Router();

router.use('/auth', auth);

router.use('/tweets', tweets);

router.use('/users', users);

export default router;
