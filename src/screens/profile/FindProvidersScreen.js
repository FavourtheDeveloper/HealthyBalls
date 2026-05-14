import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { healthProviders } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';

const types = ['All', 'GP', 'Specialist', 'Mental Health', 'Laboratory'];

export default function FindProvidersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = healthProviders.filter((p) => {
    const matchType = filter === 'All' || p.type === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Find Health Providers" onBack={() => navigation.goBack()} />

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={Colors.gray500} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or specialty..."
          placeholderTextColor={Colors.gray500}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        horizontal
        data={types}
        keyExtractor={(t) => t}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.typeChip, filter === item && styles.typeChipActive]}
            onPress={() => setFilter(item)}
          >
            <Text style={[styles.typeLabel, filter === item && styles.typeLabelActive]}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.provCard}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.provAvatar} />
            ) : (
              <View style={[styles.provAvatar, { backgroundColor: Colors.primary + '15', justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="business" size={28} color={Colors.primary} />
              </View>
            )}
            <View style={styles.provInfo}>
              <View style={styles.provHeader}>
                <Text style={styles.provName} numberOfLines={1}>{item.name}</Text>
                <View style={[styles.availBadge, { backgroundColor: item.available ? Colors.success + '15' : Colors.danger + '15' }]}>
                  <View style={[styles.availDot, { backgroundColor: item.available ? Colors.success : Colors.danger }]} />
                  <Text style={[styles.availText, { color: item.available ? Colors.success : Colors.danger }]}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </Text>
                </View>
              </View>
              <Text style={styles.provSpec}>{item.specialty}</Text>
              <View style={styles.provMeta}>
                <Ionicons name="location" size={12} color={Colors.gray500} />
                <Text style={styles.metaText}>{item.distance} · {item.address}</Text>
              </View>
              <View style={styles.provFooter}>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color={Colors.secondary} />
                  <Text style={styles.rating}>{item.rating}</Text>
                  <Text style={styles.reviews}>({item.reviews})</Text>
                </View>
                <View style={styles.provActions}>
                  <TouchableOpacity style={styles.callBtn}>
                    <Ionicons name="call" size={14} color={Colors.primary} />
                  </TouchableOpacity>
                  <HBButton
                    label="Book"
                    size="sm"
                    icon="calendar"
                    onPress={() => navigation.navigate('BookAppointment')}
                    style={styles.bookBtn}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.white, margin: Spacing.md, marginBottom: 0, borderRadius: Radius.md, paddingHorizontal: Spacing.md, paddingVertical: 10, ...Shadow.sm },
  searchInput: { flex: 1, fontSize: FontSizes.md, color: Colors.dark },
  typeRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  typeChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6 },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  typeLabelActive: { color: Colors.white },
  list: { padding: Spacing.md, gap: Spacing.sm },
  provCard: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, gap: Spacing.md, ...Shadow.sm },
  provAvatar: { width: 64, height: 64, borderRadius: 32, flexShrink: 0 },
  provInfo: { flex: 1 },
  provHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  provName: { flex: 1, fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark },
  availBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full },
  availDot: { width: 6, height: 6, borderRadius: 3 },
  availText: { fontSize: 10, fontWeight: '700' },
  provSpec: { fontSize: FontSizes.sm, color: Colors.primary, fontWeight: '600', marginBottom: 4 },
  provMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  metaText: { fontSize: FontSizes.xs, color: Colors.gray500, flex: 1 },
  provFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.dark },
  reviews: { fontSize: FontSizes.xs, color: Colors.gray500 },
  provActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  callBtn: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  bookBtn: { paddingHorizontal: 12, paddingVertical: 0 },
});
