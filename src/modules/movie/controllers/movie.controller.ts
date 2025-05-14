import { Request, Response } from 'express';

import { MovieRepository } from '../repositories/movie.repository';
import { GetAllMoviesUseCase } from '../use-cases/get-all-movies.use-case';
import { GetAwardIntervalsUseCase } from '../use-cases/get-award-intervals.use-case';

export function listMovies(_: Request, res: Response) {
  const movieRepository = new MovieRepository();
  const useCase = new GetAllMoviesUseCase(movieRepository);
  const result = useCase.execute();

  res.json(result);
}

export function getMovieAwardIntervals(_: Request, res: Response) {
  const movieRepository = new MovieRepository();
  const useCase = new GetAwardIntervalsUseCase(movieRepository);
  const result = useCase.execute();

  res.json(result);
}
