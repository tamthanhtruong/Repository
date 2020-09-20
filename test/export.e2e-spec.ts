import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { ExportCreateRequest, ExportUpdateRequest } from '../src/interface/export/export.request';
import { DetailExportCreateRequest } from '../src/interface/export/detail-export/detail-export.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Export Class_e2e Test: ', () => {
  const exportCreate: ExportCreateRequest = {
    receiver : 'Mai',
    invoiceNumber : 10,
    note : 'Đơn xuất hàng',
    createdUserId : '5f64d143b089dc44284dad50',
    accountantUserId : '5f64d143b089dc44284dad50',
    accConfirmedDate : 2020,
    stockKeeperUserId : '5f64d143b089dc44284dad50',
    stockConfirmedDate : 2020,
    status : 'Exported'
  };
  const exportUpdate: ExportUpdateRequest = {
    receiver : 'Mai',
    invoiceNumber : 10,
    note : 'Đơn xuất hàng',
    createdUserId : '5f64d143b089dc44284dad50',
    accountantUserId : '5f64d143b089dc44284dad50',
    accConfirmedDate : 2020,
    stockKeeperUserId : '5f64d143b089dc44284dad50',
    stockConfirmedDate : 2020,
    status : 'Lock'
  };
  let exportId : string;

  const detailCreate: DetailExportCreateRequest = {
    exportId : '5f64dbf7b089dc44284dad60',
    productId : '5f64d03bb089dc44284dad41',
    unitProductId : '5f64cf81b089dc44284dad3a',
    quantity : 20,
    price : 30
  };
  let detailId : string;

  /*---------- Export Service Code ----------*/
  it('create() function : ', () => {
    return request(app)
      .post('export/create')
      .set('Accept', 'application/json')
      .send(exportCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        exportId = body._id;
        expect(body.receiver).toEqual(exportCreate.receiver);
        expect(body.createdUserId).toEqual(exportCreate.createdUserId);
        expect(body.status).toEqual(exportCreate.status);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('export/get-all')
      .expect(200);
  });

  it('getAllLock() function :', () => {
    return request(app)
      .get('export/get-all-lock')
      .expect(200);
  });

  it('getAllOpen() function :', () => {
    return request(app)
      .get('export/get-all-open')
      .expect(200);
  });

  it('getAllPaid() function :', () => {
    return request(app)
      .get('export/get-all-paid')
      .expect(200);
  });

  it('getAllExported() function :', () => {
    return request(app)
      .get('export/get-all-exported')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`export/get-single/${exportId}`)
      .expect(({body}) => {
        expect(body.receiver).toEqual(exportCreate.receiver);
        expect(body.createdUserId).toEqual(exportCreate.createdUserId);
        expect(body.status).toEqual(exportCreate.status);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`export/update/${exportId}`)
      .set('Accept', 'application/json')
      .send(exportUpdate)
      .expect(({body}) => {
        expect(body.receiver).toEqual(exportCreate.receiver);
        expect(body.createdUserId).toEqual(exportCreate.createdUserId);
        expect(body.status).not.toEqual(exportCreate.status);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`export/delete/${exportId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('export/get-all-soft-delete')
      .expect(200);
  });

  /*---------- Detail-Export Service Code ----------*/

  it('createDetailExport() function : ', () => {
    return request(app)
      .post('export/detail-export/create')
      .set('Accept', 'application/json')
      .send(detailCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        detailId = body._id;
        expect(body.exportId).toEqual(detailCreate.exportId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAllDetailExport() function :', () => {
    return request(app)
      .get('export/detail-export/get-all')
      .expect(200);
  });

  it('getSingleDetailExport() function :', () => {
    return request(app)
      .get(`export/detail-export/get-single/${detailId}`)
      .expect(({body}) => {
        expect(body.exportId).toEqual(detailCreate.exportId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(200);
  });

  it('deleteDetailExport() function :', () => {
    return request(app)
      .delete(`export/detail-export/delete/${detailId}`)
      .expect(200);
  });

  it('getListExportDetailExport() function :', () => {
    return request(app)
      .get(`export/detail-export/get-list-export/${exportId}`)
      .expect(200);
  });

  it('getAllSoftDeleteDetailExport() function :', () => {
    return request(app)
      .get('export/detail-export/get-all-soft-delete')
      .expect(200);
  });
});
