import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { router } from './shared/routes';
const swaggerDocument = YAML.load(
  path.resolve(__dirname, './shared/docs/swagger.yaml')
);

const app = express();

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })
);

app.use(router);

export { app };
