import { db } from '../../../shared/database';
import { Movie } from '../models/movie';

export class MovieRepository {
  findAll(): Movie[] {
    const rows = db
      .prepare(
        `
        SELECT id, year, title, studios, producers, winner
        FROM movies
        WHERE winner = 1
        ORDER BY title ASC
      `
      )
      .all();

    return rows.map(Movie.fromRow);
  }

  findWinningProducers(): { producers: string; year: number }[] {
    const rows = db
      .prepare(
        `
        SELECT producers, year
        FROM movies
        WHERE winner = 1
        ORDER BY year ASC
      `
      )
      .all();

    return rows.map(Movie.fromRow);
  }
}
