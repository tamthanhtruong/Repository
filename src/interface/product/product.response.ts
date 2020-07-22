export interface ProductResponseInterface {
  readonly _id: string;
  categoryId: string;
  unitProductId: string;
  name: string;
  code: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  updatedAt?: number;
  createdAt?: number;
  status: number;
  deletedAt?: number;
}


