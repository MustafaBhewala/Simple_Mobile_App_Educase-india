import React, {useMemo} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useAppSelector} from '../hooks/storeHooks';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({route}: Props): React.JSX.Element {
  const {id} = route.params;
  const product = useAppSelector(state =>
    state.products.items.find(item => item.id === id),
  );

  const priceText = useMemo(() => {
    if (!product) {
      return '$0';
    }
    return `$${product.price}`;
  }, [product]);

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Product is not available</Text>
        <Text style={styles.emptySubtitle}>
          Return to the list and refresh to load it again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{uri: product.thumbnail}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>{product.category}</Text>

      <View style={styles.priceBox}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceValue}>{priceText}</Text>
      </View>

      <Text style={styles.descriptionLabel}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
  },
  content: {
    padding: 18,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    backgroundColor: '#E6ECF8',
  },
  title: {
    marginTop: 16,
    fontSize: 23,
    fontWeight: '800',
    color: '#111827',
  },
  category: {
    marginTop: 6,
    fontSize: 14,
    color: '#5F6C85',
    textTransform: 'capitalize',
  },
  priceBox: {
    marginTop: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D4DEF2',
    backgroundColor: '#FFFFFF',
    padding: 14,
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  priceValue: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '800',
    color: '#1D3AA8',
  },
  descriptionLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#344054',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    color: '#64748B',
  },
});
