import { Router } from 'express';

const router = Router();

router.get('/example', (req, res) => {
  res.send({
    example: 'Hello, this is an example',
  });
});

export default router;
