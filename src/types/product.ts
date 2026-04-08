export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
};

export type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
