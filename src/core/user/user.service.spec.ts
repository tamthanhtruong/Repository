import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';

const timer = 30000;
const userData = { _id: '5f4533fd033c61240427e8b2',
                  status:'Active',
                  roleId : '5f3953a5755024303410e0aa',
                  account : 'linh89',
                  password : '456',
                  name : 'Linh',
                  sex : 'Male',
                  email : 'linh@gmail.com',
                  dateOfBirth : '1/1/1990',
                  address : 'Binh Thuy',
                  phone : '1234',
                  createAt : 1597897148693,
                  updatedAt : 1597897148693,
                  __v : 0
};
const userDataDeleted = { _id: '5f4533fd033c61240427e8b2',
                          status:'Active',
                          roleId : '5f3953a5755024303410e0aa',
                          account : 'linh89',
                          password : '456',
                          name : 'Linh',
                          sex : 'Male',
                          email : 'linh@gmail.com',
                          dateOfBirth : '1/1/1990',
                          address : 'Binh Thuy',
                          phone : '1234',
                          createAt : 1597897148693,
                          updatedAt : 1597897148693,
                          __v : 0,
                          deletedAt: 1597897148693
};

describe('User Service', () => {

  let userService: UserService;

  beforeEach(async () => {
    jest.setTimeout(timer);
    const moduleRef = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getModelToken('users'),
          useValue: {},
        }
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe(' Unit Test User', () => {

    it('Create User', async () => {
      jest.spyOn(userService, 'create').mockImplementation(async () => userData);
      expect(await userService.create('5f3953a5755024303410e0aa',
                                      'linh89',
                                      '456',
                                      'Linh',
                                      'Male',
                                      'inh@gmail.com',
                                      '1/1/1990',
                                      'Binh Thuy',
                                      '1234',
                                      'Active')
      ).toBe(userData)
    });

    it('Get All User', async () => {
      const result = [userData];
      jest.spyOn(userService, 'getAll').mockResolvedValue(result);
      expect(await userService.getAll()).toStrictEqual(result);
    });

    it('Get Single User', async () => {
      jest.spyOn(userService, 'getSingle').mockImplementation(async () => userData);
      expect(await userService.getSingle('5f4533fd033c61240427e8b2')).toStrictEqual(userData);
    });

    it('Update User', async () => {
      jest.spyOn(userService, 'update').mockImplementation(async () => userData);
      expect(await userService.update('5f3df9bce166ad13f0263293',
                                      '5f3953a5755024303410e0aa',
                                      'linh89',
                                      '456',
                                      'Linh',
                                      'Male','inh@gmail.com',
                                      '1/1/1990',
                                      'Binh Thuy',
                                      '1234',
                                      'Exist')
      ).toStrictEqual(userData);
    });

    it('Delete User', async () => {
      jest.spyOn(userService, 'delete').mockImplementation(async () => true);
      expect(await userService.delete('5f3df9bce166ad13f0263293')).toBe(true);
    });

    it('Get All Soft Delete User', async () => {
      const result = [userDataDeleted];
      jest.spyOn(userService, 'getAllSoftDelete').mockResolvedValue(result);
      expect(await userService.getAllSoftDelete()).toStrictEqual(result);
    });
  });
});

