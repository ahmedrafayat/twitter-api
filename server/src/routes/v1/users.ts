import { Router } from 'express';

import { follow, followers } from 'controllers/users';
import { remove } from 'controllers/users/delete';
import { validateFollowUser } from 'middlewares/request-validation/users';
import { validateJwt } from 'middlewares/ValidateJwt';

const router = Router();

router.post('/follow/:id', [validateJwt, validateFollowUser], follow);
router.get('/followers', [validateJwt], followers);

router.post('/delete/:id', [validateJwt], remove);

export default router;
