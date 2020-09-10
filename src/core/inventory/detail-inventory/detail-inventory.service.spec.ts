import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DetailInventoryService } from './detail-inventory.service';

const timer = 30000;
const detailInventoryData = {  _id: '5f3964f417898634d85d9574',
                              inventoryId: '5f213aa95be470217c791824',
                              productId: '5f1d6e389a52a4396404240c',
                              unitProductId: '5f1969a4d31eae3414af5904',
                              quantity: 632000,
                              price: 522200222,
                              __v: 0
};

const detailInventoryDataDeleted = { _id: '5f3964f417898634d85d9574',
                                    inventoryId: '5f213aa95be470217c791824',
                                    productId: '5f1d6e389a52a4396404240c',
                                    unitProductId: '5f1969a4d31eae3414af5904',
                                    quantity: 632000,
                                    price: 522200222,
                                    __v: 0,
                                    deletedAt : 1597897148693
};

describe('Detail-Inventory Service', () => {

  let detailInventoryService: DetailInventoryService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [DetailInventoryService,
        {
          provide: getModelToken('detail-inventories'),
          useValue: {},
        }
      ],
    }).compile();

    detailInventoryService = moduleRef.get<DetailInventoryService>(DetailInventoryService);
  });

  describe(' Unit Test Detail-Inventory', () => {

    it('Create Detail-Inventory', async () => {
      jest.spyOn(detailInventoryService, 'create').mockImplementation(async () => detailInventoryData);
      expect(await detailInventoryService.create('5f213aa95be470217c791824',
                                                '5f1d6e389a52a4396404240c',
                                                '5f1969a4d31eae3414af5904',
                                                632000,
                                                522200222)
      ).toBe(detailInventoryData);
    });

    it('Get All Detail-Inventory', async () => {
      const result = [detailInventoryData];
      jest.spyOn(detailInventoryService, 'getAll').mockResolvedValue(result);
      expect(await detailInventoryService.getAll()).toStrictEqual(result);
    });

    it('Get Single Detail-Inventory', async () => {
      jest.spyOn(detailInventoryService, 'getSingle').mockImplementation(async () => detailInventoryData);
      expect(await detailInventoryService.getSingle('5f3964f417898634d85d9574')).toStrictEqual(detailInventoryData);
    });

    it('Delete Detail-Inventory', async () => {
      jest.spyOn(detailInventoryService, 'delete').mockImplementation(async () => true);
      expect(await detailInventoryService.delete('5f3964f417898634d85d9574')).toBe(true);
    });

    it('Get Detail Inventory', async () => {
      const result = [detailInventoryData];
      jest.spyOn(detailInventoryService, 'getListInventory').mockResolvedValue(result);
      expect(await detailInventoryService.getListInventory('5f213aa95be470217c791824')).toStrictEqual(result);
    });

    it('Get All Soft Delete Detail-Inventory', async () => {
      const result = [detailInventoryDataDeleted];
      jest.spyOn(detailInventoryService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await detailInventoryService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

