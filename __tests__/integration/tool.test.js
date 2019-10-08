import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
// import factory from '../factories';

describe('Tool', () => {
  beforeEach(async () => {
    await truncate();
  });

  const tool = {
    title: 'Notion',
    link: 'https://notion.so',
    description:
      'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
    tags: ['organization', 'planning', 'collaboration', 'writing', 'calendar'],
  };

  const toolNode = {
    title: 'json-server',
    link: 'https://github.com/typicode/json-server',
    description:
      'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
    tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
  };

  it('should be able to create tool', async () => {
    const response = await request(app)
      .post('/tools')
      .send(tool);

    expect(response.status).toBe(201);
  });

  it('should be able to list tools', async () => {
    await request(app)
      .post('/tools')
      .send(tool);

    const response = await request(app).get('/tools');

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        link: expect.any(String),
        tags: expect.any(Array),
        description: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );

    expect(response.status).toBe(200);
  });

  it('should be  to filter tools by tag', async () => {
    await request(app)
      .post('/tools')
      .send(tool);

    await request(app)
      .post('/tools')
      .send(toolNode);

    const response = await request(app).get('/tools?tag=node');

    expect(response.body.length).toBe(1);
    expect(response.body[0].tags).toContain('node');
  });

  it('should be to remove tools by id', async () => {
    const {
      body: { id },
    } = await request(app)
      .post('/tools')
      .send(tool);

    const response = await request(app).delete(`/tools/${id}`);

    expect(response.status).toBe(204);
  });
});
