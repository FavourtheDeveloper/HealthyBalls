import React, { useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';
import BadgeChip from '../../components/BadgeChip';

export default function ProductDetailScreen({ route, navigation }) {
  const { product, addToCart } = route.params;
  const insets = useSafeAreaInsets();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAdd = () => {
    addToCart({ ...product, selectedSize, selectedColor });
    Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={Colors.dark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishBtn} onPress={() => setWishlisted(!wishlisted)}>
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? Colors.danger : Colors.dark}
            />
          </TouchableOpacity>
          {product.badge && (
            <View style={styles.badge}>
              <BadgeChip label={product.badge} color={Colors.primary} />
            </View>
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.category}>{product.category}</Text>
              <Text style={styles.name}>{product.name}</Text>
            </View>
            <Text style={styles.price}>R {product.price}</Text>
          </View>

          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s} name={s <= Math.round(product.rating) ? 'star' : 'star-outline'}
                size={16} color={Colors.secondary}
              />
            ))}
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviews} reviews)</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {product.sizes && (
            <>
              <Text style={styles.sectionLabel}>Size</Text>
              <View style={styles.optionRow}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[styles.optionChip, selectedSize === size && styles.optionChipActive]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[styles.optionText, selectedSize === size && styles.optionTextActive]}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {product.colors && (
            <>
              <Text style={styles.sectionLabel}>Colour</Text>
              <View style={styles.optionRow}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[styles.optionChip, selectedColor === color && styles.optionChipActive]}
                    onPress={() => setSelectedColor(color)}
                  >
                    <Text style={[styles.optionText, selectedColor === color && styles.optionTextActive]}>{color}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <Text style={styles.sectionLabel}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Ionicons name="remove" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.min(product.stock, qty + 1))}
            >
              <Ionicons name="add" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.stockText}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </Text>
          </View>

          <View style={styles.ctaRow}>
            <HBButton
              label="Add to Cart"
              onPress={handleAdd}
              icon="bag-add"
              variant="outline"
              style={{ flex: 1 }}
            />
            <HBButton
              label="Buy Now"
              onPress={() => {
                handleAdd();
                navigation.navigate('Cart', { cart: [{ ...product, selectedSize, selectedColor, qty }], setCart: () => {} });
              }}
              icon="flash"
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: { height: 300, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  backBtn: { position: 'absolute', top: 12, left: Spacing.md, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', ...Shadow.sm },
  wishBtn: { position: 'absolute', top: 12, right: Spacing.md, width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center', ...Shadow.sm },
  badge: { position: 'absolute', bottom: Spacing.md, left: Spacing.md },
  body: { padding: Spacing.md },
  nameRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: Spacing.sm },
  category: { fontSize: FontSizes.xs, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  name: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.dark, lineHeight: 26 },
  price: { fontSize: FontSizes.xxl, fontWeight: '900', color: Colors.primary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: Spacing.md },
  ratingText: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark },
  reviewCount: { fontSize: FontSizes.sm, color: Colors.gray500 },
  description: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22, marginBottom: Spacing.md },
  sectionLabel: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark, marginBottom: 8, marginTop: Spacing.sm },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  optionChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.sm, paddingHorizontal: 14, paddingVertical: 8 },
  optionChipActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  optionText: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  optionTextActive: { color: Colors.primary },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.lg },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  qty: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.dark, minWidth: 32, textAlign: 'center' },
  stockText: { fontSize: FontSizes.sm, color: Colors.success, fontWeight: '600' },
  ctaRow: { flexDirection: 'row', gap: Spacing.sm },
});
