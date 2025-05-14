import request from 'supertest';

import { app } from '../../app';
import { seedDatabase } from '../../shared/database/seed-database';

beforeAll(() => {
  seedDatabase();
});

describe('GET /movies/intervals', () => {
  it('should return min and max intervals', async () => {
    const response = await request(app).get('/movies/intervals');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);

    for (const entry of response.body.min) {
      expect(entry).toHaveProperty('producer');
      expect(entry).toHaveProperty('interval');
      expect(entry).toHaveProperty('previousWin');
      expect(entry).toHaveProperty('followingWin');
    }
  });
});
