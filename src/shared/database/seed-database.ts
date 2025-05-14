import { db } from './index';
import { parseCsv, CsvMovieRow } from '../providers/csv-parser.provider';

export async function seedDatabase() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner BOOLEAN
    )
  `
  ).run();

  const insert = db.prepare(`
    INSERT INTO movies (year, title, studios, producers, winner)
    VALUES (@year, @title, @studios, @producers, @winner)
  `);

  const insertMany = db.transaction((movies: CsvMovieRow[]) => {
    for (const movie of movies) {
      insert.run({
        ...movie,
        winner: movie.winner ? 1 : 0,
      });
    }
  });

  try {
    const rows = await parseCsv();

    let batch: CsvMovieRow[] = [];

    for (const movie of rows) {
      batch.push(movie);

      if (batch.length >= 100) {
        insertMany(batch);
        batch = [];
      }
    }

    if (batch.length > 0) {
      insertMany(batch);
    }

    console.info('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error occurred while seeding the database:', error);
  }
}
