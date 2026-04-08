import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks';
import {loadProducts, setQuery} from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import {Product} from '../types/product';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

export default function ProductsScreen({navigation}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {
    items,
    query,
    hasMore,
    isLoading,
    isRefreshing,
    error,
    hydrated,
    lastUpdated,
  } = useAppSelector(state => state.products);

  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      dispatch(loadProducts({reset: true, query: ''}));
    }
  }, [dispatch, hydrated, items.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery !== query) {
        dispatch(setQuery(localQuery));
        dispatch(loadProducts({reset: true, query: localQuery}));
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [dispatch, localQuery, query]);

  const onEndReached = () => {
    if (isLoading || isRefreshing || !hasMore) {
      return;
    }
    dispatch(loadProducts({reset: false, query}));
  };

  const onRefresh = () => {
    dispatch(loadProducts({reset: true, query}));
  };

  const renderItem: ListRenderItem<Product> = ({item}) => (
    <ProductCard
      product={item}
      onPress={id => navigation.navigate('ProductDetail', {id})}
    />
  );

  const footer = useMemo(() => {
    if (!isLoading) {
      return <View style={styles.footerGap} />;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#1D3AA8" />
      </View>
    );
  }, [isLoading]);

  const emptyState = !isLoading && items.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          value={localQuery}
          onChangeText={setLocalQuery}
          placeholder="Search products"
          placeholderTextColor="#6B7280"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          style={styles.insightButton}
          onPress={() => navigation.navigate('Insights')}>
          <Text style={styles.insightText}>Stats</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListFooterComponent={footer}
        ListEmptyComponent={
          emptyState ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySubtitle}>
                Try a different keyword or clear your search.
              </Text>
            </View>
          ) : null
        }
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={8}
        removeClippedSubviews
      />

      <Text style={styles.metaText}>
        Last synced:{' '}
        {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Not yet'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D8DFEA',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#0F172A',
    marginRight: 10,
  },
  insightButton: {
    backgroundColor: '#1D3AA8',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  insightText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  errorText: {
    color: '#B42318',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 10,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerGap: {
    height: 8,
  },
  emptyContainer: {
    marginTop: 42,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
  },
  metaText: {
    marginBottom: 6,
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'right',
  },
});
