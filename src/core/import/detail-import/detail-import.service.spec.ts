import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DetailImportService } from './detail-import.service';

const timer = 30000;
const detailImportData = {  _id: '5f3964f417898634d85d9574',
                            importId: '5f213aa95be470217c791824',
                            productId: '5f1d6e389a52a4396404240c',
                            unitProductId: '5f1969a4d31eae3414af5904',
                            quantity: 632000,
                            price: 522200222,
                            __v: 0
};

const detailImportDataDeleted = { _id: '5f3964f417898634d85d9574',
                                  importId: '5f213aa95be470217c791824',
                                  productId: '5f1d6e389a52a4396404240c',
                                  unitProductId: '5f1969a4d31eae3414af5904',
                                  quantity: 632000,
                                  price: 522200222,
                                  __v: 0,
                                  deletedAt : 1597897148693
};

describe('Detail-Import Service', () => {

  let detailImportService: DetailImportService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [DetailImportService,
        {
          provide: getModelToken('detail-imports'),
          useValue: {},
        }
      ],
    }).compile();

    detailImportService = moduleRef.get<DetailImportService>(DetailImportService);
  });

  describe(' Unit Test Detail-Import', () => {

    it('Create Detail-Import', async () => {
      jest.spyOn(detailImportService, 'create').mockImplementation(async () => detailImportData);
      expect(await detailImportService.create('5f213aa95be470217c791824',
                                              '5f1d6e389a52a4396404240c',
                                              '5f1969a4d31eae3414af5904',
                                              632000,
                                              522200222)
      ).toBe(detailImportData);
    });

    it('Get All Detail-Import', async () => {
      const result = [detailImportData];
      jest.spyOn(detailImportService, 'getAll').mockResolvedValue(result);
      expect(await detailImportService.getAll()).toStrictEqual(result);
    });

    it('Get Single Detail-Export', async () => {
      jest.spyOn(detailImportService, 'getSingle').mockImplementation(async () => detailImportData);
      expect(await detailImportService.getSingle('5f3964f417898634d85d9574')).toStrictEqual(detailImportData);
    });

    it('Delete Detail-Import', async () => {
      jest.spyOn(detailImportService, 'delete').mockImplementation(async () => true);
      expect(await detailImportService.delete('5f3964f417898634d85d9574')).toBe(true);
    });

    it('Get Detail Import', async () => {
      const result = [detailImportData];
      jest.spyOn(detailImportService, 'getListImport').mockResolvedValue(result);
      expect(await detailImportService.getListImport('5f213aa95be470217c791824')).toStrictEqual(result);
    });

    it('Get All Soft Delete Detail-Import', async () => {
      const result = [detailImportDataDeleted];
      jest.spyOn(detailImportService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await detailImportService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

