import { Router } from 'express';

import {
  getMovieAwardIntervals,
  listMovies,
} from '../controllers/movie.controller';

const movieRouter = Router();

movieRouter.get('/', listMovies);

movieRouter.get('/intervals', getMovieAwardIntervals);

export { movieRouter };
