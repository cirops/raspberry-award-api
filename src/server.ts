import path from 'path';

import dotenv from 'dotenv';

import { app } from './app';
import { env } from './shared/config/env';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.listen(env.PORT, () => {
  console.info(`Server is running on port ${env.PORT}`);
});
