import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function CampusCard({ optionKey, title, description, address, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {address ? <Text style={styles.meta}>{address}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.surface,
    borderRadius: 18,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 82,
    width: "88%",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 2,
  },
  cardSelected: {
    borderColor: colors.accent.default,
    backgroundColor: colors.bg.muted,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  titleSelected: {
    color: colors.ink,
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 20,
    fontSize: typography.sizes.meta,
    textAlign: "center",
  },
  meta: {
    color: colors.text.muted,
    fontWeight: "600",
    lineHeight: 18,
    fontSize: typography.sizes.meta,
    textAlign: "center",
  },
});
