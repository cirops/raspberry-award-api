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
});

export const env = envSchema.parse(process.env);
