import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UnitProductService } from './unit-product.service';

const timer = 30000;
const unitProductData = { _id: '5f3a2cbf965c4f2078970098',
                          name : 'Bịch',
                          createAt : 1597897148693,
                          updatedAt : 1597897148693,
                          __v : 0
};
const unitProductDataDeleted = { _id: '5f3a2cbf965c4f2078970098',
                              name : 'Bịch',
                              createAt : 1597897148693,
                              updatedAt : 1597897148693,
                              __v : 0,
                              deletedAt: 1597897148693
};

describe('Unit-Product Service', () => {

  let unitProductService: UnitProductService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [UnitProductService,
        {
          provide: getModelToken('unit-products'),
          useValue: {},
        }
      ],
    }).compile();

    unitProductService = moduleRef.get<UnitProductService>(UnitProductService);
  });

  describe(' Unit Test Unit-Product', () => {

    it('Create Unit-Product', async () => {
      jest.spyOn(unitProductService, 'create').mockImplementation(async () => unitProductData);
      expect(await unitProductService.create('Bịch')).toBe(unitProductData);
    });

    it('Get All Unit-Product', async () => {
      const result = [unitProductData];
      jest.spyOn(unitProductService, 'getAll').mockResolvedValue(result);
      expect(await unitProductService.getAll()).toStrictEqual(result);
    });

    it('Get Single Unit-Product', async () => {
      jest.spyOn(unitProductService, 'getSingle').mockImplementation(async () => unitProductData);
      expect(await unitProductService.getSingle('5f3a2cbf965c4f2078970098')).toStrictEqual(unitProductData);
    });

    it('Update Unit-Product', async () => {
      jest.spyOn(unitProductService, 'update').mockImplementation(async () => unitProductData);
      expect(await unitProductService.update('5f3a2cbf965c4f2078970098','Máy giặt')).toStrictEqual(unitProductData);
    });

    it('Delete Unit-Product', async () => {
      jest.spyOn(unitProductService, 'delete').mockImplementation(async () => true);
      expect(await unitProductService.delete('5f3a2cbf965c4f2078970098')).toBe(true);
    });

    it('Get All Soft Delete Unit-Product', async () => {
      const result = [unitProductDataDeleted];
      jest.spyOn(unitProductService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await unitProductService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

