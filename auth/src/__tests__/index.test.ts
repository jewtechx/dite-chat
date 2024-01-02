import { app } from '../app';
import request from 'supertest';

it('Should return 200 success', async () => {
  await request(app).get('/healthcheck');
});
