import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { healthQuestions } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';

export default function HealthAssessmentScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (qId, optIndex) => setAnswers((a) => ({ ...a, [qId]: optIndex }));
  const allAnswered = healthQuestions.every((q) => answers[q.id] !== undefined);

  const submit = () => {
    if (!allAnswered) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting.');
      return;
    }
    setSubmitted(true);
  };

  const riskScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const maxScore = healthQuestions.length * 3;
  const riskPct = Math.round((riskScore / maxScore) * 100);
  const riskLabel = riskPct < 33 ? 'Low Risk' : riskPct < 66 ? 'Moderate Risk' : 'High Risk';
  const riskColor = riskPct < 33 ? Colors.success : riskPct < 66 ? Colors.warning : Colors.danger;

  if (submitted) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScreenHeader title="Assessment Results" onBack={() => { setSubmitted(false); setAnswers({}); }} />
        <ScrollView contentContainerStyle={styles.resultsContent}>
          <LinearGradient colors={[riskColor, riskColor + 'BB']} style={styles.resultHero}>
            <Ionicons name={riskPct < 33 ? 'shield-checkmark' : riskPct < 66 ? 'warning' : 'alert-circle'} size={48} color={Colors.white} />
            <Text style={styles.resultLevel}>{riskLabel}</Text>
            <Text style={styles.resultScore}>{riskPct}% risk score</Text>
          </LinearGradient>

          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>What this means</Text>
            <Text style={styles.resultCardBody}>
              {riskPct < 33
                ? "Your health habits are generally good. Keep up regular screenings and maintain your healthy lifestyle."
                : riskPct < 66
                ? "Some areas need attention. We recommend booking a health check and improving your screening frequency."
                : "Your responses indicate elevated health risk. We strongly recommend booking a comprehensive health check immediately."}
            </Text>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultCardTitle}>Recommended Actions</Text>
            {riskPct >= 33 && (
              <View style={styles.recItem}>
                <Ionicons name="calendar" size={16} color={Colors.primary} />
                <Text style={styles.recText}>Book a PSA/general health screening</Text>
              </View>
            )}
            <View style={styles.recItem}>
              <Ionicons name="book" size={16} color={Colors.primary} />
              <Text style={styles.recText}>Complete relevant learning modules</Text>
            </View>
            <View style={styles.recItem}>
              <Ionicons name="fitness" size={16} color={Colors.primary} />
              <Text style={styles.recText}>Increase physical activity to 5x/week</Text>
            </View>
            {riskPct >= 66 && (
              <View style={styles.recItem}>
                <Ionicons name="call" size={16} color={Colors.danger} />
                <Text style={[styles.recText, { color: Colors.danger }]}>Consult a healthcare provider urgently</Text>
              </View>
            )}
          </View>

          <HBButton label="Book a Screening" icon="calendar" onPress={() => navigation.navigate('BookAppointment')} />
          <HBButton label="Retake Assessment" variant="outline" icon="refresh" onPress={() => { setSubmitted(false); setAnswers({}); }} style={{ marginTop: 8 }} />
          <View style={{ height: 60 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Health Assessment" subtitle="Takes 2–3 minutes" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Ionicons name="clipboard" size={28} color={Colors.primary} />
          <Text style={styles.introText}>
            Answer the following questions honestly. Your responses will help us assess your health risk level and provide personalised recommendations.
          </Text>
        </View>

        {healthQuestions.map((q, qi) => (
          <View key={q.id} style={styles.questionCard}>
            <View style={styles.questionHeader}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>{q.section}</Text>
              </View>
            </View>
            <Text style={styles.questionText}>{qi + 1}. {q.question}</Text>
            <View style={styles.options}>
              {q.options.map((opt, oi) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.option, answers[q.id] === oi && styles.optionSelected]}
                  onPress={() => setAnswer(q.id, oi)}
                >
                  <View style={[styles.radio, answers[q.id] === oi && styles.radioActive]} />
                  <Text style={[styles.optionText, answers[q.id] === oi && styles.optionTextActive]}>{opt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.progress}>
          {Object.keys(answers).length}/{healthQuestions.length} answered
        </Text>
        <HBButton
          label="Submit Assessment"
          icon="send"
          onPress={submit}
          disabled={!allAnswered}
          style={{ marginTop: Spacing.sm }}
        />
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md },
  intro: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.primary + '30' },
  introText: { flex: 1, fontSize: FontSizes.sm, color: Colors.dark, lineHeight: 20 },
  questionCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  questionHeader: { marginBottom: 8 },
  sectionBadge: { backgroundColor: Colors.primary + '15', borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' },
  sectionBadgeText: { color: Colors.primary, fontSize: FontSizes.xs, fontWeight: '700' },
  questionText: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark, lineHeight: 22, marginBottom: Spacing.sm },
  options: { gap: 8 },
  option: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, borderWidth: 1.5, borderColor: Colors.gray200, borderRadius: Radius.sm },
  optionSelected: { borderColor: Colors.primary, backgroundColor: Colors.accent },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: Colors.gray300 },
  radioActive: { borderColor: Colors.primary, backgroundColor: Colors.primary },
  optionText: { fontSize: FontSizes.sm, color: Colors.dark },
  optionTextActive: { color: Colors.primary, fontWeight: '700' },
  progress: { textAlign: 'center', color: Colors.gray500, fontSize: FontSizes.sm, marginVertical: Spacing.sm },
  resultsContent: { padding: Spacing.md },
  resultHero: { borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: Spacing.md },
  resultLevel: { color: Colors.white, fontSize: FontSizes.xxxl, fontWeight: '900', marginTop: Spacing.sm },
  resultScore: { color: 'rgba(255,255,255,0.8)', fontSize: FontSizes.md, marginTop: 4 },
  resultCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  resultCardTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: 8 },
  resultCardBody: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 22 },
  recItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  recText: { fontSize: FontSizes.md, color: Colors.dark },
});
