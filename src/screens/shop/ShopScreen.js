import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Image,
  TextInput, ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { products } from '../../data/dummyData';
import BadgeChip from '../../components/BadgeChip';

const { width } = Dimensions.get('window');
const CARD_W = (width - Spacing.md * 2 - Spacing.sm) / 2;

const categories = ['All', 'Clothing', 'Health Kits', 'Accessories'];

export default function ShopScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === product.id);
      if (existing) return c.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const badgeColor = {
    Bestseller: Colors.primary,
    Limited: Colors.danger,
    New: Colors.success,
    Recommended: '#1565C0',
    Popular: Colors.secondary,
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#1A6B3C', '#2E9B5A']} style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Merchandise</Text>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart', { cart, setCart })}>
            <Ionicons name="bag" size={24} color={Colors.white} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartCount}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.gray500}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, category === cat && styles.catChipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.catLabel, category === cat && styles.catLabelActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.productCard, { width: CARD_W }]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductDetail', { product: item, addToCart })}
          >
            <View style={styles.imageWrap}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              {item.badge && (
                <View style={styles.badgeWrap}>
                  <BadgeChip label={item.badge} color={badgeColor[item.badge] || Colors.primary} small />
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color={Colors.secondary} />
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.reviews}>({item.reviews})</Text>
              </View>
              <Text style={styles.price}>R {item.price}</Text>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="bag-add" size={14} color={Colors.white} />
                <Text style={styles.addLabel}>Add</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.lg, paddingTop: Spacing.sm },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900' },
  cartBtn: { width: 44, height: 44, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  cartBadge: { position: 'absolute', top: 4, right: 4, backgroundColor: Colors.danger, borderRadius: 8, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  cartCount: { color: Colors.white, fontSize: 10, fontWeight: '900' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.white, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 10 },
  searchInput: { flex: 1, fontSize: FontSizes.md, color: Colors.dark },
  catScroll: { flexGrow: 0 },
  catRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  catChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 20, paddingVertical: 15 },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  catLabelActive: { color: Colors.white },
  grid: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm },
  row: { justifyContent: 'space-between', marginBottom: Spacing.sm },
  productCard: { backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.sm },
  imageWrap: { position: 'relative' },
  productImage: { width: '100%', height: 150, resizeMode: 'cover' },
  badgeWrap: { position: 'absolute', top: 8, left: 8 },
  productInfo: { padding: Spacing.sm },
  productName: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark, marginBottom: 4, lineHeight: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  rating: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.dark },
  reviews: { fontSize: FontSizes.xs, color: Colors.gray500 },
  price: { fontSize: FontSizes.lg, fontWeight: '900', color: Colors.primary, marginBottom: 8 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: Colors.primary, borderRadius: Radius.sm, paddingVertical: 7 },
  addLabel: { color: Colors.white, fontSize: FontSizes.xs, fontWeight: '700' },
});
