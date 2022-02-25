import { Router } from 'express';

import tweets from './tweets';

const router = Router();

router.use('/tweets', tweets);

export default router;
