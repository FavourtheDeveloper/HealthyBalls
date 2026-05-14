import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#0D4A28', '#1A6B3C', '#2E9B5A']} style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600' }}
          style={styles.heroBg}
        />
        <View style={styles.heroContent}>
          <View style={styles.logoBox}>
            <Ionicons name="fitness" size={40} color={Colors.white} />
          </View>
          <Text style={styles.brand}>HealthyBalls</Text>
          <Text style={styles.tagline}>Check. Know. Act.</Text>
          <Text style={styles.heroSub}>
            Empowering men to take charge of their health — one check-up at a time.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome back, Champion.</Text>
        <Text style={styles.cardSub}>Sign in to your account or create a new one.</Text>

        <HBButton
          label="Login to My Account"
          onPress={() => navigation.navigate('Login')}
          icon="log-in"
          style={styles.btn}
        />
        <HBButton
          label="Create New Account"
          onPress={() => navigation.navigate('Register')}
          variant="outline"
          icon="person-add"
          style={[styles.btn, { marginTop: Spacing.sm }]}
        />

        <View style={styles.divider}>
          <View style={styles.divLine} />
          <Text style={styles.divText}>or continue as</Text>
          <View style={styles.divLine} />
        </View>

        <View style={styles.providerRow}>
          <TouchableOpacity style={styles.providerBtn} onPress={() => navigation.navigate('Register', { type: 'medical' })}>
            <Ionicons name="medkit" size={20} color={Colors.primary} />
            <Text style={styles.providerLabel}>Medical Professional</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.providerBtn} onPress={() => navigation.navigate('Register', { type: 'business' })}>
            <Ionicons name="business" size={20} color={Colors.primary} />
            <Text style={styles.providerLabel}>Business</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By continuing you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  hero: { height: '45%', justifyContent: 'flex-end', padding: Spacing.xl },
  heroBg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.2,
  },
  heroContent: { alignItems: 'center' },
  logoBox: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)',
  },
  brand: { color: Colors.white, fontSize: FontSizes.xxxl, fontWeight: '900', letterSpacing: 2 },
  tagline: { color: Colors.secondary, fontSize: FontSizes.md, fontWeight: '700', letterSpacing: 3, marginTop: 4 },
  heroSub: { color: 'rgba(255,255,255,0.8)', fontSize: FontSizes.sm, textAlign: 'center', marginTop: Spacing.sm, lineHeight: 20 },
  card: {
    flex: 1, backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl,
    marginTop: -Radius.xl, padding: Spacing.xl,
    ...Shadow.lg,
  },
  cardTitle: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.dark, textAlign: 'center' },
  cardSub: { color: Colors.gray500, textAlign: 'center', marginTop: 4, marginBottom: Spacing.lg, fontSize: FontSizes.sm },
  btn: { marginTop: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.md },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.gray300 },
  divText: { color: Colors.gray500, fontSize: FontSizes.xs, marginHorizontal: Spacing.sm },
  providerRow: { flexDirection: 'row', gap: Spacing.sm },
  providerBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: Radius.md, paddingVertical: 10,
  },
  providerLabel: { color: Colors.primary, fontSize: FontSizes.xs, fontWeight: '700' },
  terms: { color: Colors.gray500, fontSize: FontSizes.xs, textAlign: 'center', marginTop: Spacing.md, lineHeight: 18 },
  link: { color: Colors.primary, fontWeight: '700' },
});
