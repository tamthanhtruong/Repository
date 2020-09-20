import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { UserCreateRequest, UserUpdateRequest } from '../src/interface/user/user.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe( 'User Class_e2e Test:', () => {
  const userCreate: UserCreateRequest = {
    roleId: '5f64d0dcb089dc44284dad4a',
    account: 'hong566',
    password: '9878',
    name: 'Hồng',
    sex: 'Female',
    email: 'conan@mail',
    dateOfBirth: '1990',
    address: 'Cà Mau',
    phone: '099922',
    status: 'Active'
  };
  const userUpdate: UserUpdateRequest = {
    roleId: '5f64d0dbb089dc44284dad49',
    account: 'hong566',
    password: '9878',
    name: 'Hồng',
    sex: 'Male',
    email: 'conan@mail',
    dateOfBirth: '1991',
    address: 'Cà Mau',
    phone: '099922',
    status: 'Inactive'
  };
  let userId : string;

  it('create() function: ', () => {
    return request(app)
      .post('user/create')
      .set('Accept', 'application/json')
      .send(userCreate)
      .expect(({body}) => {
        expect(body._id).toBeDefined();
        userId = body._id;
        expect(body.roleId).toEqual(userCreate.roleId);
        expect(body.account).toEqual(userCreate.account);
        expect(body.sex).toEqual(userCreate.sex);
        expect(body.dateOfBirth).toEqual(userCreate.dateOfBirth);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('user/get-all')
      .expect(200);
  });

  it('getAllActive() function :', () => {
    return request(app)
      .get('user/get-all-active')
      .expect(200);
  });

  it('getAllInactive() function :', () => {
    return request(app)
      .get('user/get-all-inactive')
      .expect(200);
  });

  it('getAllMale() function :', () => {
    return request(app)
      .get('user/get-all-male')
      .expect(200);
  });

  it('getAllFemale() function :', () => {
    return request(app)
      .get('user/get-all-female')
      .expect(200);
  });

  it('getAllMaleActive() function :', () => {
    return request(app)
      .get('user/get-all-male-active')
      .expect(200);
  });

  it('getAllFemaleActive() function :', () => {
    return request(app)
      .get('user/get-all-female-active')
      .expect(200);
  });

  it('getAllMaleInactive() function :', () => {
    return request(app)
      .get('user/get-all-male-inactive')
      .expect(200);
  });

  it('getAllFemaleInactive() function :', () => {
    return request(app)
      .get('user/get-all-female-inactive')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`user/get-single/${userId}`)
      .expect(({body}) => {
        expect(body.roleId).toEqual(userCreate.roleId);
        expect(body.account).toEqual(userCreate.account);
        expect(body.sex).toEqual(userCreate.sex);
        expect(body.dateOfBirth).toEqual(userCreate.dateOfBirth);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`user/update/${userId}`)
      .set('Accept', 'application/json')
      .send(userUpdate)
      .expect(({body}) => {
        expect(body.roleId).not.toEqual(userCreate.roleId);
        expect(body.name).toEqual(userCreate.name);
        expect(body.sex).not.toEqual(userCreate.sex);
        expect(body.dateOfBirth).not.toEqual(userCreate.dateOfBirth);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`user/delete/${userId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('user/get-all-soft-delete')
      .expect(200);
  });
});
