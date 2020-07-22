export class ProductCreateRequest {
  categoryId: string;
  name: string;
  code: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
}

export class ProductGetSingleRequest {
  id: string;
}

export class ProductUpdateRequest {
  id: string;
  originPrice: number;
  price: number;
  image: string;
  information: string;
  evaluation: string;
}

export class ProductDeleteRequest {
  id: string;
}
