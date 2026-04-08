import {ProductsApiResponse} from '../types/product';

const BASE_URL = 'https://dummyjson.com/products';

type FetchProductsParams = {
  page: number;
  limit: number;
  query: string;
};

export const fetchProductsFromApi = async ({
  page,
  limit,
  query,
}: FetchProductsParams): Promise<ProductsApiResponse> => {
  const skip = page * limit;
  const hasQuery = query.trim().length > 0;
  const url = hasQuery
    ? `${BASE_URL}/search?q=${encodeURIComponent(
        query.trim(),
      )}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}?limit=${limit}&skip=${skip}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not load products. Please try again.');
  }

  return response.json() as Promise<ProductsApiResponse>;
};
