import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { messages } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';

const typeConfig = {
  announcement: { icon: 'megaphone', color: Colors.primary },
  appointment: { icon: 'calendar', color: '#1565C0' },
  reminder: { icon: 'alarm', color: Colors.warning },
  achievement: { icon: 'trophy', color: Colors.secondary },
};

export default function MessagingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [msgs, setMsgs] = useState(messages);

  const unreadCount = msgs.filter((m) => !m.read).length;

  const markRead = (id) => setMsgs((m) => m.map((msg) => msg.id === id ? { ...msg, read: true } : msg));
  const markAllRead = () => setMsgs((m) => m.map((msg) => ({ ...msg, read: true })));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Messages" onBack={() => navigation.goBack()} />

      <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroTitle}>Inbox</Text>
            <Text style={styles.heroSub}>{unreadCount} unread messages</Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <FlatList
        data={msgs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const config = typeConfig[item.type] || typeConfig.announcement;
          return (
            <TouchableOpacity
              style={[styles.msgCard, !item.read && styles.msgUnread]}
              activeOpacity={0.9}
              onPress={() => {
                markRead(item.id);
                navigation.navigate('MessageDetail', { message: item });
              }}
            >
              <View style={[styles.msgIcon, { backgroundColor: config.color + '15' }]}>
                <Ionicons name={config.icon} size={22} color={config.color} />
              </View>
              <View style={styles.msgContent}>
                <View style={styles.msgHeader}>
                  <Text style={[styles.msgFrom, !item.read && styles.msgFromBold]}>{item.from}</Text>
                  <Text style={styles.msgDate}>{item.date}</Text>
                </View>
                <Text style={[styles.msgSubject, !item.read && styles.msgSubjectBold]} numberOfLines={1}>
                  {item.subject}
                </Text>
                <Text style={styles.msgPreview} numberOfLines={1}>{item.preview}</Text>
              </View>
              {!item.read && <View style={[styles.unreadDot, { backgroundColor: config.color }]} />}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={48} color={Colors.gray300} />
            <Text style={styles.emptyText}>No messages yet</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.sm, marginTop: 2 },
  markAllBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6 },
  markAllText: { color: Colors.white, fontSize: FontSizes.xs, fontWeight: '700' },
  list: { padding: Spacing.md, gap: Spacing.sm },
  msgCard: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm },
  msgUnread: { backgroundColor: Colors.accent, borderWidth: 1, borderColor: Colors.primary + '30' },
  msgIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  msgContent: { flex: 1 },
  msgHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  msgFrom: { fontSize: FontSizes.sm, color: Colors.gray700 },
  msgFromBold: { fontWeight: '800', color: Colors.dark },
  msgDate: { fontSize: FontSizes.xs, color: Colors.gray500 },
  msgSubject: { fontSize: FontSizes.md, color: Colors.dark, marginBottom: 2 },
  msgSubjectBold: { fontWeight: '800' },
  msgPreview: { fontSize: FontSizes.sm, color: Colors.gray500 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4, flexShrink: 0 },
  empty: { alignItems: 'center', padding: Spacing.xxl },
  emptyText: { color: Colors.gray500, fontSize: FontSizes.md, marginTop: Spacing.sm },
});
