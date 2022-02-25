import { Router } from 'express';

import { create, listown } from 'controllers/tweets';
const router = Router();

router.post('/create', create);
router.post('/listown', listown);

export default router;
