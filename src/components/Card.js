import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Radius, Shadow, Spacing } from '../theme';

export default function Card({ children, style, padding = true }) {
  return (
    <View style={[styles.card, padding && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  padded: {
    padding: Spacing.md,
  },
});
