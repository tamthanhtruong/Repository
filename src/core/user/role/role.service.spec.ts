import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RoleService } from './role.service';

const timer = 30000;
const roleData = { _id: '5f3953a5755024303410e0aa',
                  status:'Active',
                  name : 'Giam doc',
                  description : 'Duyệt chương trình khuyến mãi, ký tên phiếu nhập, hóa đơn,.',
                  createAt : 1597897148693,
                  updatedAt : 1597897148693,
                  __v : 0
};
const roleDataDeleted = { _id: '5f3953a5755024303410e0aa',
                          status:'Active',
                          name : 'Giam doc',
                          description : 'Duyệt chương trình khuyến mãi, ký tên phiếu nhập, hóa đơn,.',
                          createAt : 1597897148693,
                          updatedAt : 1597897148693,
                          __v : 0,
                          deletedAt: 1597897148693
};

describe('Role Service', () => {

  let roleService: RoleService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [RoleService,
        {
          provide: getModelToken('roles'),
          useValue: {},
        }
      ],
    }).compile();

    roleService = moduleRef.get<RoleService>(RoleService);
  });

  describe(' Unit Test Role', () => {

    it('Create Role', async () => {
      jest.spyOn(roleService, 'create').mockImplementation(async () => roleData);
      expect(await roleService.create('Giam doc',
                                      'Duyệt chương trình khuyến mãi, ký tên phiếu nhập, hóa đơn,.',
                                      'Active')
      ).toBe(roleData)
    });

    it('Get All Role', async () => {
      const result = [roleData];
      jest.spyOn(roleService, 'getAll').mockResolvedValue(result);
      expect(await roleService.getAll()).toStrictEqual(result);
    });

    it('Get Single Role', async () => {
      jest.spyOn(roleService, 'getSingle').mockImplementation(async () => roleData);
      expect(await roleService.getSingle('5f3953a5755024303410e0aa')).toStrictEqual(roleData);
    });

    it('Update Role', async () => {
      jest.spyOn(roleService, 'update').mockImplementation(async () => roleData);
      expect(await roleService.update('5f3953a5755024303410e0aa',
                                      'Giam doc',
                                      'Duyệt chương trình khuyến mãi, ký tên phiếu nhập, hóa đơn,.',
                                      'Active')
      ).toStrictEqual(roleData);
    });

    it('Delete Role', async () => {
      jest.spyOn(roleService, 'delete').mockImplementation(async () => true);
      expect(await roleService.delete('5f3953a5755024303410e0aa')).toBe(true);
    });

    it('Get All Soft Delete Role', async () => {
      const result = [roleDataDeleted];
      jest.spyOn(roleService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await roleService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

