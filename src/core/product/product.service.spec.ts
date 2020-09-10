import { Test } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';

const timer = 30000;
const productData = { _id: '5f3df9bce166ad13f0263293',
                      status : 'Exist',
                      categoryId : '5f44db3529b56c11b081f528',
                      unitProductId : '5f44dbd029b56c11b081f547',
                      name : 'Hp',
                      code : '2',
                      originPrice : 12.365,
                      price : 1000,
                      image : 'trắng',
                      information : 'bb',
                      evaluation : '444',
                      createAt : 1597897148693,
                      updatedAt : 1597897148693,
                      __v : 0
};

const productDataDeleted = { _id: '5f3df9bce166ad13f0263293',
                            status : 'Exist',
                            categoryId : '5f44db3529b56c11b081f528',
                            unitProductId : '5f44dbd029b56c11b081f547',
                            name : 'Hp',
                            code : '2',
                            originPrice : 12.365,
                            price : 1000,
                            image : 'trắng',
                            information : 'bb',
                            evaluation : '444',
                            createAt : 1597897148693,
                            updatedAt : 1597897148693,
                            __v : 0,
                            deletedAt : 1597897148693
};

describe('Product Service', () => {

  let productService: ProductService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [ProductService,
        {
          provide: getModelToken('products'),
          useValue: {},
        }
      ],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
  });

  describe(' Unit Test Product', () => {

    it('Create Product', async () => {
      jest.spyOn(productService, 'create').mockImplementation(async () => productData);
      expect(await productService.create('5f44db3529b56c11b081f528',
                                        '5f44dbd029b56c11b081f547',
                                        'Hp',
                                        '2',
                                        12.365,
                                        1000,
                                        'trắng',
                                        'bb',
                                        '444',
                                        'Exist')
      ).toBe(productData);
    });

    it('Get All Product', async () => {
      const result = [productData];
      jest.spyOn(productService, 'getAll').mockResolvedValue(result);
      expect(await productService.getAll()).toStrictEqual(result);
    });

    it('Get Single Product', async () => {
      jest.spyOn(productService, 'getSingle').mockImplementation(async () => productData);
      expect(await productService.getSingle('5f3df9bce166ad13f0263293')).toStrictEqual(productData);
    });

    it('Update Product', async () => {
      jest.spyOn(productService, 'update').mockImplementation(async () => productData);
      expect(await productService.update('5f3df9bce166ad13f0263293',
                                        '5f44db3529b56c11b081f528',
                                        '5f44dbd029b56c11b081f547',
                                        12.365,
                                        1000,
                                        'trắng',
                                        'bb',
                                        '444',
                                        'Exist')
      ).toStrictEqual(productData);
    });

    it('Delete Product', async () => {
      jest.spyOn(productService, 'delete').mockImplementation(async () => true);
      expect(await productService.delete('5f3df9bce166ad13f0263293')).toBe(true);
    });

    it('Get All Soft Delete Product', async () => {
      const result = [productDataDeleted];
      jest.spyOn(productService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await productService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

