import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Tools', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create tools', async () => {});
});
