import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, shadows, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";

export default function CampusMapScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.mapPanel}>
          <Text style={styles.mapTitle}>{branch.name} Campus Guide</Text>
          <Text style={styles.mapSubtitle}>{branch.address}</Text>
          <View style={styles.mapCanvas}>
            {branch.mapHighlights.map((spot, index) => (
              <View key={spot} style={styles.mapRow}>
                <View style={styles.mapPin}>
                  <Text style={styles.mapPinText}>{index + 1}</Text>
                </View>
                <Text style={styles.mapSpotText}>{spot}</Text>
              </View>
            ))}
          </View>
        </View>

        <SectionCard title="Navigation Tips">
          <Text style={styles.bodyText}>
            Use the numbered guide above as a simple static map legend. It helps students locate
            major academic spaces, service areas, and activity zones in the selected campus.
          </Text>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  mapPanel: {
    backgroundColor: "#fffaf0",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: "#f0deb0",
    padding: spacing.lg,
    ...shadows.card,
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.ink,
  },
  mapSubtitle: {
    color: colors.gray700,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  mapCanvas: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: "#f2e8c5",
    padding: spacing.md,
    gap: spacing.sm,
  },
  mapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  mapPin: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPinText: {
    color: colors.ink,
    fontWeight: "900",
  },
  mapSpotText: {
    flex: 1,
    color: colors.gray900,
    fontWeight: "700",
    lineHeight: 21,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
});
