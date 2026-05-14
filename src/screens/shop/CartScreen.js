import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';
import ScreenHeader from '../../components/ScreenHeader';

export default function CartScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const initialCart = route.params?.cart || [];
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, delta) => {
    setCart((c) =>
      c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 500 ? 0 : 85;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScreenHeader title="My Cart" onBack={() => navigation.goBack()} />
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={64} color={Colors.gray300} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Browse our merchandise and add items to get started.</Text>
          <HBButton label="Browse Merchandise" onPress={() => navigation.goBack()} icon="bag" style={{ marginTop: Spacing.lg }} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title={`My Cart (${cart.length})`} onBack={() => navigation.goBack()} />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              {item.selectedSize && <Text style={styles.itemMeta}>Size: {item.selectedSize}</Text>}
              {item.selectedColor && <Text style={styles.itemMeta}>Colour: {item.selectedColor}</Text>}
              <Text style={styles.itemPrice}>R {item.price}</Text>
            </View>
            <View style={styles.itemActions}>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="trash-outline" size={18} color={Colors.danger} />
              </TouchableOpacity>
              <View style={styles.qtyControl}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                  <Ionicons name="remove" size={16} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                  <Ionicons name="add" size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.lineTotal}>R {item.price * item.qty}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {[
              { label: 'Subtotal', value: `R ${subtotal}` },
              { label: 'Shipping', value: shipping === 0 ? 'FREE' : `R ${shipping}` },
            ].map((row) => (
              <View key={row.label} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{row.label}</Text>
                <Text style={[styles.summaryValue, row.label === 'Shipping' && shipping === 0 && { color: Colors.success }]}>
                  {row.value}
                </Text>
              </View>
            ))}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R {total}</Text>
            </View>
            {shipping > 0 && (
              <Text style={styles.shippingHint}>Add R {500 - subtotal} more for free shipping</Text>
            )}
            <HBButton
              label="Proceed to Checkout"
              onPress={() => navigation.navigate('Checkout', { cart, total })}
              icon="card"
              style={{ marginTop: Spacing.md }}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  emptyTitle: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.dark, marginTop: Spacing.md },
  emptySub: { color: Colors.gray500, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  list: { padding: Spacing.md, gap: Spacing.sm },
  cartItem: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.sm },
  itemImage: { width: 90, height: 90, resizeMode: 'cover' },
  itemInfo: { flex: 1, padding: Spacing.sm },
  itemName: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark, marginBottom: 4, lineHeight: 18 },
  itemMeta: { fontSize: FontSizes.xs, color: Colors.gray500 },
  itemPrice: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.primary, marginTop: 4 },
  itemActions: { padding: Spacing.sm, alignItems: 'flex-end', justifyContent: 'space-between' },
  qtyControl: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Colors.gray300, borderRadius: Radius.sm },
  qtyBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  qty: { fontSize: FontSizes.sm, fontWeight: '700', width: 24, textAlign: 'center' },
  lineTotal: { fontSize: FontSizes.sm, fontWeight: '800', color: Colors.dark },
  summary: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, margin: Spacing.sm, ...Shadow.md },
  summaryTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: FontSizes.md, color: Colors.gray700 },
  summaryValue: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark },
  totalRow: { borderTopWidth: 1, borderTopColor: Colors.gray100, paddingTop: Spacing.sm, marginTop: 4 },
  totalLabel: { fontSize: FontSizes.lg, fontWeight: '900', color: Colors.dark },
  totalValue: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.primary },
  shippingHint: { fontSize: FontSizes.xs, color: Colors.primary, textAlign: 'center', marginTop: 4 },
});
