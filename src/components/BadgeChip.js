import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSizes, Radius, Spacing } from '../theme';

export default function BadgeChip({ label, color = Colors.primary, textColor = Colors.white, small = false }) {
  return (
    <View style={[styles.chip, { backgroundColor: color }, small && styles.small]}>
      <Text style={[styles.label, { color: textColor }, small && styles.smallText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  label: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  smallText: {
    fontSize: 10,
  },
});
