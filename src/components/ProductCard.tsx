import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Product} from '../types/product';

type ProductCardProps = {
  product: Product;
  onPress: (id: number) => void;
};

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps): React.JSX.Element {
  const priceInInr = `₹${Math.round(product.price * 83).toLocaleString('en-IN')}`;

  return (
    <Pressable style={styles.card} onPress={() => onPress(product.id)}>
      <Image source={{uri: product.thumbnail}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={styles.price}>{priceInInr}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E7E9EE',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#F4F6FA',
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#121726',
  },
  category: {
    marginTop: 2,
    fontSize: 12,
    color: '#5F6C85',
    textTransform: 'capitalize',
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: '#37415A',
    lineHeight: 17,
  },
  price: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
    color: '#1D3AA8',
  },
});
