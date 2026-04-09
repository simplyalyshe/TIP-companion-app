import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radii, shadows, spacing } from "../../theme";

export default function ChoiceCard({ title, description, icon, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.cardSelected]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={selected ? colors.ink : colors.primaryDark}
        />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialCommunityIcons
        name={selected ? "radiobox-marked" : "radiobox-blank"}
        size={22}
        color={selected ? colors.primaryDark : colors.gray700}
      />
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
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    ...shadows.card,
  },
  cardSelected: {
    borderColor: colors.primaryDark,
    backgroundColor: "#fff8e0",
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#fff4bf",
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  description: {
    color: colors.gray900,
    fontSize: 14,
    lineHeight: 21,
  },
});
