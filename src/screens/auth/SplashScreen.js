import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logoUri } from "../../data/campuses";
import { colors, shadows, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";

export default function SplashScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("HomeCampus"), 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppScreen backgroundColor={colors.ink} style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.backdrop, { top: insets.top + 30 }]} />
      <View style={[styles.frame, { marginTop: Math.max(insets.top * 0.35, 8), marginBottom: Math.max(insets.bottom * 0.35, 8) }]}>
        <View style={styles.logoWrap}>
          <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Campus Companion</Text>
        <Text style={styles.subtitle}>Technological Institute of the Philippines</Text>
        <Text style={styles.hint}>Student access for Manila and Quezon City</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    padding: spacing.xl,
  },
  backdrop: {
    position: "absolute",
    right: 22,
    width: 180,
    height: 180,
    borderRadius: 36,
    backgroundColor: "rgba(244, 194, 13, 0.14)",
    transform: [{ rotate: "-12deg" }],
  },
  frame: {
    borderRadius: 32,
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#343434",
    padding: spacing.xl,
    alignItems: "center",
    ...shadows.card,
  },
  logoWrap: {
    width: 160,
    height: 160,
    borderRadius: 40,
    backgroundColor: "#2b2b2b",
    borderWidth: 1,
    borderColor: "rgba(244, 194, 13, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 124,
    height: 124,
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: "#d9d9d9",
    fontSize: 16,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  hint: {
    color: colors.primary,
    marginTop: spacing.sm,
    fontWeight: "700",
    letterSpacing: 0.4,
    textAlign: "center",
  },
});
