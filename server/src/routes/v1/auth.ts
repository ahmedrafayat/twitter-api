import { Router } from 'express';

import { login, register } from 'controllers/auth';
import { validateLogin } from 'middlewares/request-validation/auth';
import { validateRegister } from 'middlewares/request-validation/auth/validateRegister';

const router = Router();

router.post('/register', [validateRegister], register);

router.post('/login', [validateLogin], login);

export default router;
