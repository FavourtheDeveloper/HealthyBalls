import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image,
  Animated, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '../theme';
import { currentUser } from '../data/dummyData';

const { width } = Dimensions.get('window');
const DRAWER_W = width * 0.78;

const menuItems = [
  { label: 'Home', icon: 'home', screen: 'MainTabs' },
  { label: 'About HealthyBalls', icon: 'information-circle', screen: 'About' },
  { label: 'Gallery', icon: 'images', screen: 'Gallery' },
  { label: 'Partners & Stakeholders', icon: 'business', screen: 'Partners' },
  { label: 'Outreaches', icon: 'location', screen: 'Outreaches' },
  { label: 'Contact Us', icon: 'mail', screen: 'Contact' },
  { label: 'Returns & Exchange', icon: 'refresh', screen: 'Returns' },
  { label: 'Messages', icon: 'chatbubbles', screen: 'Messaging' },
];

export default function Sidebar({ visible, onClose, onNavigate }) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(-DRAWER_W)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, { toValue: 0, duration: 260, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, { toValue: -DRAWER_W, duration: 220, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible && opacity._value === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity }]} />
      </TouchableWithoutFeedback>

      {/* Drawer panel */}
      <Animated.View style={[styles.drawer, { transform: [{ translateX }], paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.drawerHeader}>
          <Image source={{ uri: currentUser.photo }} style={styles.avatar} />
          <Text style={styles.name}>{currentUser.name} {currentUser.surname}</Text>
          <Text style={styles.level}>🏆 {currentUser.ambassadorLevel} Ambassador</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.screen}
              style={styles.menuItem}
              onPress={() => { onClose(); onNavigate(item.screen); }}
            >
              <Ionicons name={item.icon} size={22} color={Colors.primary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
          <Text style={styles.version}>HealthyBalls v1.0.0 MVP</Text>
          <Text style={styles.tagline}>Check. Know. Act.</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_W,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },
  drawerHeader: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    padding: 4,
  },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 3, borderColor: Colors.white, marginBottom: 10,
  },
  name: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '700' },
  level: { color: Colors.secondary, fontSize: FontSizes.sm, marginTop: 4 },
  menu: { flex: 1 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  menuLabel: { flex: 1, fontSize: FontSizes.md, color: Colors.dark, marginLeft: 14 },
  footer: {
    padding: Spacing.lg, alignItems: 'center',
    borderTopWidth: 1, borderTopColor: Colors.gray100,
  },
  version: { color: Colors.gray500, fontSize: FontSizes.xs },
  tagline: { color: Colors.primary, fontSize: FontSizes.sm, fontWeight: '700', marginTop: 4 },
});
