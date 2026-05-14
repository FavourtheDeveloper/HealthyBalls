import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';
import ScreenHeader from '../../components/ScreenHeader';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: 'card' },
  { id: 'eft', label: 'EFT / Bank Transfer', icon: 'business' },
  { id: 'ewallet', label: 'eWallet / SnapScan', icon: 'phone-portrait' },
];

const deliveryOptions = [
  { id: 'courier', label: 'Courier Delivery (2–5 days)', price: 85 },
  { id: 'collect', label: 'Click & Collect (Free)', price: 0 },
];

export default function CheckoutScreen({ route, navigation }) {
  const { cart, total } = route.params;
  const insets = useSafeAreaInsets();
  const [payment, setPayment] = useState('card');
  const [delivery, setDelivery] = useState('courier');
  const [loading, setLoading] = useState(false);

  const selectedDelivery = deliveryOptions.find((d) => d.id === delivery);
  const grandTotal = total + (selectedDelivery?.price || 0);

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('OrderConfirmation', { orderId: 'HB-2026-' + Math.floor(Math.random() * 90000 + 10000) });
    }, 2000);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Checkout" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.card}>
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={Colors.gray500} defaultValue="Thabo Nkosi" />
            <TextInput style={styles.input} placeholder="Street Address" placeholderTextColor={Colors.gray500} defaultValue="45 Main Street, Sandton" />
            <View style={styles.row}>
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="City" placeholderTextColor={Colors.gray500} defaultValue="Johannesburg" />
              <View style={{ width: 8 }} />
              <TextInput style={[styles.input, { flex: 1 }]} placeholder="Postal Code" placeholderTextColor={Colors.gray500} defaultValue="2196" keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} placeholder="Province" placeholderTextColor={Colors.gray500} defaultValue="Gauteng" />
          </View>
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Method</Text>
          {deliveryOptions.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optionCard, delivery === opt.id && styles.optionCardActive]}
              onPress={() => setDelivery(opt.id)}
            >
              <Ionicons
                name={opt.id === 'courier' ? 'car' : 'storefront'}
                size={22}
                color={delivery === opt.id ? Colors.primary : Colors.gray500}
              />
              <View style={{ flex: 1, marginLeft: Spacing.sm }}>
                <Text style={[styles.optionLabel, delivery === opt.id && styles.optionLabelActive]}>{opt.label}</Text>
              </View>
              <Text style={[styles.optionPrice, { color: opt.price === 0 ? Colors.success : Colors.dark }]}>
                {opt.price === 0 ? 'FREE' : `R ${opt.price}`}
              </Text>
              <View style={[styles.radio, delivery === opt.id && styles.radioActive]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((pm) => (
            <TouchableOpacity
              key={pm.id}
              style={[styles.optionCard, payment === pm.id && styles.optionCardActive]}
              onPress={() => setPayment(pm.id)}
            >
              <Ionicons name={pm.icon} size={22} color={payment === pm.id ? Colors.primary : Colors.gray500} />
              <Text style={[styles.optionLabel, { flex: 1, marginLeft: Spacing.sm }, payment === pm.id && styles.optionLabelActive]}>
                {pm.label}
              </Text>
              <View style={[styles.radio, payment === pm.id && styles.radioActive]} />
            </TouchableOpacity>
          ))}

          {payment === 'card' && (
            <View style={styles.cardForm}>
              <TextInput style={styles.input} placeholder="Card Number" placeholderTextColor={Colors.gray500} keyboardType="numeric" />
              <View style={styles.row}>
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="MM/YY" placeholderTextColor={Colors.gray500} />
                <View style={{ width: 8 }} />
                <TextInput style={[styles.input, { flex: 1 }]} placeholder="CVV" placeholderTextColor={Colors.gray500} keyboardType="numeric" secureTextEntry />
              </View>
              <TextInput style={styles.input} placeholder="Cardholder Name" placeholderTextColor={Colors.gray500} />
            </View>
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryItem} numberOfLines={1}>{item.name} x{item.qty}</Text>
              <Text style={styles.summaryPrice}>R {item.price * item.qty}</Text>
            </View>
          ))}
          {cart.length > 3 && <Text style={styles.moreItems}>+{cart.length - 3} more items</Text>}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryPrice}>{selectedDelivery?.price === 0 ? 'FREE' : `R ${selectedDelivery?.price}`}</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 4 }]}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>R {grandTotal}</Text>
          </View>
        </View>

        <HBButton label="Place Order" onPress={placeOrder} loading={loading} icon="checkmark-circle" style={{ marginTop: Spacing.sm }} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md },
  section: { marginBottom: Spacing.md },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm },
  card: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm, gap: 8 },
  input: {
    borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: 11, fontSize: FontSizes.md, color: Colors.dark,
  },
  row: { flexDirection: 'row' },
  optionCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: Spacing.md, marginBottom: 8,
    borderWidth: 1.5, borderColor: Colors.gray200, ...Shadow.sm,
  },
  optionCardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  optionLabel: { fontSize: FontSizes.md, color: Colors.dark, fontWeight: '600' },
  optionLabelActive: { color: Colors.primary },
  optionPrice: { fontSize: FontSizes.md, fontWeight: '800', marginRight: Spacing.sm },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.gray300 },
  radioActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  cardForm: { marginTop: 8, gap: 8 },
  summaryCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, ...Shadow.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  summaryItem: { flex: 1, fontSize: FontSizes.sm, color: Colors.gray700 },
  summaryPrice: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark },
  summaryLabel: { fontSize: FontSizes.md, color: Colors.gray700 },
  moreItems: { fontSize: FontSizes.xs, color: Colors.gray500, marginBottom: 4 },
  divider: { height: 1, backgroundColor: Colors.gray100, marginVertical: 8 },
  totalLabel: { fontSize: FontSizes.lg, fontWeight: '900', color: Colors.dark },
  totalValue: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.primary },
});
