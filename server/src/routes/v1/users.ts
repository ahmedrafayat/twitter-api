import { Router } from 'express';

import { follow, followers } from 'controllers/users';
import { validateFollowUser } from 'middlewares/request-validation/users';
import { validateJwt } from 'middlewares/validateJwt';

const router = Router();

router.post('/follow/:id', [validateJwt, validateFollowUser], follow);
router.get('/followers', [validateJwt], followers);

export default router;
