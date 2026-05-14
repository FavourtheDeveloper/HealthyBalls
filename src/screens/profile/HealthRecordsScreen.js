import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { healthRecords } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';

const statusColor = { Normal: Colors.success, Watch: Colors.warning, Abnormal: Colors.danger };
const statusIcon = { Normal: 'checkmark-circle', Watch: 'warning', Abnormal: 'alert-circle' };

export default function HealthRecordsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Health Records" subtitle="Your complete medical history" onBack={() => navigation.goBack()} />

      <FlatList
        data={healthRecords}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <HBButton
              label="Upload New Record"
              icon="cloud-upload"
              variant="outline"
              onPress={() => {}}
            />
          </View>
        }
        renderItem={({ item }) => {
          const color = statusColor[item.status] || Colors.gray500;
          const icon = statusIcon[item.status] || 'help-circle';
          return (
            <TouchableOpacity style={styles.recordCard} activeOpacity={0.9}>
              <View style={[styles.recordBar, { backgroundColor: color }]} />
              <View style={styles.recordContent}>
                <View style={styles.recordHeader}>
                  <Text style={styles.recordType}>{item.type}</Text>
                  <View style={styles.recordStatus}>
                    <Ionicons name={icon} size={14} color={color} />
                    <Text style={[styles.statusText, { color }]}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.recordResult}>{item.result}</Text>
                <View style={styles.recordMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={12} color={Colors.gray500} />
                    <Text style={styles.metaText}>{item.doctor}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="business" size={12} color={Colors.gray500} />
                    <Text style={styles.metaText}>{item.facility}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar" size={12} color={Colors.gray500} />
                    <Text style={styles.metaText}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray300} />
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, gap: Spacing.sm },
  headerSection: { marginBottom: Spacing.sm },
  recordCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.sm },
  recordBar: { width: 4, alignSelf: 'stretch' },
  recordContent: { flex: 1, padding: Spacing.md },
  recordHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  recordType: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark },
  recordStatus: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statusText: { fontSize: FontSizes.xs, fontWeight: '700' },
  recordResult: { fontSize: FontSizes.sm, color: Colors.gray700, marginBottom: 8, lineHeight: 18 },
  recordMeta: { gap: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FontSizes.xs, color: Colors.gray500 },
});
