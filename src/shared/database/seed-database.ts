import { db } from './index';
import { parseCsv, CsvMovieRow } from '../providers/csv-parser.provider';
import { parseProducerNames } from '../utils/parse-producer-names';

export async function seedDatabase() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      title TEXT,
      studios TEXT,
      producer TEXT,
      winner BOOLEAN
    )
  `
  ).run();

  const insert = db.prepare(`
    INSERT INTO movies (year, title, studios, producer, winner)
    VALUES (@year, @title, @studios, @producer, @winner)
  `);

  const insertMany = db.transaction((movies: CsvMovieRow[]) => {
    for (const {
      producers: producersString,
      studios,
      title,
      winner,
      year,
    } of movies) {
      const producers = parseProducerNames(producersString);
      for (const producer of producers) {
        insert.run({
          year,
          title,
          studios,
          producer,
          winner: winner ? 1 : 0,
        });
      }
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
