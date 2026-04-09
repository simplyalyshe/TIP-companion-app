import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { logoUri } from "../../data/campuses";
import { colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace("HomeCampus"), 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppScreen backgroundColor={colors.bg.inverse} style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.center}>
        <View style={styles.logoWrap}>
          <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.kicker}>Technological Institute of the Philippines</Text>
        <Text style={styles.title}>Campus Companion</Text>
        <View style={styles.rule} />
        <Text style={styles.subtitle}>Official mobile access for Manila and Quezon City</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    padding: spacing.lg,
  },
  center: {
    alignItems: "center",
  },
  logoWrap: {
    width: 92,
    height: 92,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 58,
    height: 58,
  },
  kicker: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text.inverse,
    fontSize: typography.sizes.hero,
    fontWeight: "800",
    textAlign: "center",
  },
  rule: {
    width: 72,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.accent.default,
    marginVertical: spacing.md,
  },
  subtitle: {
    color: "rgba(255,255,255,0.74)",
    fontSize: typography.sizes.body,
    lineHeight: 22,
    textAlign: "center",
  },
});
