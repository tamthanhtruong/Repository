import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { ProductCreateRequest, ProductUpdateRequest } from '../src/interface/product/product.request';
import { HttpStatus } from '@nestjs/common';
import { app,database,timer } from './constants';

beforeAll( async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Product Class_e2e Test: ', () => {

  const productCreate: ProductCreateRequest = {
    categoryId: '5f64ce7cb089dc44284dad30',
    unitProductId: '5f64cf79b089dc44284dad39',
    name: 'Linh',
    code: '45',
    originPrice: 12,
    price: 100,
    image: 'anh',
    information: 'hinh',
    evaluation: 'hinh',
    status: 'Exist'
  };
  const productUpdate: ProductUpdateRequest = {
    categoryId: '5f64ce7cb089dc44284dad30',
    unitProductId: '5f64cf79b089dc44284dad39',
    originPrice: 12,
    price: 56,
    image: 'Chân dung',
    information: 'Hình ảnh',
    evaluation: 'Chất lượng',
    status: 'Exist'
  };
  let productId: string;

  it('create() function : ', () => {
    return request(app)
      .post('product/create')
      .set('Accept', 'application/json')
      .send(productCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        productId = body._id;
        expect(body.categoryId).toEqual(productCreate.categoryId);
        expect(body.unitProductId).toEqual(productCreate.unitProductId);
        expect(body.name).toEqual(productCreate.name);
        expect(body.status).toEqual(productCreate.status);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('product/get-all')
      .expect(200);
  });

  it('getAllExist() function :', () => {
    return request(app)
      .get('product/get-all-exist')
      .expect(200);
  });

  it('getAllNoExist() function :', () => {
    return request(app)
      .get('product/get-all-no_exist')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`product/get-single/${productId}`)
      .expect(({body}) => {
        expect(body.categoryId).toEqual(productCreate.categoryId);
        expect(body.unitProductId).toEqual(productCreate.unitProductId);
        expect(body.name).toEqual(productCreate.name);
        expect(body.status).toEqual(productCreate.status);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`product/update/${productId}`)
      .set('Accept', 'application/json')
      .send(productUpdate)
      .expect(({body}) => {
        expect(body.categoryId).toEqual(productCreate.categoryId);
        expect(body.image).not.toEqual(productCreate.image);
        expect(body.information).not.toEqual(productCreate.information);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`product/delete/${productId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('product/get-all-soft-delete')
      .expect(200);
  });
});
