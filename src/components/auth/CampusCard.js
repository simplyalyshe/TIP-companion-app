import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { borders, colors, radii, spacing, typography } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function CampusCard({ optionKey, title, description, address, selected, onPress }) {
  const theme = getCampusTheme(optionKey);

  return (
    <Pressable onPress={onPress} style={[styles.card, selected && { borderColor: theme.accent }]}> 
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons name={selected ? "check-circle" : "chevron-right"} size={20} color={selected ? theme.accent : colors.text.muted} />
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.meta}>{address}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    padding: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 21,
    marginBottom: spacing.xs,
    fontSize: typography.sizes.body,
  },
  meta: {
    color: colors.text.muted,
    fontWeight: "600",
    lineHeight: 18,
    fontSize: typography.sizes.meta,
  },
});
