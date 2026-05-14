import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  Image, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';

function FormField({ label, required, icon, children }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.asterisk}> *</Text>}
      </Text>
      <View style={styles.inputRow}>
        {icon && <Ionicons name={icon} size={18} color={Colors.gray500} style={styles.inputIcon} />}
        {children}
      </View>
    </View>
  );
}

function StyledInput({ icon, ...props }) {
  return (
    <FormField label={props.label} required={props.required} icon={icon}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.gray500}
        {...props}
      />
    </FormField>
  );
}

export default function RegisterScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const type = route?.params?.type || 'user';

  const [form, setForm] = useState({
    firstName: '', lastName: '', mobile: '', email: '',
    dob: '', gender: 'M', idNumber: '', medicalAid: null,
    photo: null,
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take your selfie.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!result.canceled) set('photo', result.assets[0].uri);
  };

  const handleRegister = () => {
    if (!form.firstName || !form.lastName || !form.mobile || !form.dob) {
      Alert.alert('Required fields missing', 'Please fill in all required fields marked with *');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('App');
    }, 1800);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.dark} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Ionicons name="fitness" size={32} color={Colors.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            {type === 'medical' ? 'Medical Professional Registration' :
              type === 'business' ? 'Business Registration' :
              'Join the HealthyBalls community'}
          </Text>
        </View>

        {/* Photo */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoBtn} onPress={pickPhoto}>
            {form.photo ? (
              <Image source={{ uri: form.photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={32} color={Colors.gray500} />
                <Text style={styles.photoHint}>Take Selfie</Text>
                <Text style={styles.photoSub}>No glasses or headgear</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.photoRequired}>* Profile photo required (no glasses or hat)</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>First Name <Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Thabo"
                placeholderTextColor={Colors.gray500}
                value={form.firstName}
                onChangeText={(v) => set('firstName', v)}
              />
            </View>
            <View style={{ width: Spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Surname <Text style={styles.asterisk}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Nkosi"
                placeholderTextColor={Colors.gray500}
                value={form.lastName}
                onChangeText={(v) => set('lastName', v)}
              />
            </View>
          </View>

          <Text style={styles.label}>Mobile Number <Text style={styles.asterisk}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="+27 82 345 6789"
            placeholderTextColor={Colors.gray500}
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={(v) => set('mobile', v)}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            placeholderTextColor={Colors.gray500}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => set('email', v)}
          />

          <Text style={styles.label}>Date of Birth <Text style={styles.asterisk}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors.gray500}
            value={form.dob}
            onChangeText={(v) => set('dob', v)}
          />

          <Text style={styles.label}>Gender <Text style={styles.asterisk}>*</Text></Text>
          <View style={styles.genderRow}>
            {['M', 'F'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderBtn, form.gender === g && styles.genderActive]}
                onPress={() => set('gender', g)}
              >
                <Ionicons
                  name={g === 'M' ? 'male' : 'female'}
                  size={20}
                  color={form.gender === g ? Colors.white : Colors.primary}
                />
                <Text style={[styles.genderLabel, form.gender === g && styles.genderLabelActive]}>
                  {g === 'M' ? 'Male' : 'Female'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>ID Number</Text>
          <TextInput
            style={styles.input}
            placeholder="ID number (optional)"
            placeholderTextColor={Colors.gray500}
            keyboardType="numeric"
            value={form.idNumber}
            onChangeText={(v) => set('idNumber', v)}
          />

          <Text style={styles.label}>Medical Aid / Insurance <Text style={styles.asterisk}>*</Text></Text>
          <View style={styles.genderRow}>
            {[true, false].map((v) => (
              <TouchableOpacity
                key={String(v)}
                style={[styles.genderBtn, form.medicalAid === v && styles.genderActive]}
                onPress={() => set('medicalAid', v)}
              >
                <Ionicons
                  name={v ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={form.medicalAid === v ? Colors.white : Colors.primary}
                />
                <Text style={[styles.genderLabel, form.medicalAid === v && styles.genderLabelActive]}>
                  {v ? 'Yes' : 'No'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {type === 'medical' && (
            <>
              <View style={styles.sectionDivider}>
                <Text style={styles.sectionLabel}>Medical Professional Details</Text>
              </View>
              <Text style={styles.label}>Practice Number <Text style={styles.asterisk}>*</Text></Text>
              <TextInput style={styles.input} placeholder="MP0123456" placeholderTextColor={Colors.gray500} />
              <Text style={styles.label}>Medical Association Membership</Text>
              <TextInput style={styles.input} placeholder="e.g. HPCSA, BHF" placeholderTextColor={Colors.gray500} />
              <Text style={styles.label}>Practice Name</Text>
              <TextInput style={styles.input} placeholder="Practice name" placeholderTextColor={Colors.gray500} />
            </>
          )}

          {type === 'business' && (
            <>
              <View style={styles.sectionDivider}>
                <Text style={styles.sectionLabel}>Business Details</Text>
              </View>
              <Text style={styles.label}>Business Name <Text style={styles.asterisk}>*</Text></Text>
              <TextInput style={styles.input} placeholder="Company name" placeholderTextColor={Colors.gray500} />
              <Text style={styles.label}>Company Registration Number</Text>
              <TextInput style={styles.input} placeholder="CK2023/123456/07" placeholderTextColor={Colors.gray500} />
              <Text style={styles.label}>Tax Registration Number</Text>
              <TextInput style={styles.input} placeholder="VAT/Tax reg (optional)" placeholderTextColor={Colors.gray500} />
            </>
          )}

          <HBButton
            label="Create My Account"
            onPress={handleRegister}
            loading={loading}
            icon="rocket"
            style={{ marginTop: Spacing.lg }}
          />

          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginHighlight}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.md, paddingBottom: 60 },
  backBtn: { marginTop: Spacing.md, width: 40, height: 40, justifyContent: 'center' },
  header: { alignItems: 'center', marginVertical: Spacing.lg },
  title: { fontSize: FontSizes.xxl, fontWeight: '900', color: Colors.dark, marginTop: 8 },
  subtitle: { color: Colors.gray500, fontSize: FontSizes.sm, marginTop: 4, textAlign: 'center' },
  photoSection: { alignItems: 'center', marginBottom: Spacing.lg },
  photoBtn: { marginBottom: 6 },
  photoPreview: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: Colors.primary },
  photoPlaceholder: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.gray100, borderWidth: 2,
    borderColor: Colors.gray300, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center',
  },
  photoHint: { color: Colors.primary, fontSize: FontSizes.xs, fontWeight: '700', marginTop: 4 },
  photoSub: { color: Colors.gray500, fontSize: 10, textAlign: 'center' },
  photoRequired: { color: Colors.danger, fontSize: FontSizes.xs },
  form: { gap: 6 },
  row: { flexDirection: 'row' },
  label: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.dark, marginBottom: 4, marginTop: 8 },
  asterisk: { color: Colors.danger },
  input: {
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.gray300,
    borderRadius: Radius.sm, paddingHorizontal: Spacing.md, paddingVertical: 12,
    fontSize: FontSizes.md, color: Colors.dark,
    ...Shadow.sm,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: 12, zIndex: 1 },
  field: {},
  genderRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: 4 },
  genderBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: Radius.md, paddingVertical: 12,
  },
  genderActive: { backgroundColor: Colors.primary },
  genderLabel: { fontSize: FontSizes.md, color: Colors.primary, fontWeight: '600' },
  genderLabelActive: { color: Colors.white },
  sectionDivider: { marginVertical: Spacing.md, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: Colors.primary },
  sectionLabel: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.primary },
  loginLink: { marginTop: Spacing.md, alignItems: 'center' },
  loginText: { color: Colors.gray500, fontSize: FontSizes.sm },
  loginHighlight: { color: Colors.primary, fontWeight: '700' },
});
