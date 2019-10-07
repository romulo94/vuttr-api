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

  it('should return "Token is not provided" if missing header authorization', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app).get('/session');

    expect(response.body).toEqual({ error: 'Token is not provided' });
  });

  it('should return "Token is valid" if jwtwebtoken is valid', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const {
      body: { token },
    } = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: user.password,
      });

    // expect(response.body).toHaveProperty('token');

    const response = await request(app)
      .get('/session')
      .set('authorization', `Bearer ${token}`);

    expect(response.body).toEqual({ message: 'Token is valid' });
  });

  it('should return "Token is invalid" if jwtwebtoken is not valid', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .get('/session')
      .set('authorization', `Bearer xxx`);

    expect(response.body).toEqual({ error: 'Token invalid' });
  });
});
