import { Router } from 'express';

import { create, listFollowing, listown } from 'controllers/tweets';
import { validateJwt } from 'middlewares/ValidateJwt';

const router = Router();

router.post('/create', [validateJwt], create);
router.post('/listown', listown);
router.post('/listfollowers', listFollowing);

export default router;
