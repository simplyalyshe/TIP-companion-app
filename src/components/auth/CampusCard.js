import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radii, shadows, spacing } from "../../theme";
import { getCampusTheme } from "../../utils/auth";

export default function CampusCard({ optionKey, title, description, address, selected, onPress }) {
  const theme = getCampusTheme(optionKey);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && { borderColor: theme.accent, backgroundColor: theme.surface }]}
    >
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tag}>{theme.label}</Text>
        </View>
        <MaterialCommunityIcons
          name={selected ? "check-circle" : "arrow-right"}
          size={22}
          color={selected ? colors.ink : colors.gray700}
        />
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.meta}>{address}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.gray300,
    padding: spacing.lg,
    ...shadows.card,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  copy: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 6,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: colors.gray100,
    color: colors.gray900,
    fontWeight: "800",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  description: {
    color: colors.gray900,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  meta: {
    color: colors.gray700,
    fontWeight: "700",
    lineHeight: 20,
  },
});
