import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import { articles } from '../../data/dummyData';
import Card from '../../components/Card';

export default function TopicDetailScreen({ route, navigation }) {
  const { topic } = route.params;
  const topicArticles = articles[topic.id] || [];

  return (
    <View style={styles.container}>
      <View style={styles.heroWrap}>
        <Image source={{ uri: topic.image }} style={styles.heroImage} />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.heroOverlay}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <View style={[styles.iconBadge, { backgroundColor: topic.color }]}>
            <Ionicons name={topic.icon} size={24} color={Colors.white} />
          </View>
          <Text style={styles.heroTitle}>{topic.title}</Text>
          <Text style={styles.heroSub}>{topic.subtitle}</Text>
          <Text style={styles.heroCount}>{topicArticles.length} articles available</Text>
        </LinearGradient>
      </View>

      <FlatList
        data={topicArticles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Articles</Text>
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ArticleDetail', { article: item, topicColor: topic.color })}
          >
            <Card style={styles.articleCard}>
              <View style={styles.articleRow}>
                <View style={[styles.numberBadge, { backgroundColor: topic.color }]}>
                  <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
                </View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>{item.title}</Text>
                  <Text style={styles.articleSummary} numberOfLines={2}>{item.summary}</Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={12} color={Colors.gray500} />
                    <Text style={styles.readTime}>{item.readTime} read</Text>
                    {item.tags.slice(0, 2).map((tag) => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray500} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  heroWrap: { height: 240, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: Spacing.md, justifyContent: 'flex-end' },
  backBtn: { position: 'absolute', top: 52, left: Spacing.md, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  iconBadge: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, marginTop: 2 },
  heroCount: { color: Colors.secondary, fontSize: FontSizes.xs, fontWeight: '700', marginTop: 4 },
  list: { padding: Spacing.md, gap: Spacing.sm },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm },
  articleCard: { padding: 0, overflow: 'hidden' },
  articleRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.sm },
  numberBadge: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  number: { color: Colors.white, fontSize: FontSizes.sm, fontWeight: '900' },
  articleContent: { flex: 1 },
  articleTitle: { fontSize: FontSizes.md, fontWeight: '700', color: Colors.dark, marginBottom: 4 },
  articleSummary: { fontSize: FontSizes.sm, color: Colors.gray500, lineHeight: 18, marginBottom: 6 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  readTime: { fontSize: FontSizes.xs, color: Colors.gray500 },
  tag: { backgroundColor: Colors.gray100, borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  tagText: { fontSize: 10, color: Colors.gray700, fontWeight: '600' },
});
