import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import DetailRow from "../../components/common/DetailRow";

export default function AboutScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.section}>
          <Text style={styles.eyebrow}>About T.I.P.</Text>
          <Text style={styles.title}>Institution Overview</Text>
          <Text style={styles.body}>{branch.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Campus Information</Text>
          <DetailRow label="Campus" value={branch.name} emphasize />
          <DetailRow label="Address" value={branch.address} />
          <DetailRow label="Campus Line" value={branch.phone} isLast />
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  eyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.section,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.sizes.body,
    lineHeight: 23,
    color: colors.text.secondary,
  },
});
