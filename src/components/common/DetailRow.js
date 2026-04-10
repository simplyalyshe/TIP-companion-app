import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../theme";

export default function DetailRow({ label, value, isLast, emphasize, variant = "default" }) {
  const isHighlight = variant === "highlight";

  return (
    <View style={[styles.row, isHighlight && styles.rowHighlight, isLast && styles.rowLast]}>
      <Text style={[styles.label, isHighlight && styles.labelHighlight]}>{label}</Text>
      <Text style={[styles.value, emphasize && styles.valueEmphasize, isHighlight && styles.valueHighlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  rowHighlight: {
    backgroundColor: colors.bg.muted,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xs,
    borderBottomWidth: 0,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: typography.sizes.micro,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.text.muted,
    marginBottom: 4,
    fontWeight: "700",
  },
  labelHighlight: {
    color: colors.text.accent,
  },
  value: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    fontWeight: "600",
    lineHeight: 21,
  },
  valueEmphasize: {
    color: colors.text.primary,
    fontWeight: "800",
  },
  valueHighlight: {
    fontSize: typography.sizes.cardTitle,
  },
});
