import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius } from '../../theme';
import { messages } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';

const typeIcons = {
  announcement: { icon: 'megaphone', color: Colors.primary },
  appointment: { icon: 'calendar', color: '#1565C0' },
  reminder: { icon: 'alarm', color: Colors.warning },
  achievement: { icon: 'trophy', color: Colors.secondary },
};

export default function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Notifications" onBack={() => navigation.goBack()} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const meta = typeIcons[item.type] || typeIcons.announcement;
          return (
            <TouchableOpacity style={[styles.item, !item.read && styles.unread]}>
              <View style={[styles.iconBox, { backgroundColor: meta.color + '15' }]}>
                <Ionicons name={meta.icon} size={22} color={meta.color} />
              </View>
              <View style={styles.content}>
                <View style={styles.row}>
                  <Text style={styles.from}>{item.from}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.subject} numberOfLines={1}>{item.subject}</Text>
                <Text style={styles.preview} numberOfLines={1}>{item.preview}</Text>
              </View>
              {!item.read && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, gap: Spacing.sm },
  item: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, borderWidth: 1, borderColor: Colors.gray100,
  },
  unread: { borderColor: Colors.primary + '40', backgroundColor: Colors.accent },
  iconBox: { width: 44, height: 44, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  content: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  from: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark },
  date: { fontSize: FontSizes.xs, color: Colors.gray500 },
  subject: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark, marginBottom: 2 },
  preview: { fontSize: FontSizes.sm, color: Colors.gray500 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginTop: 4 },
});
