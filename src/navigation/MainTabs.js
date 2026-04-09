import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../context/AppContext";
import { campusData } from "../data/campuses";
import { borders, colors, spacing, typography } from "../theme";
import HomeScreen from "../screens/main/HomeScreen";
import AboutScreen from "../screens/main/AboutScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import ScheduleScreen from "../screens/main/ScheduleScreen";
import ContactsScreen from "../screens/main/ContactsScreen";
import CampusMapScreen from "../screens/main/CampusMapScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: styles.header,
        headerShadowVisible: false,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: colors.text.inverse,
        headerRight: () => (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{branch.shortName}</Text>
          </View>
        ),
        tabBarActiveTintColor: colors.accent.default,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const iconMap = {
            Home: focused ? "home" : "home-outline",
            About: focused ? "information" : "information-outline",
            Profile: focused ? "account-circle" : "account-circle-outline",
            Schedule: focused ? "calendar-month" : "calendar-month-outline",
            Contacts: focused ? "card-account-phone" : "card-account-phone-outline",
            CampusMap: focused ? "map-marker-radius" : "map-marker-radius-outline",
          };

          return <MaterialCommunityIcons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="CampusMap" component={CampusMapScreen} options={{ title: "Campus Map" }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.bg.inverse,
  },
  headerTitle: {
    color: colors.text.inverse,
    fontSize: 18,
    fontWeight: "800",
  },
  headerBadge: {
    backgroundColor: colors.accent.default,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: spacing.xs,
  },
  headerBadgeText: {
    color: colors.text.primary,
    fontWeight: "800",
    fontSize: typography.sizes.micro,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tabBar: {
    height: 66,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: colors.bg.surface,
    borderTopWidth: borders.soft,
    borderTopColor: colors.border.soft,
  },
  tabBarLabel: {
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    marginBottom: 2,
  },
});
