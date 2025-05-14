import path from 'path';

import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { router } from './shared/routes';

const app = express();

app.use(router);

export { app };
