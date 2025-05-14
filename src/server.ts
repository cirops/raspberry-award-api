import path from 'path';

import dotenv from 'dotenv';

import { app } from './app';
import { env } from './shared/config/env';
import { seedDatabase } from './shared/database/seed-database';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function start() {
  try {
    await seedDatabase();

    app.listen(env.PORT, () => {
      console.info(`Server is running on port ${env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
