import { Router } from 'express';

import { create, listFollowing, listown } from 'controllers/tweets';

const router = Router();

router.post('/create', create);
router.post('/listown', listown);
router.post('/listfollowers', listFollowing);

export default router;
