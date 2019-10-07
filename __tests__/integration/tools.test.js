import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Tools', () => {
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

    expect(response.body).toEqual({ id: 1, ...tool });
  });

  it('should be  to filter tools by tag', async () => {
    await request(app)
      .post('/tools')
      .send(tool);

    await request(app)
      .post('/tools')
      .send(toolNode);

    const response = await request(app).get('/tools?tag=node');

    expect(response.body).toEqual([{ id: 2, ...toolNode }]);
  });

  it('should be to remove tools by id', async () => {
    await request(app)
      .post('/tools')
      .send(tool);

    const response = await request(app).delete(`/tools/${1}`);

    expect(response.status).toBe(204);
  });
});
