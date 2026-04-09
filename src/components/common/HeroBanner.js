import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { logoUri } from "../../data/campuses";
import { colors, radii, shadows, spacing } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function HeroBanner({ branch }) {
  const theme = getCampusTheme(branch.id);

  return (
    <View style={[styles.banner, { backgroundColor: theme.panel }]}>
      <View style={styles.textWrap}>
        <Text style={[styles.kicker, { color: theme.accent }]}>Campus Companion</Text>
        <Text style={styles.title}>{branch.name}</Text>
        <Text style={styles.subtitle}>{branch.subtitle}</Text>
      </View>
      <View style={[styles.logoPlate, { backgroundColor: theme.surface }]}>
        <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...shadows.card,
  },
  textWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#d6d6d6",
  },
  logoPlate: {
    width: 92,
    height: 92,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 64,
    height: 64,
  },
});
