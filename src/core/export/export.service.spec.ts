import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ExportService } from './export.service';

const timer = 30000;
const exportData = { _id: '5f39eef1cf9bed2d506eafb8',
                    status : 'Lock',
                    receiver : 'Hoa',
                    invoiceNumber : 3,
                    note : 'Giao hàng',
                    createdUserId : '5f1ac85894e6923b98a1bcab',
                    accountantUserId : '5f1ac85894e6923b98a1bcab',
                    accConfirmedDate : 2020,
                    stockKeeperUserId : '5f1ac85894e6923b98a1bcab',
                    stockConfirmedDate : 2020,
                    invoiceDate : 1597632241639,
                    createdDate : 1597632241639,
                    createdAt : 1597897148693,
                    updatedAt : 1597897148693,
                    __v : 0
};

const exportDataDeleted = { _id: '5f39eef1cf9bed2d506eafb8',
                            status : 'Lock',
                            receiver : 'Hoa',
                            invoiceNumber : 3,
                            note : 'Giao hàng',
                            createdUserId : '5f1ac85894e6923b98a1bcab',
                            accountantUserId : '5f1ac85894e6923b98a1bcab',
                            accConfirmedDate : 2020,
                            stockKeeperUserId : '5f1ac85894e6923b98a1bcab',
                            stockConfirmedDate : 2020,
                            invoiceDate : 1597632241639,
                            createdDate : 1597632241639,
                            createAt : 1597897148693,
                            updatedAt : 1597897148693,
                            __v : 0,
                            deletedAt : 1597897148693
};

describe('Export Service', () => {

  let exportService: ExportService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [ExportService,
        {
          provide: getModelToken('exports'),
          useValue: {},
        }
      ],
    }).compile();

    exportService = moduleRef.get<ExportService>(ExportService);
  });

  describe(' Unit Test Export', () => {

    it('Create Export', async () => {
      jest.spyOn(exportService, 'create').mockImplementation(async () => exportData);
      expect(await exportService.create('Hoa',
                                        3,
                                        'Giao hàng',
                                        '5f1ac85894e6923b98a1bcab',
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        'Lock')
      ).toBe(exportData);
    });

    it('Get All Export', async () => {
      const result = [exportData];
      jest.spyOn(exportService, 'getAll').mockResolvedValue(result);
      expect(await exportService.getAll()).toStrictEqual(result);
    });

    it('Get Single Export', async () => {
      jest.spyOn(exportService, 'getSingle').mockImplementation(async () => exportData);
      expect(await exportService.getSingle('5f39eef1cf9bed2d506eafb8')).toStrictEqual(exportData);
    });

    it('Update Export', async () => {
      jest.spyOn(exportService, 'update').mockImplementation(async () => exportData);
      expect(await exportService.update('5f39eef1cf9bed2d506eafb8',
                                        'Hoa',
                                        3,
                                        'Giao hàng',
                                        '5f1ac85894e6923b98a1bcab',
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        'Lock')
      ).toStrictEqual(exportData);
    });

    it('Delete Export', async () => {
      jest.spyOn(exportService, 'delete').mockImplementation(async () => true);
      expect(await exportService.delete('5f39eef1cf9bed2d506eafb8')).toBe(true);
    });

    it('Get All Soft Delete Export', async () => {
      const result = [exportDataDeleted];
      jest.spyOn(exportService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await exportService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

