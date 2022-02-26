import { Router } from 'express';

import { listFollowers } from 'controllers/users';

const router = Router();

router.get('/followers/:id', listFollowers);

export default router;
