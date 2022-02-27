import { Router } from 'express';

import { follow, listFollowers } from 'controllers/users';
import { validateJwt } from 'middlewares/ValidateJwt';

const router = Router();

router.post('/follow/:id', [validateJwt], follow);
router.get('/followers/:id', [validateJwt], listFollowers);

export default router;
