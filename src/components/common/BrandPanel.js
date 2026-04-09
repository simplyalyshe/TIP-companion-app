import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { logoUri } from "../../data/campuses";
import { borders, colors, radii, signature, spacing, typography } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function BrandPanel({ campusKey, eyebrow, title, subtitle, children }) {
  const theme = getCampusTheme(campusKey);

  return (
    <View style={styles.panel}>
      <View style={styles.topBand} />
      <View style={styles.topRow}>
        <View style={styles.copy}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.logoWrap}>
          <Image source={{ uri: logoUri }} style={styles.logo} resizeMode="contain" />
        </View>
      </View>
      <View style={[styles.goldRule, { backgroundColor: theme.accent }]} />
      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  topBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: signature.headerBandHeight,
    backgroundColor: colors.signature.major,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  copy: {
    flex: 1,
  },
  eyebrow: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text.inverse,
    fontSize: typography.sizes.title,
    fontWeight: "800",
    lineHeight: 30,
  },
  subtitle: {
    color: "rgba(255,255,255,0.76)",
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  logoWrap: {
    width: 58,
    height: 58,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 34,
    height: 34,
  },
  goldRule: {
    width: 64,
    height: signature.majorRuleHeight,
    borderRadius: radii.pill,
    marginTop: spacing.md,
  },
  body: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: borders.hairline,
    borderTopColor: colors.border.inverse,
  },
});
