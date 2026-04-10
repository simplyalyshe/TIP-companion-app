import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import SplashScreen from "../screens/auth/SplashScreen";
import HomeCampusScreen from "../screens/auth/HomeCampusScreen";
import CrossEnrolleeScreen from "../screens/auth/CrossEnrolleeScreen";
import SignInScreen from "../screens/auth/SignInScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="HomeCampus" component={HomeCampusScreen} />
      <Stack.Screen name="CrossEnrollee" component={CrossEnrolleeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
