import { Movie } from '../models/movie';
import { MovieRepository } from '../repositories/movie.repository';

type Output = {
  movies: Movie[];
};

export class GetAllMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}
  execute(): Output {
    const movies = this.movieRepository.findAll();
    return { movies };
  }
}
