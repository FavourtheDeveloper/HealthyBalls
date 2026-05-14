import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Radius, Spacing } from '../theme';

export default function HBButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const bg = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: 'transparent',
    ghost: 'transparent',
    danger: Colors.danger,
    white: Colors.white,
  }[variant];

  const textColor = {
    primary: Colors.white,
    secondary: Colors.white,
    outline: Colors.primary,
    ghost: Colors.primary,
    danger: Colors.white,
    white: Colors.primary,
  }[variant];

  const borderColor = {
    primary: Colors.primary,
    secondary: Colors.secondary,
    outline: Colors.primary,
    ghost: 'transparent',
    danger: Colors.danger,
    white: Colors.white,
  }[variant];

  const padV = { sm: 8, md: 13, lg: 17 }[size];
  const fontSize = { sm: FontSizes.sm, md: FontSizes.md, lg: FontSizes.lg }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? Colors.gray300 : bg,
          borderColor: disabled ? Colors.gray300 : borderColor,
          paddingVertical: padV,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <View style={styles.inner}>
          {icon && <Ionicons name={icon} size={fontSize + 2} color={disabled ? Colors.gray500 : textColor} style={styles.icon} />}
          <Text style={[styles.label, { color: disabled ? Colors.gray500 : textColor, fontSize }, textStyle]}>
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: Radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { marginRight: 8 },
  label: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
