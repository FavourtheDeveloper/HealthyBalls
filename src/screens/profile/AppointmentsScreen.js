import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { appointments } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';
import BadgeChip from '../../components/BadgeChip';

const statusColor = { Confirmed: Colors.success, Pending: Colors.warning, Completed: Colors.gray500, Cancelled: Colors.danger };

export default function AppointmentsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Confirmed', 'Pending', 'Completed'];
  const filtered = appointments.filter((a) => filter === 'All' || a.status === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Appointments" onBack={() => navigation.goBack()} />

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

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <HBButton
            label="Book New Appointment"
            icon="calendar-outline"
            onPress={() => navigation.navigate('BookAppointment')}
            style={{ marginBottom: Spacing.sm }}
          />
        }
        renderItem={({ item }) => {
          const color = statusColor[item.status] || Colors.gray500;
          return (
            <View style={styles.apptCard}>
              <View style={styles.apptHeader}>
                <Text style={styles.apptType}>{item.type}</Text>
                <BadgeChip label={item.status} color={color} small />
              </View>
              <Text style={styles.apptDoctor}>{item.doctor}</Text>
              <Text style={styles.apptFacility}>{item.facility}</Text>
              <Text style={styles.apptAddress}>{item.address}</Text>
              <View style={styles.apptDateTime}>
                <View style={styles.dtItem}>
                  <Ionicons name="calendar" size={14} color={Colors.primary} />
                  <Text style={styles.dtText}>{item.date}</Text>
                </View>
                <View style={styles.dtItem}>
                  <Ionicons name="time" size={14} color={Colors.primary} />
                  <Text style={styles.dtText}>{item.time}</Text>
                </View>
              </View>
              {item.notes ? (
                <View style={styles.notes}>
                  <Ionicons name="information-circle" size={14} color={Colors.warning} />
                  <Text style={styles.notesText}>{item.notes}</Text>
                </View>
              ) : null}
              {item.status !== 'Completed' && (
                <View style={styles.apptActions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
                    <Text style={styles.actionLabel}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { borderColor: Colors.danger }]}>
                    <Ionicons name="close-circle-outline" size={14} color={Colors.danger} />
                    <Text style={[styles.actionLabel, { color: Colors.danger }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  filterRow: { flexDirection: 'row', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  filterChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6 },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  filterLabelActive: { color: Colors.white },
  list: { padding: Spacing.md, gap: Spacing.sm },
  apptCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm },
  apptHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  apptType: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark },
  apptDoctor: { fontSize: FontSizes.lg, fontWeight: '700', color: Colors.primary, marginBottom: 2 },
  apptFacility: { fontSize: FontSizes.sm, color: Colors.gray700, marginBottom: 2 },
  apptAddress: { fontSize: FontSizes.xs, color: Colors.gray500, marginBottom: 8 },
  apptDateTime: { flexDirection: 'row', gap: Spacing.md, marginBottom: 8 },
  dtItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dtText: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  notes: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, backgroundColor: Colors.warning + '10', borderRadius: Radius.sm, padding: 8, marginBottom: 8 },
  notesText: { flex: 1, fontSize: FontSizes.xs, color: Colors.gray700, lineHeight: 16 },
  apptActions: { flexDirection: 'row', gap: Spacing.sm, marginTop: 4 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1.5, borderColor: Colors.primary, borderRadius: Radius.sm, paddingVertical: 8 },
  actionLabel: { fontSize: FontSizes.xs, color: Colors.primary, fontWeight: '700' },
});
