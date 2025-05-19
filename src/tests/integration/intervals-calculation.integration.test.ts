import request from 'supertest';

import { app } from '../../app';
import { seedDatabase } from '../../shared/database/seed-database';

beforeAll(async () => {
  await seedDatabase();
});

describe('GET /movies/intervals', () => {
  it('should return the expected min and max producer intervals', async () => {
    const response = await request(app).get('/movies/intervals');
    expect(response.status).toBe(200);

    const expected = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };

    expect(response.body).toEqual(expected);
  });
});
