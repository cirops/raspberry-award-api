import { Router, Request, Response } from 'express';

import { listMovies } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', listMovies);

movieRouter.get('/intervals', function (_: Request, res: Response) {
  res.json([]);
});

export { movieRouter };
