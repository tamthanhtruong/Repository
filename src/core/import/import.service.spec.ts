import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ImportService } from './import.service';

const timer = 30000;
const importData = { _id: '5f395933c024f51f14900d32',
                    status : 'Lock',
                    shipper : 'Hoa',
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

const importDataDeleted = {  _id: '5f395933c024f51f14900d32',
                            status : 'Lock',
                            shipper : 'Hoa',
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
                            __v : 0,
                            deletedAt : 1597897148693
};

describe('Import Service', () => {

  let importService: ImportService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [ImportService,
        {
          provide: getModelToken('imports'),
          useValue: {},
        }
      ],
    }).compile();

    importService = moduleRef.get<ImportService>(ImportService);
  });

  describe(' Unit Test Import', () => {

    it('Create Import', async () => {
      jest.spyOn(importService, 'create').mockImplementation(async () => importData);
      expect(await importService.create('Hoa',
                                        3,
                                        'Giao hàng',
                                        '5f1ac85894e6923b98a1bcab',
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        'Lock')
      ).toBe(importData);
    });

    it('Get All Import', async () => {
      const result = [importData];
      jest.spyOn(importService, 'getAll').mockResolvedValue(result);
      expect(await importService.getAll()).toStrictEqual(result);
    });

    it('Get Single Import', async () => {
      jest.spyOn(importService, 'getSingle').mockImplementation(async () => importData);
      expect(await importService.getSingle('5f395933c024f51f14900d32')).toStrictEqual(importData);
    });

    it('Update Import', async () => {
      jest.spyOn(importService, 'update').mockImplementation(async () => importData);
      expect(await importService.update('5f395933c024f51f14900d32',
                                        'Hoa',
                                        3,
                                        'Giao hàng',
                                        '5f1ac85894e6923b98a1bcab',
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        '5f1ac85894e6923b98a1bcab',
                                        2020,
                                        'Lock')
      ).toStrictEqual(importData);
    });

    it('Delete Import', async () => {
      jest.spyOn(importService, 'delete').mockImplementation(async () => true);
      expect(await importService.delete('5f395933c024f51f14900d32')).toBe(true);
    });

    it('Get All Soft Delete Import', async () => {
      const result = [importDataDeleted];
      jest.spyOn(importService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await importService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

