import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '../theme';

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  onMenu,
  onNotification,
  rightIcon,
  onRightPress,
  transparent = false,
  light = false,
}) {
  const insets = useSafeAreaInsets();
  const iconColor = light ? Colors.white : Colors.dark;
  const titleColor = light ? Colors.white : Colors.dark;
  const bg = transparent ? 'transparent' : Colors.white;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: bg }]}>
      <StatusBar barStyle={light ? 'light-content' : 'dark-content'} />
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={iconColor} />
          </TouchableOpacity>
        ) : onMenu ? (
          <TouchableOpacity style={styles.iconBtn} onPress={onMenu}>
            <Ionicons name="menu" size={28} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} />
        )}

        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: light ? 'rgba(255,255,255,0.8)' : Colors.gray500 }]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.rightActions}>
          {onNotification && (
            <TouchableOpacity style={styles.iconBtn} onPress={onNotification}>
              <Ionicons name="notifications" size={24} color={iconColor} />
              <View style={styles.badge} />
            </TouchableOpacity>
          )}
          {rightIcon && (
            <TouchableOpacity style={styles.iconBtn} onPress={onRightPress}>
              <Ionicons name={rightIcon} size={24} color={iconColor} />
            </TouchableOpacity>
          )}
          {!onNotification && !rightIcon && <View style={styles.iconBtn} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: FontSizes.xs,
    marginTop: 2,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },
});
