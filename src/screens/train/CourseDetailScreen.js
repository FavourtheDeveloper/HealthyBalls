import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import HBButton from '../../components/HBButton';

const mockModules = (count, color) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: [
      'Introduction & Overview', 'Understanding the Basics', 'Key Concepts Deep Dive',
      'Practical Application', 'Case Studies', 'Community Impact',
      'Best Practices', 'Assessment Preparation', 'Final Quiz', 'Certificate',
    ][i % 10],
    duration: `${5 + i * 3} min`,
    completed: i < 3,
  }));

export default function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params;
  const insets = useSafeAreaInsets();
  const [enrolled, setEnrolled] = useState(course.completed);
  const modules = mockModules(course.modules, course.color);

  const enroll = () => {
    if (enrolled) return;
    Alert.alert('Enrolled!', `You are now enrolled in "${course.title}". Let's get started!`);
    setEnrolled(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[course.color, course.color + 'CC']} style={styles.hero}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.heroIcon}>
            <Ionicons name={course.icon} size={40} color={Colors.white} />
          </View>
          <Text style={styles.heroLevel}>{course.level}</Text>
          <Text style={styles.heroTitle}>{course.title}</Text>
          <Text style={styles.heroDesc}>{course.description}</Text>

          <View style={styles.statsRow}>
            {[
              { icon: 'time', label: course.duration },
              { icon: 'layers', label: `${course.modules} Modules` },
              { icon: 'people', label: `${course.enrolled.toLocaleString()} Enrolled` },
              { icon: 'star', label: `${course.rating} Rating` },
            ].map((s, i) => (
              <View key={i} style={styles.stat}>
                <Ionicons name={s.icon} size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {!enrolled ? (
            <HBButton
              label="Enrol in Course"
              onPress={enroll}
              icon="school"
              style={{ marginBottom: Spacing.lg }}
            />
          ) : (
            <View style={styles.enrolledBanner}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.enrolledText}>
                {course.completed ? 'Course Completed!' : 'Enrolled — Continue Learning'}
              </Text>
              {course.completed && (
                <TouchableOpacity>
                  <Text style={styles.certLink}>View Certificate</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <Text style={styles.sectionTitle}>Course Modules</Text>
          {modules.map((mod, i) => (
            <TouchableOpacity
              key={mod.id}
              style={styles.moduleCard}
              onPress={() => {
                if (!enrolled) {
                  Alert.alert('Enrol first', 'Please enrol in the course to access modules.');
                }
              }}
            >
              <View style={[styles.modNum, { backgroundColor: mod.completed ? Colors.success : course.color + '20' }]}>
                {mod.completed ? (
                  <Ionicons name="checkmark" size={16} color={Colors.white} />
                ) : (
                  <Text style={[styles.modNumText, { color: course.color }]}>{i + 1}</Text>
                )}
              </View>
              <View style={styles.modContent}>
                <Text style={styles.modTitle}>{mod.title}</Text>
                <Text style={styles.modDuration}>{mod.duration}</Text>
              </View>
              <Ionicons
                name={mod.completed ? 'checkmark-circle' : enrolled ? 'play-circle' : 'lock-closed'}
                size={22}
                color={mod.completed ? Colors.success : enrolled ? course.color : Colors.gray300}
              />
            </TouchableOpacity>
          ))}

          {enrolled && (
            <HBButton
              label={course.completed ? 'Review & Retake Quiz' : 'Take Module Quiz'}
              icon={course.completed ? 'refresh' : 'help-circle'}
              variant={course.completed ? 'outline' : 'primary'}
              style={{ marginTop: Spacing.md }}
              onPress={() => Alert.alert('Quiz', 'Opening quiz... (Demo mode)')}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing.md, paddingBottom: Spacing.xl },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.md },
  heroIcon: { width: 72, height: 72, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm },
  heroLevel: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.xs, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginBottom: 8 },
  heroDesc: { color: 'rgba(255,255,255,0.8)', fontSize: FontSizes.sm, lineHeight: 20, marginBottom: Spacing.md },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statLabel: { color: 'rgba(255,255,255,0.85)', fontSize: FontSizes.xs },
  body: { padding: Spacing.md },
  enrolledBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.success + '15', borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg },
  enrolledText: { flex: 1, color: Colors.success, fontWeight: '700', fontSize: FontSizes.sm },
  certLink: { color: Colors.primary, fontWeight: '700', fontSize: FontSizes.sm },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm },
  moduleCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: 8, ...Shadow.sm },
  modNum: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  modNumText: { fontSize: FontSizes.sm, fontWeight: '900' },
  modContent: { flex: 1 },
  modTitle: { fontSize: FontSizes.md, fontWeight: '600', color: Colors.dark },
  modDuration: { fontSize: FontSizes.xs, color: Colors.gray500, marginTop: 2 },
});
