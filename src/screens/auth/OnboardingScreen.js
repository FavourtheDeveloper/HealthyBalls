import React, { useState, useRef } from 'react';
import {
  View, Text, Image, StyleSheet, FlatList, TouchableOpacity,
  Dimensions, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, Radius } from '../../theme';
import HBButton from '../../components/HBButton';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Know Your Health',
    subtitle: 'Testicular and prostate cancer are highly treatable when detected early. Learn how to check yourself.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
    bg: ['#0D4A28', '#1A6B3C'],
  },
  {
    id: '2',
    title: 'Become an Ambassador',
    subtitle: 'Train, certify, and lead others. Earn recognition as a HealthyBalls health champion in your community.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
    bg: ['#1565C0', '#1976D2'],
  },
  {
    id: '3',
    title: 'Book & Track',
    subtitle: 'Book screenings, manage your health records, find providers, and get reminded — all in one app.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
    bg: ['#4A148C', '#7B1FA2'],
  },
  {
    id: '4',
    title: 'Check. Know. Act.',
    subtitle: 'Join thousands of men taking charge of their health. Download now. Register. Start your journey.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600',
    bg: ['#BF360C', '#E64A19'],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Welcome');
    }
  };

  const skip = () => navigation.replace('Welcome');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <LinearGradient colors={item.bg} style={styles.slide}>
            <TouchableOpacity style={styles.skipBtn} onPress={skip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.slideImage} />
            <View style={styles.slideContent}>
              <View style={styles.logoRow}>
                <Ionicons name="fitness" size={28} color={Colors.secondary} />
                <Text style={styles.logoText}>HealthyBalls</Text>
              </View>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>
          </LinearGradient>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.dotActive]}
            />
          ))}
        </View>
        <HBButton
          label={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={goNext}
          style={styles.nextBtn}
          icon={currentIndex === slides.length - 1 ? 'rocket' : 'arrow-forward'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark },
  slide: { width, height, justifyContent: 'flex-end' },
  skipBtn: { position: 'absolute', top: 56, right: 20, zIndex: 10, padding: 8 },
  skipText: { color: 'rgba(255,255,255,0.7)', fontSize: FontSizes.md, fontWeight: '600' },
  slideImage: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: height * 0.55, opacity: 0.35,
  },
  slideContent: { padding: Spacing.xl, paddingBottom: 120 },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  logoText: { color: Colors.secondary, fontSize: FontSizes.lg, fontWeight: '800', marginLeft: 8, letterSpacing: 1 },
  slideTitle: { color: Colors.white, fontSize: FontSizes.xxxl, fontWeight: '900', marginBottom: Spacing.sm, lineHeight: 36 },
  slideSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: FontSizes.md, lineHeight: 24 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingBottom: 40,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.gray300 },
  dotActive: { backgroundColor: Colors.primary, width: 24 },
  nextBtn: { flex: 1, marginLeft: Spacing.lg },
});
