import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing, Radius, Shadow } from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';
import HBButton from '../../components/HBButton';

const contactDetails = [
  { icon: 'call', label: 'Phone', value: '+27 11 123 4567', color: Colors.primary },
  { icon: 'mail', label: 'Email', value: 'hello@healthyballs.co.za', color: '#1565C0' },
  { icon: 'location', label: 'Office', value: '45 Rivonia Road, Sandton, Johannesburg, 2196', color: '#6A1B9A' },
  { icon: 'time', label: 'Office Hours', value: 'Mon–Fri: 08:00–17:00\nSat: 09:00–13:00', color: Colors.warning },
];

const socials = [
  { icon: 'logo-facebook', label: 'Facebook', handle: '/HealthyBallsSA', color: '#1877F2' },
  { icon: 'logo-instagram', label: 'Instagram', handle: '@healthyballs_sa', color: '#E1306C' },
  { icon: 'logo-twitter', label: 'Twitter / X', handle: '@HealthyBallsSA', color: '#1DA1F2' },
  { icon: 'logo-whatsapp', label: 'WhatsApp', handle: '+27 60 123 4567', color: '#25D366' },
  { icon: 'logo-youtube', label: 'YouTube', handle: 'HealthyBalls SA', color: '#FF0000' },
];

export default function ContactScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!form.name || !form.message) {
      Alert.alert('Missing fields', 'Please enter your name and message.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Message Sent!', 'Thank you for reaching out. We will respond within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="Contact Us" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <LinearGradient colors={['#0D4A28', '#1A6B3C']} style={styles.hero}>
          <Ionicons name="chatbubbles" size={36} color={Colors.secondary} />
          <Text style={styles.heroTitle}>Get in Touch</Text>
          <Text style={styles.heroSub}>We're here to help. Reach out and we'll get back to you within 24 hours.</Text>
        </LinearGradient>

        {/* Contact Info */}
        <View style={styles.section}>
          {contactDetails.map((item) => (
            <View key={item.label} style={styles.contactRow}>
              <View style={[styles.contactIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Send Us a Message</Text>
          {[
            { label: 'Your Name *', key: 'name', placeholder: 'Thabo Nkosi' },
            { label: 'Email Address', key: 'email', placeholder: 'your@email.com', keyboard: 'email-address' },
            { label: 'Phone Number', key: 'phone', placeholder: '+27 82 345 6789', keyboard: 'phone-pad' },
            { label: 'Subject', key: 'subject', placeholder: 'How can we help?' },
          ].map((field) => (
            <View key={field.key}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.gray500}
                keyboardType={field.keyboard || 'default'}
                value={form[field.key]}
                onChangeText={(v) => setForm((f) => ({ ...f, [field.key]: v }))}
                autoCapitalize={field.keyboard ? 'none' : 'words'}
              />
            </View>
          ))}
          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Tell us how we can help..."
            placeholderTextColor={Colors.gray500}
            multiline
            numberOfLines={5}
            value={form.message}
            onChangeText={(v) => setForm((f) => ({ ...f, message: v }))}
          />
          <HBButton label="Send Message" icon="send" onPress={submit} loading={loading} style={{ marginTop: Spacing.sm }} />
        </View>

        {/* Socials */}
        <Text style={styles.socialTitle}>Follow Us</Text>
        <View style={styles.socialGrid}>
          {socials.map((s) => (
            <TouchableOpacity key={s.label} style={[styles.socialCard, { borderColor: s.color + '40' }]}>
              <Ionicons name={s.icon} size={24} color={s.color} />
              <Text style={styles.socialLabel}>{s.label}</Text>
              <Text style={styles.socialHandle}>{s.handle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency */}
        <View style={styles.emergencyCard}>
          <Ionicons name="alert-circle" size={24} color={Colors.danger} />
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
            <Text style={styles.emergencyItem}>GBV Command Centre: <Text style={styles.emergencyNum}>0800 428 428</Text></Text>
            <Text style={styles.emergencyItem}>South African Police: <Text style={styles.emergencyNum}>10111</Text></Text>
            <Text style={styles.emergencyItem}>Lifeline (Suicide): <Text style={styles.emergencyNum}>0861 322 322</Text></Text>
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  hero: { borderRadius: Radius.lg, padding: Spacing.xl, alignItems: 'center', marginBottom: 0 },
  heroTitle: { color: Colors.white, fontSize: FontSizes.xxl, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: FontSizes.sm, textAlign: 'center', marginTop: 8, lineHeight: 20 },
  section: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm, gap: Spacing.sm },
  contactRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  contactIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  contactLabel: { fontSize: FontSizes.xs, color: Colors.gray500, fontWeight: '700', textTransform: 'uppercase' },
  contactValue: { fontSize: FontSizes.sm, color: Colors.dark, fontWeight: '500', lineHeight: 20, marginTop: 2 },
  formCard: { backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, ...Shadow.sm, gap: 4 },
  formTitle: { fontSize: FontSizes.xl, fontWeight: '800', color: Colors.dark, marginBottom: Spacing.sm },
  label: { fontSize: FontSizes.sm, fontWeight: '600', color: Colors.dark, marginTop: 8, marginBottom: 4 },
  input: { borderWidth: 1.5, borderColor: Colors.gray300, borderRadius: Radius.sm, paddingHorizontal: Spacing.md, paddingVertical: 11, fontSize: FontSizes.md, color: Colors.dark },
  textarea: { height: 100, textAlignVertical: 'top' },
  socialTitle: { fontSize: FontSizes.lg, fontWeight: '800', color: Colors.dark },
  socialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  socialCard: { flex: 1, minWidth: 140, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm, alignItems: 'center', gap: 4, borderWidth: 1.5, ...Shadow.sm },
  socialLabel: { fontSize: FontSizes.sm, fontWeight: '700', color: Colors.dark },
  socialHandle: { fontSize: FontSizes.xs, color: Colors.gray500 },
  emergencyCard: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, backgroundColor: Colors.danger + '08', borderRadius: Radius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.danger + '30' },
  emergencyTitle: { fontSize: FontSizes.md, fontWeight: '800', color: Colors.danger, marginBottom: 6 },
  emergencyItem: { fontSize: FontSizes.sm, color: Colors.dark, marginBottom: 3 },
  emergencyNum: { fontWeight: '800', color: Colors.danger },
});
