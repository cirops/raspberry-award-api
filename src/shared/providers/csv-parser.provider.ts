import fs from 'node:fs';
import path from 'node:path';

import { parse } from 'csv-parse';
import { z } from 'zod';

import { env } from '../config/env';

const CsvRowSchema = z.object({
  year: z.coerce.number(),
  title: z.string().min(1),
  studios: z.string().min(1),
  producers: z.string().min(1),
  winner: z
    .string()
    .optional()
    .transform((val) => val?.trim().toLowerCase() === 'yes' || false),
});

export type CsvMovieRow = z.infer<typeof CsvRowSchema>;

export async function parseCsv(): Promise<CsvMovieRow[]> {
  const resolvedPath = path.resolve(process.cwd(), env.CSV_PATH);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`CSV file not found at: ${resolvedPath}`);
  }

  const readStream = fs.createReadStream(resolvedPath, { encoding: 'utf-8' });

  const parser = parse({
    delimiter: ';',
    skip_empty_lines: true,
    columns: true,
    trim: true,
  });

  const parsedRows: CsvMovieRow[] = [];
  let lineIndex = 0;

  return new Promise((resolve, reject) => {
    readStream.pipe(parser);

    parser.on('data', (record: unknown) => {
      lineIndex++;

      try {
        const parsedRow = CsvRowSchema.parse(record);
        parsedRows.push(parsedRow);
      } catch (err) {
        console.error(`Error parsing CSV at line ${lineIndex + 1}:`, err);
      }
    });

    parser.on('error', (err) => {
      console.error('Error while parsing CSV:', err);
      reject(err);
    });

    parser.on('end', () => {
      console.info('CSV file has been fully processed.');
      resolve(parsedRows);
    });
  });
}
