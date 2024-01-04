import { app } from '../../app';
import request from 'supertest';

beforeAll(() => {
  // connect database
});

beforeEach(() => {
  // clean up database
});

afterAll(() => {
  // disconnect database
});

it('should return 405 for non post request sign up route', async () => {});

it('should return 422 if the email is not valid', async () => {
  await request(app)
  .post('/api/auth/signup')
  .send({})
  .expect(422)

  await request(app)
  .post('/api/auth/signup')
  .send({email:"invalidemail"})
  .expect(422)
});
