import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';

const sections = [
  {
    title: 'Return Policy',
    icon: 'refresh-circle',
    color: Colors.primary,
    content: `We want you to be completely satisfied with your HealthyBalls purchase. If you are not happy with your order for any reason, you may return eligible items within 30 days of delivery.\n\n**Conditions for Return:**\n- Items must be unused, unwashed, and in original condition\n- Original tags must still be attached\n- Items must be in original packaging\n- Proof of purchase (order confirmation) is required`,
  },
  {
    title: 'Exchange Policy',
    icon: 'swap-horizontal',
    color: '#1565C0',
    content: `Exchanges are allowed for size, colour, or defective products within 30 days of purchase.\n\n**How to Exchange:**\n1. Contact us at returns@healthyballs.co.za\n2. Quote your order number\n3. State the item and reason for exchange\n4. Receive a return shipping label\n5. Send the item back\n6. Your exchange will be dispatched within 5 business days`,
  },
  {
    title: 'Health Kit Returns',
    icon: 'medkit',
    color: '#6A1B9A',
    content: `For health and safety reasons, opened health kits (including PSA test kits and self-examination kits) cannot be returned or exchanged once opened.\n\nUnopened health kits may be returned within 14 days of delivery if:\n- The packaging seal is intact\n- The product has not been used\n- The item is within its expiry date`,
  },
  {
    title: 'Non-Returnable Items',
    icon: 'close-circle',
    color: Colors.danger,
    content: `The following items cannot be returned:\n- Opened health kits and test kits\n- Downloadable digital products\n- Gift cards\n- Sale or clearance items (unless defective)\n- Personalised or custom items`,
  },
  {
    title: 'Refund Process',
    icon: 'cash',
    color: Colors.success,
    content: `Once your return is received and inspected, we will notify you by email.\n\n**Refund Timeline:**\n- Approval confirmation: 1–2 business days\n- Refund to original payment method: 5–7 business days\n- Bank processing time may vary\n\nRefunds are issued to the original payment method only. We do not issue cash refunds.`,
  },
  {
    title: 'Shipping Costs',
    icon: 'car',
    color: Colors.warning,
    content: `Return shipping is FREE for defective or incorrect items.\n\nFor change-of-mind returns, the customer is responsible for return shipping costs.\n\nWe recommend using a trackable courier service. HealthyBalls is not responsible for lost return shipments.`,
  },
];

function PolicySection({ section }) {
  const lines = section.content.split('\n');
  return (
    <View style={[styles.sectionCard, { borderTopColor: section.color }]}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIcon, { backgroundColor: section.color + '15' }]}>
          <Ionicons name={section.icon} size={22} color={section.color} />
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <View style={styles.sectionBody}>
        {lines.map((line, i) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <Text key={i} style={styles.bold}>{line.slice(2, -2)}</Text>;
          }
          if (/^\d\./.test(line)) {
            return (
              <View key={i} style={styles.numRow}>
                <Text style={[styles.numDot, { color: section.color }]}>{line.charAt(0)}.</Text>
                <Text style={styles.numText}>{line.slice(2)}</Text>
              </View>
            );
          }
          if (line.startsWith('- ')) {
            return (
              <View key={i} style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: section.color }]} />
                <Text style={styles.bulletText}>{line.slice(2)}</Text>
              </View>
            );
          }
          if (line.trim() === '') return <View key={i} style={{ height: 6 }} />;
          return <Text key={i} style={styles.bodyText}>{line}</Text>;
        })}
      </View>
    </View>
  );
}

export default function ReturnsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Returns & Exchange" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroBanner}>
          <Ionicons name="refresh-circle" size={36} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Our Promise</Text>
            <Text style={styles.heroSub}>Easy returns. Hassle-free exchanges. 30-day guarantee.</Text>
          </View>
        </View>
        {sections.map((s) => <PolicySection key={s.title} section={s} />)}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need Help?</Text>
          <Text style={styles.contactSub}>Our support team is available Mon–Fri, 08:00–17:00</Text>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="mail" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>returns@healthyballs.co.za</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactItem}>
            <Ionicons name="call" size={18} color={Colors.primary} />
            <Text style={styles.contactText}>+27 11 123 4567</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.sm },
  heroBanner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.primary + '30' },
  heroTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.primary },
  heroSub: { fontSize: FontSizes.sm, color: Colors.gray700, lineHeight: 18 },
  sectionCard: { backgroundColor: Colors.white, borderRadius: Radius.md, borderTopWidth: 3, padding: Spacing.md, ...Shadow.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  sectionIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark },
  sectionBody: { gap: 2 },
  bold: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark, marginTop: 8 },
  bodyText: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingLeft: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 9 },
  bulletText: { flex: 1, fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22 },
  numRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingLeft: 4 },
  numDot: { fontSize: FontSizes.md, fontWeight: '800', minWidth: 20 },
  numText: { flex: 1, fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22 },
  contactCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm },
  contactTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: 4 },
  contactSub: { fontSize: FontSizes.sm, color: Colors.gray500, marginBottom: Spacing.sm },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  contactText: { fontSize: FontSizes.md, color: Colors.primary, fontWeight: '600' },
});
