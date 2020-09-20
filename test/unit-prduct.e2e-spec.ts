import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { UnitProductCreateRequest, UnitProductUpdateRequest } from '../src/interface/unit-product/unit-product.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Unit-Product Class_e2e Test:', () => {
  const unitCreate: UnitProductCreateRequest = { name : 'Gói' };
  const unitUpdate: UnitProductUpdateRequest = { name : 'Can'};
  let unitId : string;

  it('create() function: ', () => {
    return request(app)
      .post('unit-product/create')
      .set('Accept', 'application/json')
      .send(unitCreate)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        unitId = body._id;
        expect(body.name).toEqual(unitCreate.name);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('unit-product/get-all')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`unit-product/get-single/${unitId}`)
      .expect(({body}) => {
        expect(body.name).toEqual(unitCreate.name);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`unit-product/update/${unitId}`)
      .set('Accept', 'application/json')
      .send(unitUpdate)
      .expect(({body}) => {
        expect(body.name).not.toEqual(unitCreate.name);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`unit-product/delete/${unitId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('unit-product/get-all-soft-delete')
      .expect(200);
  })
});
