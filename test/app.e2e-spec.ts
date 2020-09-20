import * as request from 'supertest';
import { app } from './constants';

describe('AppController (e2e)', () => {

  it('/app (GET)', () => {
    return request(app)
      .get('app')
      .expect(200)
      .expect('Hello World!');
  });
});
