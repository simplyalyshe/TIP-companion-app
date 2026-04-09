import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { logoUri } from "../../data/campuses";
import { colors, radii, shadows, spacing } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function BrandPanel({ campusKey, eyebrow, title, subtitle, children }) {
  const theme = getCampusTheme(campusKey);

  return (
    <View style={[styles.panel, { backgroundColor: theme.panel }]}>
      <View style={[styles.accent, { backgroundColor: theme.accent }]} />
      <View style={styles.header}>
        <View style={styles.textWrap}>
          <Text style={[styles.eyebrow, { color: theme.accent }]}>{eyebrow}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={[styles.logoPlate, { borderColor: theme.accent }]}>
          <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.lg,
    padding: spacing.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    paddingRight: spacing.md,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: "#d0d0d0",
    fontSize: 14,
    lineHeight: 21,
  },
  logoPlate: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
});
