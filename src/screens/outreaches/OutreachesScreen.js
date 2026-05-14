import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { outreaches } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import BadgeChip from '../../components/BadgeChip';

export default function OutreachesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Upcoming', 'Past'];

  const filtered = outreaches.filter((o) => filter === 'All' || o.status === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Outreaches" onBack={() => navigation.goBack()} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
              <Ionicons name="location" size={36} color={Colors.secondary} />
              <Text style={styles.heroTitle}>Health Outreaches</Text>
              <Text style={styles.heroSub}>Free health screenings and education events in your community.</Text>
            </LinearGradient>
            <View style={styles.filterRow}>
              {filters.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.filterChip, filter === f && styles.filterChipActive]}
                  onPress={() => setFilter(f)}
                >
                  <Text style={[styles.filterLabel, filter === f && styles.filterLabelActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => {
          const spots = item.capacity - item.registered;
          const pct = Math.round((item.registered / item.capacity) * 100);
          return (
            <TouchableOpacity
              style={styles.eventCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('OutreachDetail', { outreach: item })}
            >
              <Image source={{ uri: item.image }} style={styles.eventImage} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.imageOverlay}>
                <BadgeChip
                  label={item.status}
                  color={item.status === 'Upcoming' ? Colors.success : Colors.gray500}
                  small
                />
              </LinearGradient>
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <View style={styles.eventMeta}>
                  <Ionicons name="calendar" size={14} color={Colors.primary} />
                  <Text style={styles.eventDate}>{item.date} · {item.time}</Text>
                </View>
                <View style={styles.eventMeta}>
                  <Ionicons name="location" size={14} color={Colors.primary} />
                  <Text style={styles.eventLocation}>{item.city}</Text>
                </View>
                <Text style={styles.eventDesc} numberOfLines={2}>{item.description}</Text>

                {item.status === 'Upcoming' && (
                  <View style={styles.capacitySection}>
                    <View style={styles.capRow}>
                      <Text style={styles.capLabel}>Spots filled</Text>
                      <Text style={[styles.capPct, { color: pct > 80 ? Colors.danger : Colors.primary }]}>{pct}%</Text>
                    </View>
                    <View style={styles.capBar}>
                      <View style={[styles.capBarFill, { width: `${pct}%`, backgroundColor: pct > 80 ? Colors.danger : Colors.primary }]} />
                    </View>
                    <Text style={styles.spotsLeft}>{spots} spots remaining</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing.xl, alignItems: 'center', marginBottom: 0 },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  filterRow: { flexDirection: 'row', padding: Spacing.md, paddingBottom: 0, gap: Spacing.sm },
  filterChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 7 },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  filterLabelActive: { color: Colors.white },
  list: { padding: Spacing.md, gap: Spacing.md },
  eventCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  eventImage: { width: '100%', height: 160 },
  imageOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 160, justifyContent: 'flex-start', padding: Spacing.sm },
  eventContent: { padding: Spacing.md },
  eventTitle: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.dark, marginBottom: 8 },
  eventMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  eventDate: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  eventLocation: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  eventDesc: { fontSize: FontSizes.sm, color: Colors.gray500, lineHeight: 18, marginTop: 6, marginBottom: 10 },
  capacitySection: { marginTop: 4 },
  capRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  capLabel: { fontSize: FontSizes.xs, color: Colors.gray500 },
  capPct: { fontSize: FontSizes.xs, fontWeight: '800' },
  capBar: { height: 6, backgroundColor: Colors.gray100, borderRadius: Radius.full, marginBottom: 4 },
  capBarFill: { height: 6, borderRadius: Radius.full },
  spotsLeft: { fontSize: FontSizes.xs, color: Colors.gray500 },
});
