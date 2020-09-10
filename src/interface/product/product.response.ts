export interface ProductResponseInterface {
  readonly _id: string;
  categoryId: string;
  unitProductId: string;
  name?: string;
  code?: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  createdAt?: number;
  updatedAt?: number;
  status: string;
  deletedAt?: number;
}


