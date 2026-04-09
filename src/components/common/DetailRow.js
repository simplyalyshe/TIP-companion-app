import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../../theme";

export default function DetailRow({ label, value, isLast }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    color: colors.gray700,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: colors.ink,
    fontWeight: "700",
  },
});
