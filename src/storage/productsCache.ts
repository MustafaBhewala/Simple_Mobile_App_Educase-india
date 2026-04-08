import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductsState} from '../store/slices/productsSlice';

const CACHE_KEY = 'products_cache_v1';

type CachedProductsState = {
  items: ProductsState['items'];
  page: number;
  query: string;
  hasMore: boolean;
  lastUpdated: number | null;
};

export const saveProductsCache = async (
  data: CachedProductsState,
): Promise<void> => {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

export const loadProductsCache =
  async (): Promise<CachedProductsState | null> => {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as CachedProductsState;
    } catch {
      return null;
    }
  };
