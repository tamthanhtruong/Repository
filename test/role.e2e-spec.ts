import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { RoleCreateRequest, RoleUpdateRequest } from '../src/interface/user/role/role.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Role Class_e2e Test: ', () => {
  const roleCreate: RoleCreateRequest = {
    name: 'Nhân viên',
    description: 'Bán hàng',
    status: 'Active'
  };
  const roleUpdate: RoleUpdateRequest = {
    name: 'Nhân viên',
    description: 'Bán hàng',
    status: 'Inactive'
  };
  let roleId : string;

  it('create() function : ', () => {
    return request(app)
      .post('role/create')
      .set('Accept', 'application/json')
      .send(roleCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        roleId = body._id;
        expect(body.name).toEqual(roleCreate.name);
        expect(body.description).toEqual(roleCreate.description);
        expect(body.status).toEqual(roleCreate.status);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('role/get-all')
      .expect(200);
  });

  it('getAllActive() function :', () => {
    return request(app)
      .get('role/get-all-active')
      .expect(200);
  });

  it('getAllInactive() function :', () => {
    return request(app)
      .get('role/get-all-inactive')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`role/get-single/${roleId}`)
      .expect(({body}) => {
        expect(body.name).toEqual(roleCreate.name);
        expect(body.description).toEqual(roleCreate.description);
        expect(body.status).toEqual(roleCreate.status);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`role/update/${roleId}`)
      .set('Accept', 'application/json')
      .send(roleUpdate)
      .expect(({body}) => {
        expect(body.name).toEqual(roleCreate.name);
        expect(body.description).toEqual(roleCreate.description);
        expect(body.status).not.toEqual(roleCreate.status);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`role/delete/${roleId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('role/get-all-soft-delete')
      .expect(200);
  })
});
