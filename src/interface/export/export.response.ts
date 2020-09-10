export interface ExportResponseInterface {
  readonly _id: string;
  receiver: string;
  invoiceNumber: number;
  invoiceDate?: number;
  note: string;
  createdUserId: string;
  createdDate?: number;
  accountantUserId: string;
  accConfirmedDate: number;
  stockKeeperUserId: string;
  stockConfirmedDate: number;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}
