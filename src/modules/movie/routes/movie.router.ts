import { Router } from 'express';

import { getAwardIntervals, listMovies } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', listMovies);

movieRouter.get('/intervals', getAwardIntervals);

export { movieRouter };
