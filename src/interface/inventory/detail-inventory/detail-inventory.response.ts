export interface DetailInventoryResponseInterface {
  readonly _id: string;
  inventoryId: string;
  productId: string;
  unitProductId: string;
  quantity: number;
  price: number;
  deletedAt?: number;
}
