import { app, database, timer } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { InventoryCreateRequest, InventoryUpdateRequest } from '../src/interface/inventory/inventory.request';
import { DetailInventoryCreateRequest } from '../src/interface/inventory/detail-inventory/detail-inventory.request';

beforeAll(async () => {
  jest.setTimeout(timer);
  await mongoose.connect(database, {useNewUrlParser: true, useUnifiedTopology: true});
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('Inventory Class_e2e Test: ', () => {

  const inventoryCreate: InventoryCreateRequest = {
    invoiceNumber : 56,
    note : 'Dầu gội đầu',
    createdUserId : '5f64d148b089dc44284dad54'
  };
  const inventoryUpdate: InventoryUpdateRequest = {
    invoiceNumber : 56,
    note : 'Dầu xả',
    createdUserId : '5f64d148b089dc44284dad54'
  };
  let inventoryId : string;

  const detailCreate: DetailInventoryCreateRequest = {
    inventoryId : '5f64dd24b089dc44284dad6c',
    productId : '5f64d03fb089dc44284dad44',
    unitProductId : '5f64cf81b089dc44284dad3a',
    quantity : 50,
    price : 600
  };
  let detailId : string;

  /*---------- Inventory Service Code ----------*/
  it('create() function : ', () => {
    return request(app)
      .post('inventory/create')
      .set('Accept', 'application/json')
      .send(inventoryCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        inventoryId = body._id;
        expect(body.invoiceNumber).toEqual(inventoryCreate.invoiceNumber);
        expect(body.note).toEqual(inventoryCreate.note);
        expect(body.createdUserId).toEqual(inventoryCreate.createdUserId);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAll() function :', () => {
    return request(app)
      .get('inventory/get-all')
      .expect(200);
  });

  it('getSingle() function :', () => {
    return request(app)
      .get(`inventory/get-single/${inventoryId}`)
      .expect(({body}) => {
        expect(body.invoiceNumber).toEqual(inventoryCreate.invoiceNumber);
        expect(body.note).toEqual(inventoryCreate.note);
        expect(body.createdUserId).toEqual(inventoryCreate.createdUserId);
      })
      .expect(200);
  });

  it('update() function :', () => {
    return request(app)
      .patch(`inventory/update/${inventoryId}`)
      .set('Accept', 'application/json')
      .send(inventoryUpdate)
      .expect(({body}) => {
        expect(body.invoiceNumber).toEqual(inventoryCreate.invoiceNumber);
        expect(body.note).not.toEqual(inventoryCreate.note);
        expect(body.createdUserId).toEqual(inventoryCreate.createdUserId);
      })
      .expect(200);
  });

  it('delete() function :', () => {
    return request(app)
      .delete(`inventory/delete/${inventoryId}`)
      .expect(200);
  });

  it('getAllSoftDelete() function :', () => {
    return request(app)
      .get('inventory/get-all-soft-delete')
      .expect(200);
  });

  /*---------- Detail-Inventory Service Code ----------*/

  it('createDetailInventory() function : ', () => {
    return request(app)
      .post('inventory/detail-inventory/create')
      .set('Accept', 'application/json')
      .send(detailCreate)
      .expect( ({body}) => {
        expect(body._id).toBeDefined();
        detailId = body._id;
        expect(body.inventoryId).toEqual(detailCreate.inventoryId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(HttpStatus.CREATED);
  });

  it('getAllDetailInventory() function :', () => {
    return request(app)
      .get('inventory/detail-inventory/get-all')
      .expect(200);
  });

  it('getSingleDetailInventory() function :', () => {
    return request(app)
      .get(`inventory/detail-inventory/get-single/${detailId}`)
      .expect(({body}) => {
        expect(body.inventoryId).toEqual(detailCreate.inventoryId);
        expect(body.quantity).toEqual(detailCreate.quantity);
        expect(body.price).toEqual(detailCreate.price);
      })
      .expect(200);
  });

  it('deleteDetailInventory() function :', () => {
    return request(app)
      .delete(`inventory/detail-inventory/delete/${detailId}`)
      .expect(200);
  });

  it('getListInventoryDetailInventory() function :', () => {
    return request(app)
      .get(`inventory/detail-inventory/get-list-inventory/${inventoryId}`)
      .expect(200);
  });

  it('getAllSoftDeleteDetailInventory() function :', () => {
    return request(app)
      .get('inventory/detail-inventory/get-all-soft-delete')
      .expect(200);
  })
});
