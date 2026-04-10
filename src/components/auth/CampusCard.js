import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { borders, colors, radii, spacing, typography } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function CampusCard({ optionKey, title, description, address, selected, onPress }) {
  const theme = getCampusTheme(optionKey);

  return (
    <Pressable onPress={onPress} style={[styles.card, selected && { borderColor: theme.accent, backgroundColor: colors.bg.muted }]}>
      <View style={styles.cardTop}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconShell, selected && { backgroundColor: theme.accent, borderColor: theme.accent }]}>
          <MaterialCommunityIcons
            name={selected ? "check" : "arrow-top-right"}
            size={18}
            color={selected ? colors.text.primary : theme.accent}
          />
        </View>
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md + 2,
    gap: spacing.xs,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  iconShell: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    backgroundColor: colors.bg.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 20,
    fontSize: typography.sizes.meta,
  },
  meta: {
    color: colors.text.muted,
    fontWeight: "600",
    lineHeight: 18,
    fontSize: typography.sizes.meta,
  },
});
