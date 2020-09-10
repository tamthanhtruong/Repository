import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DetailExportService } from './detail-export.service';

const timer = 30000;
const detailExportData = {  _id: '5f3964f417898634d85d9574',
                            exportId: '5f213aa95be470217c791824',
                            productId: '5f1d6e389a52a4396404240c',
                            unitProductId: '5f1969a4d31eae3414af5904',
                            quantity: 632000,
                            price: 522200222,
                            __v: 0
};

const detailExportDataDeleted = { _id: '5f3964f417898634d85d9574',
                                  exportId: '5f213aa95be470217c791824',
                                  productId: '5f1d6e389a52a4396404240c',
                                  unitProductId: '5f1969a4d31eae3414af5904',
                                  quantity: 632000,
                                  price: 522200222,
                                  __v: 0,
                                  deletedAt : 1597897148693
};

describe('Detail-Export Service', () => {

  let detailExportService: DetailExportService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [DetailExportService,
        {
          provide: getModelToken('detail-exports'),
          useValue: {},
        }
      ],
    }).compile();

    detailExportService = moduleRef.get<DetailExportService>(DetailExportService);
  });

  describe(' Unit Test Detail-Export', () => {

    it('Create Detail-Export', async () => {
      jest.spyOn(detailExportService, 'create').mockImplementation(async () => detailExportData);
      expect(await detailExportService.create('5f213aa95be470217c791824',
                                              '5f1d6e389a52a4396404240c',
                                              '5f1969a4d31eae3414af5904',
                                              632000,
                                              522200222)
      ).toBe(detailExportData);
    });

    it('Get All Detail-Export', async () => {
      const result = [detailExportData];
      jest.spyOn(detailExportService, 'getAll').mockResolvedValue(result);
      expect(await detailExportService.getAll()).toStrictEqual(result);
    });

    it('Get Single Detail-Export', async () => {
      jest.spyOn(detailExportService, 'getSingle').mockImplementation(async () => detailExportData);
      expect(await detailExportService.getSingle('5f3964f417898634d85d9574')).toStrictEqual(detailExportData);
    });

    it('Delete Detail-Export', async () => {
      jest.spyOn(detailExportService, 'delete').mockImplementation(async () => true);
      expect(await detailExportService.delete('5f3964f417898634d85d9574')).toBe(true);
    });

    it('Get List Export', async () => {
      const result = [detailExportData];
      jest.spyOn(detailExportService, 'getListExport').mockResolvedValue(result);
      expect(await detailExportService.getListExport('5f213aa95be470217c791824')).toStrictEqual(result);
    });

    it('Get All Soft Delete Detail-Export', async () => {
      const result = [detailExportDataDeleted];
      jest.spyOn(detailExportService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await detailExportService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

