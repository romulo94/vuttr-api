import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('it should be able to register', async () => {
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
});
