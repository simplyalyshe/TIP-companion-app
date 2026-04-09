import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function ChoiceCard({ title, description, icon, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.left}>
        <MaterialCommunityIcons name={icon} size={20} color={selected ? colors.accent.strong : colors.text.secondary} />
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <MaterialCommunityIcons name={selected ? "radiobox-marked" : "radiobox-blank"} size={22} color={selected ? colors.accent.strong : colors.text.muted} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  cardSelected: {
    borderColor: colors.accent.default,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
  },
});
