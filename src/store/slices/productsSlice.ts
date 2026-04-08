import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchProductsFromApi} from '../../api/productsApi';
import {Product} from '../../types/product';

const PAGE_SIZE = 20;

export type ProductsState = {
  items: Product[];
  page: number;
  query: string;
  hasMore: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: number | null;
  appState: 'active' | 'background' | 'inactive';
  hydrated: boolean;
};

const initialState: ProductsState = {
  items: [],
  page: 0,
  query: '',
  hasMore: true,
  isLoading: false,
  isRefreshing: false,
  error: null,
  lastUpdated: null,
  appState: 'active',
  hydrated: false,
};

type LoadProductsArgs = {
  reset?: boolean;
  query?: string;
};

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async ({reset = false, query = ''}: LoadProductsArgs, {getState}) => {
    const state = getState() as {products: ProductsState};
    const page = reset ? 0 : state.products.page;

    const data = await fetchProductsFromApi({
      page,
      limit: PAGE_SIZE,
      query,
    });

    return {
      data,
      reset,
      query,
      requestedPage: page,
    };
  },
);

type HydratePayload = {
  items: Product[];
  page: number;
  query: string;
  hasMore: boolean;
  lastUpdated: number | null;
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    hydrateProductsState: (state, action: PayloadAction<HydratePayload>) => {
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.query = action.payload.query;
      state.hasMore = action.payload.hasMore;
      state.lastUpdated = action.payload.lastUpdated;
      state.hydrated = true;
    },
    markHydrated: state => {
      state.hydrated = true;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setAppLifecycleState: (
      state,
      action: PayloadAction<'active' | 'background' | 'inactive'>,
    ) => {
      state.appState = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        const reset = action.meta.arg.reset ?? false;
        state.error = null;
        if (reset) {
          state.isRefreshing = true;
        } else {
          state.isLoading = true;
        }
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        const {data, reset, query, requestedPage} = action.payload;
        const nextItems = reset
          ? data.products
          : [...state.items, ...data.products];

        state.items = nextItems;
        state.query = query;
        state.page = requestedPage + 1;
        state.hasMore = nextItems.length < data.total;
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = null;
        state.lastUpdated = Date.now();
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});

export const {
  hydrateProductsState,
  markHydrated,
  setAppLifecycleState,
  setQuery,
} = productsSlice.actions;

export {PAGE_SIZE};
export default productsSlice.reducer;
