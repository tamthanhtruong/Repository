export interface RoleResponseInterface {
  readonly _id: string;
  name: string;
  description: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
