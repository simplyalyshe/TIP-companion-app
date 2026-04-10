import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { logoUri } from "../../data/campuses";
import { borders, colors, radii, signature, spacing, typography } from "../../theme";

export default function HeroBanner({ branch }) {
  return (
    <View style={styles.banner}>
      <View style={styles.rail} />
      <View style={styles.copy}>
        <Text style={styles.kicker}>Home Campus</Text>
        <Text style={styles.title}>{branch.name}</Text>
        <Text style={styles.subtitle}>{branch.subtitle}</Text>
      </View>
      <View style={styles.logoWrap}>
        <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingBottom: spacing.md,
    paddingLeft: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.strong,
    position: "relative",
  },
  rail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: spacing.md,
    width: signature.railWidth,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.rail,
  },
  copy: {
    flex: 1,
  },
  kicker: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.title,
    fontWeight: "800",
    lineHeight: 30,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: radii.sm,
    backgroundColor: colors.bg.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
});
