import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';
import Sidebar from '../components/Sidebar';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import LearnScreen from '../screens/learn/LearnScreen';
import ArticleDetailScreen from '../screens/learn/ArticleDetailScreen';
import TopicDetailScreen from '../screens/learn/TopicDetailScreen';
import TrainScreen from '../screens/train/TrainScreen';
import CourseDetailScreen from '../screens/train/CourseDetailScreen';
import ShopScreen from '../screens/shop/ShopScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import OrderConfirmationScreen from '../screens/shop/OrderConfirmationScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HealthRecordsScreen from '../screens/profile/HealthRecordsScreen';
import AppointmentsScreen from '../screens/profile/AppointmentsScreen';
import BookAppointmentScreen from '../screens/profile/BookAppointmentScreen';
import FindProvidersScreen from '../screens/profile/FindProvidersScreen';
import HealthAssessmentScreen from '../screens/profile/HealthAssessmentScreen';
import AboutScreen from '../screens/about/AboutScreen';
import GalleryScreen from '../screens/gallery/GalleryScreen';
import PartnersScreen from '../screens/partners/PartnersScreen';
import ContactScreen from '../screens/contact/ContactScreen';
import OutreachesScreen from '../screens/outreaches/OutreachesScreen';
import OutreachDetailScreen from '../screens/outreaches/OutreachDetailScreen';
import MessagingScreen from '../screens/messaging/MessagingScreen';
import MessageDetailScreen from '../screens/messaging/MessageDetailScreen';
import ReturnsScreen from '../screens/shop/ReturnsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SidebarContext = React.createContext({ open: () => {} });

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray300,
          height: 70,
          paddingBottom: 12,
          paddingTop: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Learn: focused ? 'book' : 'book-outline',
            Train: focused ? 'trophy' : 'trophy-outline',
            Shop: focused ? 'bag' : 'bag-outline',
            Profile: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Learn" component={LearnStack} />
      <Tab.Screen name="Train" component={TrainStack} />
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="FindProviders" component={FindProvidersScreen} />
    </Stack.Navigator>
  );
}

function LearnStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearnMain" component={LearnScreen} />
      <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}

function TrainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrainMain" component={TrainScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function ShopStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopMain" component={ShopScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="HealthRecords" component={HealthRecordsScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen name="HealthAssessment" component={HealthAssessmentScreen} />
      <Stack.Screen name="FindProviders" component={FindProvidersScreen} />
    </Stack.Navigator>
  );
}

function OutreachesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OutreachList" component={OutreachesScreen} />
      <Stack.Screen name="OutreachDetail" component={OutreachDetailScreen} />
    </Stack.Navigator>
  );
}

function MessagingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessageList" component={MessagingScreen} />
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
  );
}

// Inner component so it can call useNavigation()
function AppInner({ sidebarVisible, setSidebarVisible }) {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    setSidebarVisible(false);
    if (screen === 'MainTabs') {
      navigation.navigate('MainTabs');
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.root}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Partners" component={PartnersScreen} />
        <Stack.Screen name="Outreaches" component={OutreachesStack} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Returns" component={ReturnsScreen} />
        <Stack.Screen name="Messaging" component={MessagingStack} />
      </Stack.Navigator>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={handleNavigate}
      />
    </View>
  );
}

export default function AppNavigator() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ open: () => setSidebarVisible(true) }}>
      <AppInner sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
    </SidebarContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
