import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service';

const timer = 30000;
const inventoryData = { _id: '5f395933c024f51f14900d32',
                        status : 'Open',
                        invoiceNumber : 3,
                        note : 'Dầu xả',
                        createdUserId : '5f1ac85894e6923b98a1bcab',
                        invoiceDate : 1597632241639,
                        createdDate : 1597632241639,
                        createdAt : 1597897148693,
                        updatedAt : 1597897148693,
                        __v : 0
};

const inventoryDataDeleted = {  _id: '5f395933c024f51f14900d32',
                                status : 'Open',
                                invoiceNumber : 3,
                                note : 'Dầu xả',
                                createdUserId : '5f1ac85894e6923b98a1bcab',
                                invoiceDate : 1597632241639,
                                createdDate : 1597632241639,
                                createdAt : 1597897148693,
                                updatedAt : 1597897148693,
                                __v : 0,
                                deletedAt : 1597897148693
};

describe('Inventory Service', () => {

  let inventoryService: InventoryService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [InventoryService,
        {
          provide: getModelToken('inventories'),
          useValue: {},
        }
      ],
    }).compile();

    inventoryService = moduleRef.get<InventoryService>(InventoryService);
  });

  describe(' Unit Test Inventory', () => {

    it('Create Inventory', async () => {
      jest.spyOn(inventoryService, 'create').mockImplementation(async () => inventoryData);
      expect(await inventoryService.create(3,
                                            'Dầu xả',
                                            '5f1ac85894e6923b98a1bcab',
                                            'Open')
      ).toBe(inventoryData);
    });

    it('Get All Inventory', async () => {
      const result = [inventoryData];
      jest.spyOn(inventoryService, 'getAll').mockResolvedValue(result);
      expect(await inventoryService.getAll()).toStrictEqual(result);
    });

    it('Get Single Inventory', async () => {
      jest.spyOn(inventoryService, 'getSingle').mockImplementation(async () => inventoryData);
      expect(await inventoryService.getSingle('5f395933c024f51f14900d32')).toStrictEqual(inventoryData);
    });

    it('Update Inventory', async () => {
      jest.spyOn(inventoryService, 'update').mockImplementation(async () => inventoryData);
      expect(await inventoryService.update('5f395933c024f51f14900d32',
                                          3,
                                          'Dầu xả',
                                          '5f1ac85894e6923b98a1bcab',
                                          'Open')
                                        ).toStrictEqual(inventoryData);
    });

    it('Delete Inventory', async () => {
      jest.spyOn(inventoryService, 'delete').mockImplementation(async () => true);
      expect(await inventoryService.delete('5f395933c024f51f14900d32')).toBe(true);
    });

    it('Get All Soft Delete Inventory', async () => {
      const result = [inventoryDataDeleted];
      jest.spyOn(inventoryService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await inventoryService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

