import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!mobile) {
      Alert.alert('Required', 'Please enter your mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('App');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Ionicons name="fitness" size={48} color={Colors.white} />
        <Text style={styles.brand}>HealthyBalls</Text>
        <Text style={styles.tagline}>Welcome Back, Champion</Text>
      </LinearGradient>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Use your registered mobile number or email</Text>

        <Text style={styles.label}>Mobile / Email <Text style={{ color: Colors.danger }}>*</Text></Text>
        <View style={styles.inputWrap}>
          <Ionicons name="call" size={18} color={Colors.gray500} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="+27 82 345 6789"
            placeholderTextColor={Colors.gray500}
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Text style={styles.label}>Password <Text style={{ color: Colors.danger }}>*</Text></Text>
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed" size={18} color={Colors.gray500} style={styles.icon} />
          <TextInput
            style={[styles.input, { paddingRight: 44 }]}
            placeholder="Enter password"
            placeholderTextColor={Colors.gray500}
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(!showPass)}>
            <Ionicons name={showPass ? 'eye-off' : 'eye'} size={20} color={Colors.gray500} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <HBButton label="Log In" onPress={handleLogin} loading={loading} icon="log-in" style={styles.loginBtn} />

        <View style={styles.biometricRow}>
          <TouchableOpacity style={styles.biometricBtn}>
            <Ionicons name="finger-print" size={24} color={Colors.primary} />
            <Text style={styles.biometricLabel}>Biometric Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>
            Don't have an account? <Text style={styles.registerHighlight}>Register now</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingBottom: 40 },
  backBtn: { position: 'absolute', top: 56, left: 20 },
  brand: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginTop: 8, letterSpacing: 2 },
  tagline: { color: Colors.secondary, fontSize: FontSizes.sm, fontWeight: '700', marginTop: 4, letterSpacing: 2 },
  body: { flex: 1, backgroundColor: Colors.white },
  bodyContent: { padding: Spacing.xl, paddingTop: Spacing.lg },
  title: { fontSize: FontSizes.xxl, fontWeight: '900', color: Colors.dark },
  subtitle: { color: Colors.gray500, fontSize: FontSizes.sm, marginTop: 4, marginBottom: Spacing.lg },
  label: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.dark, marginBottom: 6, marginTop: Spacing.sm },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.gray300,
    borderRadius: Radius.md, paddingHorizontal: Spacing.md, ...Shadow.sm,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 13, fontSize: FontSizes.md, color: Colors.dark },
  eyeBtn: { padding: 8 },
  forgotLink: { alignSelf: 'flex-end', marginTop: 8 },
  forgotText: { color: Colors.primary, fontSize: FontSizes.sm, fontWeight: '600' },
  loginBtn: { marginTop: Spacing.lg },
  biometricRow: { alignItems: 'center', marginTop: Spacing.lg },
  biometricBtn: { alignItems: 'center', gap: 4 },
  biometricLabel: { color: Colors.primary, fontSize: FontSizes.xs, fontWeight: '600' },
  registerLink: { marginTop: Spacing.lg, alignItems: 'center' },
  registerText: { color: Colors.gray500, fontSize: FontSizes.sm },
  registerHighlight: { color: Colors.primary, fontWeight: '700' },
});
