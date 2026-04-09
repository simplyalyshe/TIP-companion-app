import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../context/AppContext";
import { campusData } from "../data/campuses";
import { colors, radii } from "../theme";
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
        headerStyle: { backgroundColor: colors.ink },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: "800" },
        headerRight: () => (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{branch.shortName}</Text>
          </View>
        ),
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.gray700,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Home: "home-variant",
            About: "information-outline",
            Profile: "account-circle-outline",
            Schedule: "calendar-month-outline",
            Contacts: "card-account-phone-outline",
            CampusMap: "map-marker-radius-outline",
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
  headerBadge: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerBadgeText: {
    color: colors.ink,
    fontWeight: "900",
    fontSize: 12,
  },
  tabBar: {
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontWeight: "700",
  },
});
