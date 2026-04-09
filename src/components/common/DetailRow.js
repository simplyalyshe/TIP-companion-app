import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { borders, colors, spacing, typography } from "../../theme";

export default function DetailRow({ label, value, isLast, emphasize }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, emphasize && styles.valueEmphasize]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
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
});
