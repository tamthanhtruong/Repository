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
}

export class ProductUpdateRequest {
  id: string;
  categoryId: string;
  unitProductId: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
}

export class ProductDeleteRequest {
  id: string;
}
