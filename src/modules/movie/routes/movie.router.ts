import { Router, Request, Response } from 'express';

const movieRouter = Router();

movieRouter.get('/intervals', function (_: Request, res: Response) {
  res.json([]);
});

export { movieRouter };
