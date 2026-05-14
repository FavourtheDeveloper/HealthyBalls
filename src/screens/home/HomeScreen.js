import React, { useState, useContext } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, StyleSheet,
  FlatList, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import {
  currentUser, healthMetrics, learningTopics, healthTips,
  appointments, healthProviders,
} from '../../data/dummyData';
import Card from '../../components/Card';
import SectionTitle from '../../components/SectionTitle';
import BadgeChip from '../../components/BadgeChip';
import { SidebarContext } from '../../navigation/AppNavigator';

const { width } = Dimensions.get('window');
const CARD_W = width * 0.72;

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tipIndex, setTipIndex] = useState(0);
  const { open: openSidebar } = useContext(SidebarContext);

  const quickActions = [
    { label: 'Book Test', icon: 'calendar', color: Colors.primary, action: () => navigation.navigate('Appointments') },
    { label: 'Find Doctor', icon: 'medkit', color: '#1565C0', action: () => navigation.navigate('FindProviders') },
    { label: 'My Records', icon: 'document-text', color: '#6A1B9A', action: () => navigation.navigate('HealthRecords') },
    { label: 'Learn', icon: 'book', color: '#E65100', action: () => {} },
  ];

  const nextAppointment = appointments.find((a) => a.status !== 'Completed');

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={[styles.headerGrad, { paddingTop: insets.top + 12 }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={openSidebar}>
              <Ionicons name="menu" size={28} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.logoRow}>
              <Ionicons name="fitness" size={22} color={Colors.secondary} />
              <Text style={styles.brand}>HealthyBalls</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <View style={styles.notifBtn}>
                <Ionicons name="notifications" size={24} color={Colors.white} />
                <View style={styles.notifDot} />
              </View>
            </TouchableOpacity>
          </View>

          {/* User greeting */}
          <View style={styles.greetRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.userName}>{currentUser.name} 👋</Text>
              <View style={styles.levelBadge}>
                <Ionicons name="medal" size={14} color={Colors.secondary} />
                <Text style={styles.levelText}>{currentUser.ambassadorLevel} Ambassador</Text>
              </View>
            </View>
            <Image source={{ uri: currentUser.photo }} style={styles.avatar} />
          </View>

          {/* Health Score */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreLabel}>Health Score</Text>
              <Text style={styles.scoreValue}>{currentUser.healthScore}</Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <View style={styles.scoreBar}>
              <View style={[styles.scoreBarFill, { width: `${currentUser.healthScore}%` }]} />
            </View>
            <View style={styles.scoreRight}>
              <Text style={styles.scoreStatus}>Good</Text>
              <Text style={styles.scoreTip}>Complete screening to improve</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {quickActions.map((a, i) => (
            <TouchableOpacity key={i} style={styles.qaBtn} onPress={a.action}>
              <View style={[styles.qaIcon, { backgroundColor: a.color + '15' }]}>
                <Ionicons name={a.icon} size={22} color={a.color} />
              </View>
              <Text style={styles.qaLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Health Tip */}
        <View style={styles.tipCard}>
          <LinearGradient
            colors={[healthTips[tipIndex].color, healthTips[tipIndex].color + 'CC']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.tipInner}
          >
            <Ionicons name="bulb" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.tipText}>{healthTips[tipIndex].tip}</Text>
            <TouchableOpacity onPress={() => setTipIndex((tipIndex + 1) % healthTips.length)}>
              <Ionicons name="arrow-forward-circle" size={24} color={Colors.white} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Health Metrics */}
        <SectionTitle title="Your Health" actionLabel="View All" onAction={() => navigation.navigate('HealthRecords')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metricsRow}>
          {healthMetrics.map((m) => {
            const statusColor = { success: Colors.success, warning: Colors.warning, info: Colors.info }[m.status];
            return (
              <Card key={m.id} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: statusColor + '20' }]}>
                  <Ionicons name={m.icon} size={22} color={statusColor} />
                </View>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </Card>
            );
          })}
        </ScrollView>

        {/* Next Appointment */}
        {nextAppointment && (
          <>
            <SectionTitle title="Next Appointment" actionLabel="All" onAction={() => navigation.navigate('Appointments')} />
            <View style={{ paddingHorizontal: Spacing.md }}>
              <TouchableOpacity style={styles.apptCard} activeOpacity={0.9}>
                <LinearGradient colors={['#1565C0', '#1976D2']} style={styles.apptGrad}>
                  <View style={styles.apptHeader}>
                    <Ionicons name="calendar" size={22} color={Colors.white} />
                    <Text style={styles.apptType}>{nextAppointment.type}</Text>
                    <BadgeChip label={nextAppointment.status} color={Colors.success} />
                  </View>
                  <Text style={styles.apptDoctor}>{nextAppointment.doctor}</Text>
                  <Text style={styles.apptFacility}>{nextAppointment.facility}</Text>
                  <View style={styles.apptFooter}>
                    <View style={styles.apptDetail}>
                      <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.apptDetailText}>{nextAppointment.date}</Text>
                    </View>
                    <View style={styles.apptDetail}>
                      <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.apptDetailText}>{nextAppointment.time}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Learning Center */}
        <SectionTitle
          title="Learning Center"
          actionLabel="See All"
          onAction={() => {}}
        />
        <FlatList
          horizontal
          data={learningTopics.slice(0, 4)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.learnRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.learnCard, { width: CARD_W }]}
              activeOpacity={0.9}
              onPress={() => {}}
            >
              <Image source={{ uri: item.image }} style={styles.learnImg} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.75)']}
                style={styles.learnOverlay}
              >
                <View style={[styles.learnIconBg, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={16} color={Colors.white} />
                </View>
                <Text style={styles.learnTitle}>{item.title}</Text>
                <Text style={styles.learnSub}>{item.articleCount} articles</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

        {/* Nearby Providers */}
        <SectionTitle title="Find Health Providers" actionLabel="View All" onAction={() => navigation.navigate('FindProviders')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.provRow}>
          {healthProviders.slice(0, 3).map((p) => (
            <Card key={p.id} style={styles.provCard}>
              {p.image ? (
                <Image source={{ uri: p.image }} style={styles.provAvatar} />
              ) : (
                <View style={[styles.provAvatar, { backgroundColor: Colors.primary + '20', justifyContent: 'center', alignItems: 'center' }]}>
                  <Ionicons name="business" size={22} color={Colors.primary} />
                </View>
              )}
              <Text style={styles.provName} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.provSpec} numberOfLines={1}>{p.specialty}</Text>
              <View style={styles.provFooter}>
                <Text style={styles.provDist}>{p.distance}</Text>
                <View style={[styles.avail, { backgroundColor: p.available ? Colors.success : Colors.danger }]} />
              </View>
            </Card>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerGrad: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brand: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '900', letterSpacing: 1 },
  notifBtn: { position: 'relative' },
  notifDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.danger, borderWidth: 1.5, borderColor: Colors.primary },
  greetRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  greeting: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm },
  userName: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900' },
  levelBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start' },
  levelText: { color: Colors.secondary, fontSize: FontSizes.xs, fontWeight: '700' },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 3, borderColor: Colors.secondary },
  scoreCard: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.sm },
  scoreLeft: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  scoreLabel: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.sm, marginRight: 8 },
  scoreValue: { color: Colors.white, fontSize: FontSizes.xxxl, fontWeight: '900' },
  scoreMax: { color: 'rgba(255,255,255,0.5)', fontSize: FontSizes.md, marginLeft: 2 },
  scoreBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, marginBottom: 6 },
  scoreBarFill: { height: 8, backgroundColor: Colors.secondary, borderRadius: Radius.full },
  scoreRight: {},
  scoreStatus: { color: Colors.secondary, fontSize: FontSizes.sm, fontWeight: '700' },
  scoreTip: { color: 'rgba(255,255,255,0.6)', fontSize: FontSizes.xs, marginTop: 2 },
  quickActions: { flexDirection: 'row', paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg, gap: Spacing.sm, backgroundColor: Colors.white },
  qaBtn: { flex: 1, alignItems: 'center', gap: 6 },
  qaIcon: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  qaLabel: { fontSize: FontSizes.xs, color: Colors.dark, fontWeight: '600', textAlign: 'center' },
  tipCard: { marginHorizontal: Spacing.md, marginVertical: Spacing.sm, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.sm },
  tipInner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: Spacing.md },
  tipText: { flex: 1, color: Colors.white, fontSize: FontSizes.sm, lineHeight: 18 },
  metricsRow: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.sm },
  metricCard: { width: 130, alignItems: 'center', gap: 4 },
  metricIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  metricValue: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark },
  metricLabel: { fontSize: FontSizes.xs, color: Colors.gray500, textAlign: 'center' },
  apptCard: { borderRadius: Radius.md, overflow: 'hidden', marginBottom: Spacing.md, ...Shadow.md },
  apptGrad: { padding: Spacing.md },
  apptHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  apptType: { flex: 1, color: Colors.white, fontSize: FontSizes.md, fontWeight: '700' },
  apptDoctor: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '800', marginBottom: 2 },
  apptFacility: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginBottom: 10 },
  apptFooter: { flexDirection: 'row', gap: Spacing.md },
  apptDetail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  apptDetailText: { color: 'rgba(255,255,255,0.85)', fontSize: FontSizes.sm },
  learnRow: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.sm },
  learnCard: { height: 160, borderRadius: Radius.md, overflow: 'hidden', ...Shadow.md },
  learnImg: { width: '100%', height: '100%', position: 'absolute' },
  learnOverlay: { flex: 1, justifyContent: 'flex-end', padding: Spacing.md },
  learnIconBg: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  learnTitle: { color: Colors.white, fontSize: FontSizes.md, fontWeight: '800' },
  learnSub: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.xs },
  provRow: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.md },
  provCard: { width: 140, alignItems: 'center', gap: 4 },
  provAvatar: { width: 54, height: 54, borderRadius: 27, marginBottom: 4 },
  provName: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark, textAlign: 'center' },
  provSpec: { fontSize: FontSizes.xs, color: Colors.gray500, textAlign: 'center' },
  provFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  provDist: { fontSize: FontSizes.xs, color: Colors.primary, fontWeight: '600' },
  avail: { width: 8, height: 8, borderRadius: 4 },
});
