import { db } from '../../../shared/database';
import { Movie } from '../models/movie';

export class MovieRepository {
  findAll(): Movie[] {
    const rows = db
      .prepare(
        `
        SELECT id, year, title, studios, producer, winner
        FROM movies
        ORDER BY year ASC
      `
      )
      .all();

    return rows.map(Movie.fromRow);
  }
}
