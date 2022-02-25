import { Router } from 'express';

import { create } from 'controllers/tweets/create';
const router = Router();

router.post('/create', create);

export default router;
