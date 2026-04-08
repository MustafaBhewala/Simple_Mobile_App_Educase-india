import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {useAppDispatch, useAppSelector} from './src/hooks/storeHooks';
import {store} from './src/store';
import {
  hydrateProductsState,
  markHydrated,
  setAppLifecycleState,
} from './src/store/slices/productsSlice';
import {
  loadProductsCache,
  saveProductsCache,
} from './src/storage/productsCache';

function AppBootstrap(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {items, page, query, hasMore, lastUpdated, hydrated} = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    const hydrate = async () => {
      const cache = await loadProductsCache();
      if (cache) {
        dispatch(hydrateProductsState(cache));
        return;
      }
      dispatch(markHydrated());
    };

    hydrate();
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const timer = setTimeout(() => {
      saveProductsCache({
        items,
        page,
        query,
        hasMore,
        lastUpdated,
      }).catch(() => null);
    }, 350);

    return () => clearTimeout(timer);
  }, [hasMore, hydrated, items, lastUpdated, page, query]);

  useEffect(() => {
    const applyAppState = (nextAppState: AppStateStatus) => {
      if (
        nextAppState === 'active' ||
        nextAppState === 'background' ||
        nextAppState === 'inactive'
      ) {
        dispatch(setAppLifecycleState(nextAppState));
      }
    };

    applyAppState(AppState.currentState);
    const subscription = AppState.addEventListener('change', applyAppState);

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  if (!hydrated) {
    return (
      <View style={styles.loaderContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#F3F6FC" />
        <ActivityIndicator size="large" color="#1D3AA8" />
      </View>
    );
  }

  return <AppNavigator />;
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F6FC" />
      <AppBootstrap />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F6FC',
  },
});

export default App;
