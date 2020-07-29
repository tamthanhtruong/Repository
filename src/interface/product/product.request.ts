export class ProductCreateRequest {
  categoryId: string;
  unitProductId: string;
  name: string;
  code: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  status: string;
}

export class ProductUpdateRequest {
  categoryId: string;
  unitProductId: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
  status: string;
}
