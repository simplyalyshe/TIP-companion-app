import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { logoUri } from "../../data/campuses";
import { borders, colors, radii, signature, spacing, typography } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function BrandPanel({ campusKey, eyebrow, title, subtitle, children }) {
  const theme = getCampusTheme(campusKey);

  return (
    <View style={styles.panel}>
      <View style={styles.logoWrap}>
        <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
      </View>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={[styles.goldRule, { backgroundColor: theme.accent }]} />
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: "center",
  },
  eyebrow: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.title,
    fontWeight: "800",
    lineHeight: 31,
    textAlign: "center",
    maxWidth: 280,
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: spacing.xs,
    textAlign: "center",
    maxWidth: 260,
  },
  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    backgroundColor: colors.bg.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 38,
    height: 38,
  },
  goldRule: {
    width: 44,
    height: signature.majorRuleHeight,
    borderRadius: radii.pill,
    marginTop: spacing.sm,
  },
  body: {
    marginTop: spacing.sm,
    width: "100%",
  },
});
