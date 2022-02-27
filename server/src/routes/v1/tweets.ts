import { Router } from 'express';

import { create, listFollowing, listown } from 'controllers/tweets';
import { validateCreateTweet } from 'middlewares/request-validation/tweets';
import { validateJwt } from 'middlewares/ValidateJwt';

const router = Router();

router.post('/create', [validateJwt, validateCreateTweet], create);
router.post('/listown', [validateJwt], listown);
router.post('/listfollowers', [validateJwt], listFollowing);

export default router;
