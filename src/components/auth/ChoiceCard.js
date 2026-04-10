import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function ChoiceCard({ title, description, selected, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected, style]}>
      <View style={styles.row}>
        <View style={styles.copy}>
          <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bg.surface,
    borderRadius: 18,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs + 2,
    minHeight: 52,
    width: "72%",
    alignSelf: "center",
    justifyContent: "center",
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
  row: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  copy: {
    alignItems: "center",
  },
  title: {
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
    includeFontPadding: false,
  },
  titleSelected: {
    color: colors.ink,
  },
  description: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: 3,
    textAlign: "center",
  },
});
