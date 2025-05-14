import { Router } from 'express';

import { movieRouter } from '../../modules/movie/routes/movie.router';

const router = Router();

router.use('/movies', movieRouter);

export { router };
