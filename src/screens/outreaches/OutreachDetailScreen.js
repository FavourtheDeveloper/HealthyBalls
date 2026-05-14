import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';
import BadgeChip from '../../components/BadgeChip';

export default function OutreachDetailScreen({ route, navigation }) {
  const { outreach } = route.params;
  const insets = useSafeAreaInsets();
  const [registered, setRegistered] = useState(false);

  const register = () => {
    if (outreach.status !== 'Upcoming') return;
    setRegistered(true);
    Alert.alert('Registered!', `You're registered for ${outreach.title}. We'll send you a reminder SMS before the event.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: outreach.image }} style={styles.heroImage} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.heroOverlay}>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <BadgeChip label={outreach.status} color={outreach.status === 'Upcoming' ? Colors.success : Colors.gray500} />
            <Text style={styles.heroTitle}>{outreach.title}</Text>
          </LinearGradient>
        </View>

        <View style={styles.body}>
          {/* Details */}
          <View style={styles.detailsCard}>
            {[
              { icon: 'calendar', label: 'Date', value: outreach.date },
              { icon: 'time', label: 'Time', value: outreach.time },
              { icon: 'location', label: 'Venue', value: outreach.location },
              { icon: 'map', label: 'City', value: outreach.city },
              { icon: 'person', label: 'Ambassador', value: outreach.ambassador },
              { icon: 'people', label: 'Capacity', value: `${outreach.registered}/${outreach.capacity} registered` },
            ].map((d) => (
              <View key={d.label} style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name={d.icon} size={16} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.detailLabel}>{d.label}</Text>
                  <Text style={styles.detailValue}>{d.value}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About This Event</Text>
          <Text style={styles.description}>{outreach.description}</Text>

          <Text style={styles.sectionTitle}>Services Available</Text>
          <View style={styles.servicesGrid}>
            {outreach.services.map((service) => (
              <View key={service} style={styles.serviceChip}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>

          {outreach.status === 'Upcoming' && !registered && (
            <HBButton
              label="Register for This Event"
              icon="calendar"
              onPress={register}
              style={{ marginTop: Spacing.md }}
            />
          )}
          {registered && (
            <View style={styles.registeredBanner}>
              <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
              <Text style={styles.registeredText}>You're registered! See you there.</Text>
            </View>
          )}

          <HBButton
            label="Share This Event"
            icon="share-social"
            variant="outline"
            onPress={() => Alert.alert('Share', 'Sharing feature available in full version.')}
            style={{ marginTop: Spacing.sm }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  heroWrap: { height: 280, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: Spacing.md, justifyContent: 'flex-end' },
  backBtn: { position: 'absolute', top: 8, left: Spacing.md, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', lineHeight: 30 },
  body: { padding: Spacing.md },
  detailsCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, ...Shadow.sm, gap: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  detailIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  detailLabel: { fontSize: FontSizes.xs, color: Colors.gray500, fontWeight: '700' },
  detailValue: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600', marginTop: 1 },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm, marginTop: Spacing.sm },
  description: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22, marginBottom: Spacing.sm },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  serviceChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.success + '10', borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: Colors.success + '30' },
  serviceText: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  registeredBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.success + '15', borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.md },
  registeredText: { fontSize: FontSizes.md, color: Colors.success, fontWeight: '700', flex: 1 },
});
