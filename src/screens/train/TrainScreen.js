import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { courses, ambassadorLevels, currentUser } from '../../data/dummyData';
import SectionTitle from '../../components/SectionTitle';
import Card from '../../components/Card';
import BadgeChip from '../../components/BadgeChip';

export default function TrainScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const completedCount = courses.filter((c) => c.completed).length;
  const currentLevel = ambassadorLevels.find((l) => l.name === currentUser.ambassadorLevel);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={['#1565C0', '#1976D2']} style={styles.hero}>
          <Text style={styles.heroTitle}>Ambassador Training</Text>
          <Text style={styles.heroSub}>Become a HealthyBalls champion. Make disciples. Change society.</Text>

          <Card style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressLabel}>Your Progress</Text>
                <Text style={styles.progressLevel}>{currentUser.ambassadorLevel} Ambassador</Text>
              </View>
              <View style={[styles.medalBadge, { backgroundColor: currentLevel?.color }]}>
                <Ionicons name={currentLevel?.icon || 'ribbon'} size={24} color={Colors.white} />
              </View>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${(completedCount / courses.length) * 100}%` }]} />
            </View>
            <View style={styles.progressStats}>
              <Text style={styles.progressStat}>{completedCount}/{courses.length} courses</Text>
              <Text style={styles.progressStat}>{currentUser.coursesCompleted * 5} / {courses.length * 5} points</Text>
            </View>
          </Card>
        </LinearGradient>

        {/* Ambassador Levels */}
        <SectionTitle title="Ambassador Levels" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.levelsRow}>
          {ambassadorLevels.map((level) => {
            const isCurrent = level.name === currentUser.ambassadorLevel;
            return (
              <Card key={level.id} style={[styles.levelCard, isCurrent && { borderColor: level.color, borderWidth: 2 }]}>
                <View style={[styles.levelIcon, { backgroundColor: level.color + '20' }]}>
                  <Ionicons name={level.icon} size={28} color={level.color} />
                </View>
                <Text style={[styles.levelName, { color: level.color }]}>{level.name}</Text>
                {isCurrent && <BadgeChip label="Current" color={level.color} small />}
                <Text style={styles.levelReq}>{level.requirements}</Text>
              </Card>
            );
          })}
        </ScrollView>

        {/* Courses */}
        <SectionTitle title="Courses" />
        <View style={styles.coursesList}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('CourseDetail', { course })}
            >
              <Card style={styles.courseCard} padding={false}>
                <View style={[styles.courseLeft, { backgroundColor: course.color }]}>
                  <Ionicons name={course.icon} size={28} color={Colors.white} />
                  {course.completed && (
                    <View style={styles.completedBadge}>
                      <Ionicons name="checkmark" size={12} color={Colors.white} />
                    </View>
                  )}
                </View>
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDesc} numberOfLines={2}>{course.description}</Text>
                  <View style={styles.courseMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={12} color={Colors.gray500} />
                      <Text style={styles.metaText}>{course.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="layers-outline" size={12} color={Colors.gray500} />
                      <Text style={styles.metaText}>{course.modules} modules</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="people-outline" size={12} color={Colors.gray500} />
                      <Text style={styles.metaText}>{course.enrolled.toLocaleString()}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.courseRight}>
                  <BadgeChip label={course.level} color={course.color} small />
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color={Colors.secondary} />
                    <Text style={styles.rating}>{course.rating}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginTop: 4, marginBottom: Spacing.md, lineHeight: 20 },
  progressCard: { marginTop: -8 },
  progressHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing.md },
  progressLabel: { fontSize: FontSizes.sm, color: Colors.gray500 },
  progressLevel: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark },
  medalBadge: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  progressBarBg: { height: 8, backgroundColor: Colors.gray100, borderRadius: Radius.full, marginBottom: 6 },
  progressBarFill: { height: 8, backgroundColor: Colors.primary, borderRadius: Radius.full },
  progressStats: { flexDirection: 'row', justifyContent: 'space-between' },
  progressStat: { fontSize: FontSizes.xs, color: Colors.gray500, fontWeight: '600' },
  levelsRow: { paddingHorizontal: Spacing.md, gap: Spacing.sm, paddingBottom: Spacing.sm },
  levelCard: { width: 180, gap: 6, alignItems: 'flex-start' },
  levelIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  levelName: { fontSize: FontSizes.lg, fontWeight: '900' },
  levelReq: { fontSize: FontSizes.xs, color: Colors.gray500, lineHeight: 16, marginTop: 4 },
  coursesList: { paddingHorizontal: Spacing.md, gap: Spacing.sm, marginBottom: Spacing.sm },
  courseCard: { flexDirection: 'row', alignItems: 'stretch', overflow: 'hidden', padding: 0 },
  courseLeft: { width: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  completedBadge: { position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.success, justifyContent: 'center', alignItems: 'center' },
  courseContent: { flex: 1, padding: Spacing.md },
  courseTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark, marginBottom: 4 },
  courseDesc: { fontSize: FontSizes.sm, color: Colors.gray500, lineHeight: 18, marginBottom: 8 },
  courseMeta: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: FontSizes.xs, color: Colors.gray500 },
  courseRight: { paddingVertical: Spacing.sm, paddingRight: Spacing.sm, alignItems: 'flex-end', justifyContent: 'space-between' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  rating: { fontSize: FontSizes.xs, fontWeight: '700', color: Colors.dark },
});
