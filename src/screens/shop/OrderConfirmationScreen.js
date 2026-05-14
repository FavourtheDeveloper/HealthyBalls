import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSizes, Spacing, Radius } from '../../theme';
import HBButton from '../../components/HBButton';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { orderId } = route.params;

  return (
    <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
        </View>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.orderId}>Order #{orderId}</Text>
        <Text style={styles.message}>
          Thank you for your order. You'll receive a confirmation SMS and email shortly. Your HealthyBalls gear is on its way!
        </Text>

        <View style={styles.timeline}>
          {['Order Confirmed', 'Processing', 'Dispatched', 'Delivered'].map((step, i) => (
            <View key={step} style={styles.timelineItem}>
              <View style={[styles.dot, i === 0 && styles.dotActive]} />
              {i < 3 && <View style={styles.line} />}
              <Text style={[styles.stepLabel, i === 0 && styles.stepActive]}>{step}</Text>
            </View>
          ))}
        </View>

        <HBButton
          label="Continue Shopping"
          onPress={() => navigation.popToTop()}
          icon="bag"
          variant="outline"
          style={styles.btn}
        />
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Text style={styles.homeLink}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: Spacing.xl },
  card: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.success + '15', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.md },
  title: { fontSize: FontSizes.xxxl, fontWeight: '900', color: Colors.dark, marginBottom: 4 },
  orderId: { fontSize: FontSizes.md, color: Colors.primary, fontWeight: '700', marginBottom: Spacing.md },
  message: { fontSize: FontSizes.md, color: Colors.gray700, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  timeline: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.xl, width: '100%', justifyContent: 'center' },
  timelineItem: { alignItems: 'center', flex: 1 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.gray300, marginBottom: 6 },
  dotActive: { backgroundColor: Colors.success },
  line: { position: 'absolute', top: 5, left: '50%', right: '-50%', height: 2, backgroundColor: Colors.gray200 },
  stepLabel: { fontSize: 10, color: Colors.gray500, textAlign: 'center' },
  stepActive: { color: Colors.success, fontWeight: '700' },
  btn: { width: '100%', marginBottom: Spacing.sm },
  homeLink: { color: Colors.primary, fontSize: FontSizes.sm, fontWeight: '700', marginTop: 4 },
});
