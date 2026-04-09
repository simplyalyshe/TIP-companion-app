import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../theme";

export default function SectionCard({ title, eyebrow, children, compact, style }) {
  return (
    <View style={[styles.section, compact && styles.compactSection, style]}>
      {(eyebrow || title) ? (
        <View style={styles.header}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
          {title ? <Text style={styles.title}>{title}</Text> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  compactSection: {
    paddingBottom: spacing.sm,
  },
  header: {
    marginBottom: spacing.sm,
  },
  eyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
});
