import User from '../user';

it('should not save a new user if the email is already in the database', async () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'valid123',
  };

  const newUser1 = await User.create({ ...userInfo });
  expect(newUser1).toBeDefined();

  let err: any;
  try {
    await User.create({ ...userInfo });
  } catch (e) {
    err = e;
  }

  expect(err).toBeDefined();
  expect(err.message).toEqual('email is already in the database');
});
