import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { ImportCreateRequest, ImportUpdateRequest } from '../src/interface/import/import.request';
import { DetailImportCreateRequest } from '../src/interface/import/detail-import/detail-import.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Import Class_e2e Test: ', () => {
  const importCreate: ImportCreateRequest = {
    shipper : 'Hùng',
    invoiceNumber : 5,
    note : 'Nhập hàng',
    createdUserId : '5f64d147b089dc44284dad53',
    accountantUserId : '5f64d147b089dc44284dad53',
    accConfirmedDate : 2020,
    stockKeeperUserId : '5f64d147b089dc44284dad53',
    stockConfirmedDate : 2020,
    status : 'Lock'
  };
  const importUpdate: ImportUpdateRequest = {
    shipper : 'Nam',
    invoiceNumber : 5,
    note : 'Nhập hàng',
    createdUserId : '5f64d147b089dc44284dad53',
    accountantUserId : '5f64d147b089dc44284dad53',
    accConfirmedDate : 2020,
    stockKeeperUserId : '5f64d147b089dc44284dad53',
    stockConfirmedDate : 2020,
    status : 'Imported'
  };
  let importId : string;

  const detailCreate: DetailImportCreateRequest = {
    importId : '5f6707264fa22a0734cb4dcc',
    productId : '5f64d03fb089dc44284dad44',
    unitProductId : '5f64cfa6b089dc44284dad3f',
    quantity : 600,
    price : 90
  };
  let detailId : string;

  /*---------- Import Service Code ----------*/
  it('create() function : ', () => {
    return request(app)
      .post('import/create')
      .set('Accept', 'application/json')
      .send(importCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        importId = body._id;
        expect(body.shipper).toEqual(importCreate.shipper);
        expect(body.invoiceNumber).toEqual(importCreate.invoiceNumber);
        expect(body.status).toEqual(importCreate.status);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('import/get-all')
      .expect(200);
  });

  it('getAllLock() function :', () => {
    return request(app)
      .get('import/get-all-lock')
      .expect(200);
  });

  it('getAllOpen() function :', () => {
    return request(app)
      .get('import/get-all-open')
      .expect(200);
  });

  it('getAllPaid() function :', () => {
    return request(app)
      .get('import/get-all-paid')
      .expect(200);
  });

  it('getAllImported() function :', () => {
    return request(app)
      .get('import/get-all-imported')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`import/get-single/${importId}`)
      .expect(({body}) => {
        expect(body.shipper).toEqual(importCreate.shipper);
        expect(body.invoiceNumber).toEqual(importCreate.invoiceNumber);
        expect(body.status).toEqual(importCreate.status);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`import/update/${importId}`)
      .set('Accept', 'application/json')
      .send(importUpdate)
      .expect(({body}) => {
        expect(body.shipper).not.toEqual(importCreate.shipper);
        expect(body.invoiceNumber).toEqual(importCreate.invoiceNumber);
        expect(body.status).not.toEqual(importCreate.status);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`import/delete/${importId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('import/get-all-soft-delete')
      .expect(200);
  });

  /*---------- Detail-Import Service Code ----------*/

  it('createDetailImport() function : ', () => {
    return request(app)
      .post('import/detail-import/create')
      .set('Accept', 'application/json')
      .send(detailCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        detailId = body._id;
        expect(body.importId).toEqual(detailCreate.importId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAllDetailImport() function :', () => {
    return request(app)
      .get('import/detail-import/get-all')
      .expect(200);
  });

  it('getSingleDetailImport() function :', () => {
    return request(app)
      .get(`import/detail-import/get-single/${detailId}`)
      .expect(({body}) => {
        expect(body.importId).toEqual(detailCreate.importId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(200);
  });

  it('deleteDetailImport() function :', () => {
    return request(app)
      .delete(`import/detail-import/delete/${detailId}`)
      .expect(200);
  });

  it('getListImportDetailExport() function :', () => {
    return request(app)
      .get(`import/detail-import/get-list-import/${importId}`)
      .expect(200);
  });

  it('getAllSoftDeleteDetailImport() function :', () => {
    return request(app)
      .get('import/detail-import/get-all-soft-delete')
      .expect(200);
  })
});
