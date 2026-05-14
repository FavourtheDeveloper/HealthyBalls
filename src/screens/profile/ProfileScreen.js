import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { currentUser, courses, appointments } from '../../data/dummyData';
import Card from '../../components/Card';

const menuGroups = [
  {
    title: 'Health',
    items: [
      { icon: 'document-text', label: 'Health Records', screen: 'HealthRecords', color: '#1565C0' },
      { icon: 'calendar', label: 'Appointments', screen: 'Appointments', color: Colors.primary },
      { icon: 'medkit', label: 'Find Providers', screen: 'FindProviders', color: '#6A1B9A' },
      { icon: 'clipboard', label: 'Health Assessment', screen: 'HealthAssessment', color: Colors.warning },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: 'person', label: 'Personal Information', screen: null, color: Colors.primary },
      { icon: 'shield-checkmark', label: 'Medical Aid', screen: null, color: Colors.success },
      { icon: 'notifications', label: 'Notifications', screen: null, color: Colors.secondary },
      { icon: 'settings', label: 'Settings', screen: null, color: Colors.gray700 },
    ],
  },
  {
    title: 'More',
    items: [
      { icon: 'share-social', label: 'Share App', screen: null, color: Colors.primary },
      { icon: 'help-circle', label: 'Help & Support', screen: null, color: '#1565C0' },
      { icon: 'log-out', label: 'Log Out', screen: 'LOGOUT', color: Colors.danger },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const completedCourses = courses.filter((c) => c.completed).length;
  const upcomingAppts = appointments.filter((a) => a.status !== 'Completed').length;

  const handleMenuPress = (item) => {
    if (item.screen === 'LOGOUT') {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => navigation.navigate('Auth') },
      ]);
      return;
    }
    if (item.screen) navigation.navigate(item.screen);
    else Alert.alert(item.label, 'This feature is available in the full version.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
          <Text style={styles.heroTitle}>My Profile</Text>
          <View style={styles.profileCard}>
            <Image source={{ uri: currentUser.photo }} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{currentUser.name} {currentUser.surname}</Text>
              <Text style={styles.mobile}>{currentUser.mobile}</Text>
              <Text style={styles.email}>{currentUser.email}</Text>
              <View style={styles.levelRow}>
                <Ionicons name="medal" size={14} color={Colors.secondary} />
                <Text style={styles.level}>{currentUser.ambassadorLevel} Ambassador</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Health Score', value: `${currentUser.healthScore}`, sub: '/100', icon: 'fitness', color: Colors.success },
            { label: 'Courses Done', value: `${completedCourses}`, sub: `/${courses.length}`, icon: 'school', color: '#1565C0' },
            { label: 'Appointments', value: `${upcomingAppts}`, sub: 'upcoming', icon: 'calendar', color: Colors.warning },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Ionicons name={stat.icon} size={20} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}<Text style={styles.statSub}>{stat.sub}</Text></Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Medical Aid Card */}
        {currentUser.medicalAid && (
          <View style={styles.section}>
            <Card style={styles.medCard}>
              <View style={styles.medHeader}>
                <Ionicons name="shield-checkmark" size={22} color={Colors.success} />
                <Text style={styles.medTitle}>{currentUser.medicalAidName}</Text>
                <View style={styles.medBadge}>
                  <Text style={styles.medBadgeText}>Active</Text>
                </View>
              </View>
              <Text style={styles.medMember}>Member No: {currentUser.memberNumber}</Text>
            </Card>
          </View>
        )}

        {/* Menu Groups */}
        {menuGroups.map((group) => (
          <View key={group.title} style={styles.section}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <Card padding={false}>
              {group.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.menuItem, index < group.items.length - 1 && styles.menuBorder]}
                  onPress={() => handleMenuPress(item)}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text style={[styles.menuLabel, item.screen === 'LOGOUT' && { color: Colors.danger }]}>
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginBottom: Spacing.md },
  profileCard: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: Radius.md, padding: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: Colors.secondary },
  profileInfo: { flex: 1 },
  name: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '800' },
  mobile: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginTop: 2 },
  email: { color: 'rgba(255,255,255,0.6)', fontSize: FontSizes.xs },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  level: { color: Colors.secondary, fontSize: FontSizes.xs, fontWeight: '700' },
  editBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', marginHorizontal: Spacing.md, marginTop: -Spacing.xl, gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: { flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm, alignItems: 'center', gap: 2, ...Shadow.md },
  statValue: { fontSize: FontSizes.xl, fontWeight: '900', color: Colors.dark },
  statSub: { fontSize: FontSizes.xs, fontWeight: '400', color: Colors.gray500 },
  statLabel: { fontSize: FontSizes.xs, color: Colors.gray500, textAlign: 'center' },
  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  medCard: {},
  medHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  medTitle: { flex: 1, fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark },
  medBadge: { backgroundColor: Colors.success + '20', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  medBadgeText: { color: Colors.success, fontSize: FontSizes.xs, fontWeight: '700' },
  medMember: { fontSize: FontSizes.sm, color: Colors.gray500 },
  groupTitle: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.gray500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.sm },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: Spacing.md, gap: Spacing.sm },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: FontSizes.md, color: Colors.dark, fontWeight: '500' },
});
