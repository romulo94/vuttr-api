import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Rômulo Rocha',
        email: 'romulorocha063@gmail.com',
        password: '123',
        password_hash: '123',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Rômulo Rocha',
        email: 'romulorocha063@gmail.com',
        password: '123',
        password_hash: '123',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Rômulo Rocha',
        email: 'romulorocha063@gmail.com',
        password: '123',
        password_hash: '123',
      });

    expect(response.status).toBe(400);
  });
});
