import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';
import { healthProviders } from '../../data/dummyData';

const appointmentTypes = [
  'PSA Screening', 'Testicular Exam', 'General Checkup', 'Mental Health Counselling',
  'STI Testing', 'VMMC Consultation', 'Blood Tests', 'Specialist Consultation',
];

const timeSlots = ['08:00', '09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:00'];

export default function BookAppointmentScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [apptType, setApptType] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const book = () => {
    if (!apptType || !selectedProvider || !selectedTime || !date) {
      Alert.alert('Missing info', 'Please complete all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Appointment Booked!',
        `Your ${apptType} with ${selectedProvider.name} on ${date} at ${selectedTime} is confirmed.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Book Appointment" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionTitle}>Appointment Type</Text>
        <View style={styles.typeGrid}>
          {appointmentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.typeChip, apptType === type && styles.typeChipActive]}
              onPress={() => setApptType(type)}
            >
              <Text style={[styles.typeLabel, apptType === type && styles.typeLabelActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Provider</Text>
        {healthProviders.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={[styles.provCard, selectedProvider?.id === p.id && styles.provCardActive]}
            onPress={() => setSelectedProvider(p)}
          >
            <View style={styles.provInfo}>
              <Text style={styles.provName}>{p.name}</Text>
              <Text style={styles.provSpec}>{p.specialty}</Text>
              <View style={styles.provMeta}>
                <Ionicons name="location" size={12} color={Colors.gray500} />
                <Text style={styles.provDist}>{p.distance}</Text>
                <View style={[styles.availDot, { backgroundColor: p.available ? Colors.success : Colors.danger }]} />
                <Text style={styles.availText}>{p.available ? 'Available' : 'Unavailable'}</Text>
              </View>
            </View>
            <View style={[styles.radioCircle, selectedProvider?.id === p.id && styles.radioActive]} />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Preferred Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD (e.g. 2026-06-01)"
          placeholderTextColor={Colors.gray500}
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeChip, selectedTime === t && styles.timeChipActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeLabel, selectedTime === t && styles.timeLabelActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Notes / Reason (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any specific concerns or information..."
          placeholderTextColor={Colors.gray500}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />

        <HBButton label="Confirm Booking" icon="checkmark-circle" onPress={book} loading={loading} style={{ marginTop: Spacing.md }} />
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm, marginTop: Spacing.md },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  typeChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 8 },
  typeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  typeLabel: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  typeLabelActive: { color: Colors.white },
  provCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: 8, borderWidth: 1.5, borderColor: Colors.gray200, ...Shadow.sm },
  provCardActive: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  provInfo: { flex: 1 },
  provName: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark },
  provSpec: { fontSize: FontSizes.sm, color: Colors.gray500, marginTop: 2 },
  provMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  provDist: { fontSize: FontSizes.xs, color: Colors.gray500 },
  availDot: { width: 6, height: 6, borderRadius: 3 },
  availText: { fontSize: FontSizes.xs, color: Colors.gray500 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.gray300 },
  radioActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  input: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.sm, paddingHorizontal: Spacing.md, paddingVertical: 12, fontSize: FontSizes.md, color: Colors.dark, backgroundColor: Colors.white },
  textArea: { height: 90, textAlignVertical: 'top' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.sm, paddingHorizontal: 16, paddingVertical: 8 },
  timeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  timeLabel: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '600' },
  timeLabelActive: { color: Colors.white },
});
