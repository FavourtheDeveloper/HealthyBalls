import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';

const tabs = ['About', 'Vision', 'Mission', 'Values', 'History'];

const content = {
  About: {
    icon: 'information-circle',
    color: Colors.primary,
    body: `HealthyBalls is a pioneering men's health initiative born out of South Africa's urgent need to address the alarming rates of undetected cancers, untreated mental illness, and gender-based violence perpetrated by men.\n\nWe believe that healthier men build healthier families, communities, and societies. Our platform is designed to remove the barriers that prevent men from seeking help — stigma, lack of awareness, inaccessibility of services, and toxic masculine norms that glorify neglecting one's health.\n\nHealthyBalls is not just an app. It is a movement.`,
  },
  Vision: {
    icon: 'eye',
    color: '#1565C0',
    body: `A South Africa — and ultimately a world — where every man takes full ownership of his physical, mental, and emotional health.\n\nWe envision communities of empowered, health-literate men who serve as guardians of wellness for themselves, their families, and their communities.\n\nWe see a future where:\n- Testicular and prostate cancer are detected early by default\n- Men seek mental health support without shame\n- Gender-based violence is a relic of the past\n- Health-seeking behaviour is a cornerstone of masculine identity`,
  },
  Mission: {
    icon: 'rocket',
    color: '#6A1B9A',
    body: `To empower men in South Africa and beyond to proactively engage in health-seeking behaviour through education, community, technology, and access to affordable health services.\n\nWe achieve this by:\n- Providing free, accessible health education on cancer, sexual health, mental wellness, and GBV\n- Training community ambassadors to spread the HealthyBalls message\n- Connecting men with verified healthcare providers and screening services\n- Using technology to deliver health reminders, AI analysis, and telehealth consultations\n- Building a culture where checking in on your health is as normal as going to the gym`,
  },
  Values: {
    icon: 'heart',
    color: Colors.danger,
    body: `Our values are the foundation on which HealthyBalls stands:\n\n🟢 COURAGE — We face uncomfortable health conversations head-on.\n\n🟢 COMPASSION — We meet every man where he is, without judgement.\n\n🟢 COMMUNITY — We build each other up. No man is an island.\n\n🟢 CLARITY — We provide simple, accurate, evidence-based health information.\n\n🟢 COMMITMENT — We are in this for the long game. Health is a lifestyle, not an event.\n\n🟢 CHANGE — We actively challenge the norms that keep men sick and silent.`,
  },
  History: {
    icon: 'time',
    color: Colors.warning,
    body: `HealthyBalls was founded in 2023 by a group of South African health advocates, community leaders, and technology entrepreneurs who were alarmed by the statistics:\n\n- SA men are 30% less likely than women to seek medical help\n- Prostate cancer is the most common cancer in SA men\n- SA has one of the world's highest femicide rates — driven by men in crisis\n\nThe name "HealthyBalls" was chosen deliberately — bold, unapologetic, and impossible to ignore. It speaks directly to men in a language that cuts through social noise.\n\nFrom a small pilot in Soweto in 2023, HealthyBalls has grown into a national platform with ambitions to expand across sub-Saharan Africa and beyond.`,
  },
};

export default function AboutScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('About');
  const active = content[activeTab];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="About HealthyBalls" onBack={() => navigation.goBack()} />

      <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
        <Ionicons name="fitness" size={48} color={Colors.secondary} />
        <Text style={styles.brand}>HealthyBalls</Text>
        <Text style={styles.tagline}>Check. Know. Act.</Text>
        <Text style={styles.heroSub}>Empowering men to live longer, healthier lives.</Text>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentCard}>
          <View style={[styles.contentIcon, { backgroundColor: active.color + '15' }]}>
            <Ionicons name={active.icon} size={28} color={active.color} />
          </View>
          <Text style={[styles.contentTitle, { color: active.color }]}>{activeTab}</Text>
          {active.body.split('\n').map((line, i) => {
            if (line.trim() === '') return <View key={i} style={{ height: 8 }} />;
            if (line.startsWith('🟢')) {
              return (
                <View key={i} style={styles.valueRow}>
                  <Text style={styles.valueText}>{line}</Text>
                </View>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <View key={i} style={styles.bulletRow}>
                  <View style={[styles.bullet, { backgroundColor: active.color }]} />
                  <Text style={styles.bulletText}>{line.slice(2)}</Text>
                </View>
              );
            }
            return <Text key={i} style={styles.bodyText}>{line}</Text>;
          })}
        </View>

        {/* Team */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Leadership Team</Text>
          {[
            { name: 'Dr. Thabo Molefe', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/10.jpg' },
            { name: 'Zanele Dlamini', role: 'Head of Community & Outreach', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
            { name: 'Sipho Khumalo', role: 'Chief Medical Advisor', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
          ].map((member) => (
            <View key={member.name} style={styles.teamCard}>
              <Image source={{ uri: member.image }} style={styles.teamAvatar} />
              <View>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { alignItems: 'center', padding: Spacing.xl, paddingBottom: Spacing.lg },
  brand: { color: Colors.white, fontSize: FontSizes.xxxl, fontWeight: '900', marginTop: 8, letterSpacing: 2 },
  tagline: { color: Colors.secondary, fontSize: FontSizes.md, fontWeight: '700', letterSpacing: 3, marginTop: 4 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginTop: 6, textAlign: 'center' },
  tabRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  tab: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 8 },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  tabLabelActive: { color: Colors.white },
  content: { padding: Spacing.md },
  contentCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.md, ...Shadow.md },
  contentIcon: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm },
  contentTitle: { fontSize: FontSizes.xxl, fontWeight: '900', marginBottom: Spacing.md },
  bodyText: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 24 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingLeft: 4, marginVertical: 2 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 9 },
  bulletText: { flex: 1, fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 24 },
  valueRow: { marginVertical: 4 },
  valueText: { fontSize: FontSizes.md, color: Colors.dark, lineHeight: 24, fontWeight: '500' },
  teamSection: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.md, ...Shadow.sm },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.md },
  teamCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  teamAvatar: { width: 48, height: 48, borderRadius: 24 },
  teamName: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark },
  teamRole: { fontSize: FontSizes.sm, color: Colors.primary },
});
