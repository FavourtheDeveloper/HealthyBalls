import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { learningTopics } from '../../data/dummyData';

export default function LearnScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = learningTopics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.header}>
        <Text style={styles.headerTitle}>Learning Center</Text>
        <Text style={styles.headerSub}>Knowledge is your best medicine</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            placeholderTextColor={Colors.gray500}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.topicCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('TopicDetail', { topic: item })}
          >
            <Image source={{ uri: item.image }} style={styles.topicImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.overlay}
            >
              <View style={[styles.iconBadge, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={18} color={Colors.white} />
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{item.title}</Text>
                <Text style={styles.topicSub}>{item.subtitle}</Text>
                <View style={styles.topicFooter}>
                  <View style={styles.articleBadge}>
                    <Ionicons name="document-text" size={12} color={Colors.white} />
                    <Text style={styles.articleCount}>{item.articleCount} articles</Text>
                  </View>
                  <Ionicons name="arrow-forward-circle" size={24} color={Colors.white} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl, paddingTop: Spacing.md },
  headerTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.sm, marginTop: 4, marginBottom: Spacing.md },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.white, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: FontSizes.md, color: Colors.dark },
  list: { padding: Spacing.md, gap: Spacing.md },
  topicCard: { height: 200, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.md },
  topicImage: { width: '100%', height: '100%', position: 'absolute' },
  overlay: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: Spacing.md },
  iconBadge: {
    width: 36, height: 36, borderRadius: 12, justifyContent: 'center',
    alignItems: 'center', position: 'absolute', top: Spacing.md, left: Spacing.md,
  },
  topicContent: { flex: 1 },
  topicTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '900' },
  topicSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginTop: 2 },
  topicFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  articleBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  articleCount: { color: Colors.white, fontSize: FontSizes.xs, fontWeight: '600' },
});
