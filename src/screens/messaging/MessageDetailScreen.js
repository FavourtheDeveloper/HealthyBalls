import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';

const typeConfig = {
  announcement: { icon: 'megaphone', color: Colors.primary, label: 'Announcement' },
  appointment: { icon: 'calendar', color: '#1565C0', label: 'Appointment' },
  reminder: { icon: 'alarm', color: Colors.warning, label: 'Reminder' },
  achievement: { icon: 'trophy', color: Colors.secondary, label: 'Achievement' },
};

export default function MessageDetailScreen({ route, navigation }) {
  const { message } = route.params;
  const insets = useSafeAreaInsets();
  const config = typeConfig[message.type] || typeConfig.announcement;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader
        title="Message"
        onBack={() => navigation.goBack()}
        rightIcon="trash-outline"
        onRightPress={() =>
          Alert.alert('Delete', 'Delete this message?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
          ])
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.typeRow, { borderColor: config.color }]}>
          <View style={[styles.typeIcon, { backgroundColor: config.color + '15' }]}>
            <Ionicons name={config.icon} size={20} color={config.color} />
          </View>
          <Text style={[styles.typeLabel, { color: config.color }]}>{config.label}</Text>
        </View>

        <Text style={styles.subject}>{message.subject}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="person" size={14} color={Colors.gray500} />
            <Text style={styles.metaText}>{message.from}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar" size={14} color={Colors.gray500} />
            <Text style={styles.metaText}>{message.date}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.body}>
          {message.body.split('\n').map((line, i) => {
            if (line.trim() === '') return <View key={i} style={{ height: 8 }} />;
            if (line.startsWith('✅') || line.startsWith('🎁') || line.startsWith('📅') ||
                line.startsWith('🕘') || line.startsWith('🏥') || line.startsWith('🎉') ||
                line.startsWith('⭐') || line.startsWith('📜')) {
              return <Text key={i} style={styles.emojiLine}>{line}</Text>;
            }
            return <Text key={i} style={styles.bodyText}>{line}</Text>;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  content: { padding: Spacing.md },
  typeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, borderWidth: 1.5, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: Spacing.md },
  typeIcon: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  typeLabel: { fontSize: FontSizes.sm, fontWeight: '700' },
  subject: { fontSize: FontSizes.xxl, fontWeight: '900', color: Colors.dark, lineHeight: 30, marginBottom: Spacing.sm },
  metaRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FontSizes.sm, color: Colors.gray500 },
  divider: { height: 1, backgroundColor: Colors.gray100, marginVertical: Spacing.sm },
  body: { gap: 2 },
  bodyText: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 24 },
  emojiLine: { fontSize: FontSizes.md, color: Colors.dark, lineHeight: 28, fontWeight: '500' },
});
