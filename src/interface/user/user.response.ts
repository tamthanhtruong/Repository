export interface UserResponseInterface {
  readonly _id: string;
  roleId: string,
  account: string;
  password: string;
  name: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
