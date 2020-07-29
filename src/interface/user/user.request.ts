export class UserCreateRequest {
  roleId: string;
  account: string;
  password: string;
  name: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  status: string;
}

export class UserUpdateRequest {
  roleId: string;
  account: string;
  password: string;
  name: string;
  sex: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  status: string;
}
