import { Router } from 'express';

import tweets from './tweets';
import users from './users';

const router = Router();

router.use('/tweets', tweets);

router.use('/users', users);

export default router;
