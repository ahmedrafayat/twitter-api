import { Router } from 'express';

import { follow, listFollowers } from 'controllers/users';

const router = Router();

router.post('/follow/:id', follow);
router.get('/followers/:id', listFollowers);

export default router;
