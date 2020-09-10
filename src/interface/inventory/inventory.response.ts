export interface InventoryResponseInterface {
  readonly _id: string;
  invoiceNumber: number;
  invoiceDate?:  number;
  note: string;
  createdUserId: string;
  createdDate?: number;
  createdAt?:  number;
  updatedAt?: number;
  status:  string;
  deletedAt?: number;
}
