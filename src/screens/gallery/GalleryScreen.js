import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet,
  Dimensions, Modal, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSizes, Spacing, Radius } from '../../theme';
import { galleryItems } from '../../data/dummyData';
import ScreenHeader from '../../components/ScreenHeader';

const { width } = Dimensions.get('window');
const IMG_SIZE = (width - Spacing.md * 2 - Spacing.xs * 2) / 3;

const categories = ['All', 'Outreach', 'Training', 'Screening', 'Events', 'Partners', 'Media'];

export default function GalleryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = galleryItems.filter((g) => filter === 'All' || g.category === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Gallery" onBack={() => navigation.goBack()} />

      <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
        <Text style={styles.heroTitle}>Our Story in Pictures</Text>
        <Text style={styles.heroSub}>{galleryItems.length} photos from outreaches, events, and more</Text>
      </LinearGradient>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, filter === cat && styles.catChipActive]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.catLabel, filter === cat && styles.catLabelActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.imgWrap}
            onPress={() => setSelected(item)}
            activeOpacity={0.85}
          >
            <Image source={{ uri: item.image }} style={styles.img} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.imgOverlay}>
              <Text style={styles.imgCaption} numberOfLines={1}>{item.category}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />

      {/* Lightbox Modal */}
      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setSelected(null)}>
            <Ionicons name="close" size={28} color={Colors.white} />
          </TouchableOpacity>
          {selected && (
            <>
              <Image source={{ uri: selected.image }} style={styles.modalImg} resizeMode="contain" />
              <View style={styles.modalCaption}>
                <Text style={styles.modalCaptionText}>{selected.caption}</Text>
                <View style={styles.modalBadge}>
                  <Text style={styles.modalBadgeText}>{selected.category}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xl, fontWeight: '900' },
  heroSub: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.sm, marginTop: 4 },
  catRow: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.sm },
  catChip: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 6 },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catLabel: { fontSize: FontSizes.sm, color: Colors.gray700, fontWeight: '600' },
  catLabelActive: { color: Colors.white },
  grid: { paddingHorizontal: Spacing.md },
  imgWrap: { width: IMG_SIZE, height: IMG_SIZE, margin: Spacing.xs / 2, borderRadius: Radius.sm, overflow: 'hidden' },
  img: { width: '100%', height: '100%' },
  imgOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: IMG_SIZE / 2, justifyContent: 'flex-end', padding: 4 },
  imgCaption: { color: Colors.white, fontSize: 9, fontWeight: '700' },
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.92)', justifyContent: 'center', alignItems: 'center' },
  modalClose: { position: 'absolute', top: 60, right: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 6 },
  modalImg: { width: width, height: width, maxHeight: '70%' },
  modalCaption: { position: 'absolute', bottom: 60, left: Spacing.md, right: Spacing.md, alignItems: 'flex-start' },
  modalCaptionText: { color: Colors.white, fontSize: FontSizes.lg, fontWeight: '700', marginBottom: 8 },
  modalBadge: { backgroundColor: Colors.primary, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  modalBadgeText: { color: Colors.white, fontSize: FontSizes.xs, fontWeight: '700' },
});
