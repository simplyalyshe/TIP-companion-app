import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radii, shadows, spacing } from "../../theme";

export default function SectionCard({ title, children, compact, style }) {
  return (
    <View style={[styles.card, compact && styles.compactCard, style]}>
      {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  compactCard: {
    paddingVertical: spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: spacing.md,
  },
});
