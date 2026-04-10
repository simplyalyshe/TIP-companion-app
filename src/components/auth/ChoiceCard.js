import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function ChoiceCard({ title, description, icon, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
        <View style={[styles.iconShell, selected && styles.iconShellSelected]}>
          <MaterialCommunityIcons name={selected ? "check" : icon} size={18} color={selected ? colors.text.primary : colors.text.secondary} />
        </View>
      </View>
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
  },
  cardSelected: {
    borderColor: colors.accent.default,
    backgroundColor: colors.bg.muted,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  copy: {
    flex: 1,
  },
  iconShell: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    alignItems: "center",
    justifyContent: "center",
  },
  iconShellSelected: {
    backgroundColor: colors.accent.default,
    borderColor: colors.accent.default,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: 3,
  },
});
