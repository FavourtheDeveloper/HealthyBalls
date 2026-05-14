import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { partners } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import BadgeChip from '../../components/BadgeChip';

const categoryColors = {
  Government: Colors.primary,
  NGO: Colors.success,
  'Medical Aid': '#1565C0',
  Media: '#6A1B9A',
  Healthcare: Colors.warning,
  Technology: '#E65100',
};

export default function PartnersScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Partners & Stakeholders" onBack={() => navigation.goBack()} />

      <FlatList
        data={partners}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
            <Ionicons name="business" size={36} color={Colors.secondary} />
            <Text style={styles.heroTitle}>Our Partners</Text>
            <Text style={styles.heroSub}>
              HealthyBalls works with leading organisations across health, government, technology, and media to bring quality healthcare to all men.
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>6+</Text>
                <Text style={styles.statLabel}>Partners</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>3M+</Text>
                <Text style={styles.statLabel}>Reach</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>9</Text>
                <Text style={styles.statLabel}>Provinces</Text>
              </View>
            </View>
          </LinearGradient>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const color = categoryColors[item.category] || Colors.primary;
          return (
            <View style={styles.partnerCard}>
              <View style={[styles.logoWrap, { backgroundColor: color + '10' }]}>
                <Ionicons
                  name={
                    item.category === 'Government' ? 'flag' :
                    item.category === 'NGO' ? 'heart' :
                    item.category === 'Medical Aid' ? 'shield-checkmark' :
                    item.category === 'Media' ? 'radio' :
                    item.category === 'Healthcare' ? 'medkit' : 'phone-portrait'
                  }
                  size={32}
                  color={color}
                />
              </View>
              <View style={styles.partnerInfo}>
                <View style={styles.partnerHeader}>
                  <Text style={styles.partnerName}>{item.name}</Text>
                  <BadgeChip label={item.category} color={color} small />
                </View>
                <Text style={styles.partnerDesc}>{item.description}</Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.cta}>
            <Text style={styles.ctaTitle}>Become a Partner</Text>
            <Text style={styles.ctaBody}>
              Are you a healthcare provider, NGO, or business that wants to join the HealthyBalls mission?
              Reach millions of men and make a real impact.
            </Text>
            <Text style={styles.ctaContact}>partnerships@healthyballs.co.za</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing.xl, alignItems: 'center' },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, textAlign: 'center', marginTop: 8, lineHeight: 20, marginBottom: Spacing.lg },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: Radius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: Colors.secondary, fontSize: FontSizes.xxl, fontWeight: '900' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.xs, marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.2)' },
  list: { padding: Spacing.md, gap: Spacing.sm },
  partnerCard: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.sm },
  logoWrap: { width: 72, justifyContent: 'center', alignItems: 'center' },
  partnerInfo: { flex: 1, padding: Spacing.md },
  partnerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  partnerName: { flex: 1, fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark, marginRight: 8 },
  partnerDesc: { fontSize: FontSizes.sm, color: Colors.gray700, lineHeight: 18 },
  cta: { backgroundColor: Colors.primary, borderRadius: Radius.lg, padding: Spacing.lg, margin: Spacing.sm, alignItems: 'center' },
  ctaTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '900', marginBottom: 8, textAlign: 'center' },
  ctaBody: { color: 'rgba(255,255,255,0.8)', fontSize: FontSizes.sm, textAlign: 'center', lineHeight: 20, marginBottom: Spacing.sm },
  ctaContact: { color: Colors.secondary, fontSize: FontSizes.md, fontWeight: '700' },
});
