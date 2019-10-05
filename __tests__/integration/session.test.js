import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return token', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should return "User not found" if user does not exists', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should return "Password is wrong" if password does not match', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: `${user.password}s`,
      });

    expect(response.body).toEqual({ error: 'Password is wrong' });
  });
});
