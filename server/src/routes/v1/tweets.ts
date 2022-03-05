import { Router } from 'express';

import { create, listFollowing, listown } from 'controllers/tweets';
import { validateCreateTweet } from 'middlewares/request-validation/tweets';
import { validateJwt } from 'middlewares/validateJwt';

const router = Router();

router.post('/create', [validateJwt, validateCreateTweet], create);
router.get('/listown', [validateJwt], listown);
router.get('/listfollowers', [validateJwt], listFollowing);

export default router;
