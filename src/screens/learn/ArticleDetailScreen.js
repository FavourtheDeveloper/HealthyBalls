import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';

export default function ArticleDetailScreen({ route, navigation }) {
  const { article, topicColor } = route.params;
  const insets = useSafeAreaInsets();
  const [bookmarked, setBookmarked] = useState(false);

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <Text key={i} style={styles.bold}>{line.slice(2, -2)}</Text>;
      }
      if (line.startsWith('- ')) {
        return (
          <View key={i} style={styles.bulletRow}>
            <View style={[styles.bullet, { backgroundColor: topicColor }]} />
            <Text style={styles.bulletText}>{line.slice(2)}</Text>
          </View>
        );
      }
      if (line.trim() === '') return <View key={i} style={{ height: 8 }} />;
      return <Text key={i} style={styles.bodyText}>{line}</Text>;
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: topicColor }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.dark} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>{article.title}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={12} color={Colors.gray500} />
            <Text style={styles.readTime}>{article.readTime} read</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={bookmarked ? topicColor : Colors.gray500}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.topBar, { backgroundColor: topicColor }]} />

        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>

        <View style={styles.tagsRow}>
          {article.tags.map((tag) => (
            <View key={tag} style={[styles.tagChip, { borderColor: topicColor }]}>
              <Text style={[styles.tagText, { color: topicColor }]}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />
        <View style={styles.bodyBlock}>
          {renderContent(article.content)}
        </View>

        {/* Action CTA */}
        <View style={[styles.ctaCard, { borderColor: topicColor }]}>
          <Ionicons name="information-circle" size={24} color={topicColor} />
          <Text style={styles.ctaText}>
            Ready to take action? Book a screening or find a health provider near you.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm, borderBottomWidth: 2 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  readTime: { fontSize: FontSizes.xs, color: Colors.gray500 },
  content: { padding: Spacing.md },
  topBar: { height: 4, borderRadius: Radius.full, marginBottom: Spacing.md },
  articleTitle: { fontSize: FontSizes.xxl, fontWeight: '900', color: Colors.dark, lineHeight: 30, marginBottom: Spacing.sm },
  summary: { fontSize: FontSizes.md, color: Colors.gray500, lineHeight: 22, marginBottom: Spacing.md, fontStyle: 'italic' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.md },
  tagChip: { borderWidth: 1.5, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: FontSizes.xs, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.gray100, marginVertical: Spacing.sm },
  bodyBlock: { gap: 4 },
  bodyText: { fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 24 },
  bold: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.dark, lineHeight: 24, marginTop: 8 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingLeft: 8, marginVertical: 2 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 9 },
  bulletText: { flex: 1, fontSize: FontSizes.md, color: Colors.gray700, lineHeight: 24 },
  ctaCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderWidth: 1.5, borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.xl, backgroundColor: Colors.accent },
  ctaText: { flex: 1, fontSize: FontSizes.sm, color: Colors.dark, lineHeight: 20 },
});
