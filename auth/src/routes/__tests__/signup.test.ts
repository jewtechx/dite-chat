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

const SIGNUP_ROUTE = '/api/auth/signup';

describe('Test sign up route method availability', () => {
  let password = '';
  let email = '';

  beforeAll(() => {
    email = 'test@test.com';
    password = 'Ajhjhfd123';
  });

  it('should return 405 for GET,PUT,PATCH,DELETE request sign up route', async () => {
    await request(app).get(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).put(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app)
      .patch(SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
    await request(app)
      .delete(SIGNUP_ROUTE)
      .send({ email, password })
      .expect(405);
  });

  it('should return 200 for a post request', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password }).expect(200);

    await request(app)
      .options(SIGNUP_ROUTE)
      .send({ email, password })
      .expect(200);
  });
});

describe('Test email validity', () => {
  let password = '';

  beforeAll(() => {
    password = 'validPass1';
  });
  /**
   * Valid email conditions
   *  - Standard email formats from the express validator package
   */
  it('should return 422 if the email is not valid', async () => {
    await request(app).post(SIGNUP_ROUTE).send({}).expect(422);

    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: 'invalidemail', password })
      .expect(422);
  });

  it('should return 200 if email is valid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email: 'test@example.com',
        password,
      })
      .expect(200);
  });

  it('should return POST as the only allowed header from an options request', async () => {
    const response = await request(app).options(SIGNUP_ROUTE).expect(200);
    expect(response.get('access-control-allowed-methods')).toContain('POST');
  });
});

describe('Test password validity', () => {
  let email = '';

  beforeAll(() => {
    email = 'test@test.com';
  });
  /**
   * valid password condition
   *  - atleast 8 characters
   *  - atmost 32 characters
   *  - one lower case letter
   *  - one uppercase letter
   *  - one number
   */

  it('should return 200 is password is valid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: 'validPass123',
      })
      .expect(200);
  });

  it('should return 422 if the password was not provided', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
      })
      .expect(422);
  });

  it('should return 422 if the password contains less than 8 characters', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: '1234',
      })
      .expect(422);
  });

  it('should return 422 if the password contains more than 32 characters', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: '12345hjaskdicjdksjhkjsdshkdjhjASASsdc',
      })
      .expect(422);
  });
  it('should return 422 if the password does not contain one lower-case letter', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: 'VALID12323',
      })
      .expect(422);
  });
  it('should return 422 if the password does not contain one upper-case letter', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: '12345hjaskdicj',
      })
      .expect(422);
  });
  it('should return 422 if the password does not contain a number', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({
        email,
        password: 'hjaskdiAAjdksjhkjsds',
      })
      .expect(422);
  });
});
