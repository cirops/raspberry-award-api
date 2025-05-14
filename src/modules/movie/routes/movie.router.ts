import { Router } from 'express';

import { getMovieAwardIntervals } from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/intervals', getMovieAwardIntervals);

export { movieRouter };
