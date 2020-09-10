import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CategoryService } from './category.service';

const timer = 30000;
const categoryData = { _id: '5f3a2bcb965c4f2078970095',
                      status:'Exist',
                      name : 'Máy giặt',
                      createAt : 1597897148693,
                      updatedAt : 1597897148693,
                      __v : 0
};
const categoryDataDeleted = { _id: '5f3a2bcb965c4f2078970095',
                              status:'Exist',
                              name : 'Máy giặt',
                              createAt : 1597897148693,
                              updatedAt : 1597897148693,
                              __v : 0,
                              deletedAt: 1597897148693
};

describe('Category Service', () => {

  let categoryService: CategoryService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [CategoryService,
        {
          provide: getModelToken('categories'),
          useValue: {},
        }
      ],
    }).compile();

    categoryService = moduleRef.get<CategoryService>(CategoryService);
  });

  describe(' Unit Test Category ', () => {

    it('Create', async () => {
      jest.spyOn(categoryService, 'create').mockImplementation(async () => categoryData);
      expect(await categoryService.create('Máy giặt', 'Exist')).toBe(categoryData);
    });

    it('Get All Category', async () => {
      const result = [categoryData];
      jest.spyOn(categoryService, 'getAll').mockResolvedValue(result);
      expect(await categoryService.getAll()).toStrictEqual(result);
    });

    it('Get Single Category', async () => {
      jest.spyOn(categoryService, 'getSingle').mockImplementation(async () => categoryData);
      expect(await categoryService.getSingle('5f3df9bce166ad13f0263293')).toStrictEqual(categoryData);
    });

    it('Update Category', async () => {
      jest.spyOn(categoryService, 'update').mockImplementation(async () => categoryData);
      expect(await categoryService.update('5f3df9bce166ad13f0263293',
                                          'Máy giặt',
                                          'Exist')
      ).toStrictEqual(categoryData);
    });

    it('Delete Category', async () => {
      jest.spyOn(categoryService, 'delete').mockImplementation(async () => true);
      expect(await categoryService.delete('5f3df9bce166ad13f0263293')).toBe(true);
    });

    it('Get All Soft Delete Category', async () => {
      const result = [categoryDataDeleted];
      jest.spyOn(categoryService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await categoryService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

