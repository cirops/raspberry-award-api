import { Movie } from '../../modules/movie/models/movie';
import { MovieRepository } from '../../modules/movie/repositories/movie.repository';
import { seedDatabase } from '../../shared/database/seed-database';
import {
  CsvMovieRow,
  parseCsv,
} from '../../shared/providers/csv-parser.provider';

let csvMovies: CsvMovieRow[] = [];
let dbMovies: Movie[] = [];
let movieRepository: MovieRepository;
beforeAll(async () => {
  await seedDatabase();
  csvMovies = await parseCsv();
  movieRepository = new MovieRepository();
  dbMovies = movieRepository.findAll() as Movie[];
});

describe('CSV to Database Imports', () => {
  it('should match all fields from CSV to database', () => {
    expect(dbMovies.length).toBe(csvMovies.length);
    for (const dbMovie of dbMovies) {
      const csvMovie = csvMovies.find((csvM) => csvM.title === dbMovie.title);
      expect(csvMovie).toBeDefined();
      expect(csvMovie?.producers).toBe(dbMovie.producers);
      expect(csvMovie?.studios).toBe(dbMovie.studios);
      expect(csvMovie?.winner).toBe(dbMovie.winner);
      expect(csvMovie?.year).toBe(dbMovie.year);
    }
  });
});
