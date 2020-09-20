import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../src/interface/product/category/category.request';

beforeAll( async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll( async done => {
  await mongoose.disconnect(done);
});

describe( 'Category_e2e Test: ', () => {
  const categoryCreate: CategoryCreateRequest = {
    name: 'Keo xịt tóc',
    status: 'Exist'
  };
  const categoryUpdate: CategoryUpdateRequest = {
    name: 'Keo xịt tóc',
    status: 'No_exist',
  };
  let categoryId: string;

  it('create() function: ', () => {
    return request(app)
      .post('category/create')
      .set('Accept', 'application/json')
      .send(categoryCreate)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        categoryId = body._id;
        expect(body.name).toEqual(categoryCreate.name);
        expect(body.status).toEqual(categoryCreate.status);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('category/get-all')
      .expect(200);
  });

  it('getAllExist() function :', () => {
    return request(app)
      .get('category/get-all-exist')
      .expect(200);
  });

  it('getAllNoExist() function :', () => {
    return request(app)
      .get('category/get-all-no_exist')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`category/get-single/${categoryId}`)
      .expect(({body}) => {
        expect(body.name).toEqual(categoryCreate.name);
        expect(body.status).toEqual(categoryCreate.status);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`category/update/${categoryId}`)
      .set('Accept', 'application/json')
      .send(categoryUpdate)
      .expect(({body}) => {
        expect(body.name).toEqual(categoryCreate.name);
        expect(body.status).not.toEqual(categoryCreate.status);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`category/delete/${categoryId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('category/get-all-soft-delete')
      .expect(200);
  })
});
