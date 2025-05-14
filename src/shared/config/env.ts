import fs from 'fs';

import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z
    .string()
    .regex(/^[0-9]+$/, 'Only numbers')
    .default('3000')
    .transform((val) => Number(val)),
  CSV_PATH: z
    .string()
    .min(1, 'CSV_PATH must not be empty')
    .refine((val) => val.endsWith('.csv'), {
      message: 'CSV_PATH must point to a .csv file',
    })
    .refine((val) => fs.existsSync(val), {
      message: 'CSV_PATH file does not exist',
    }),
});

export const env = envSchema.parse(process.env);
