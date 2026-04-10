import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, signature, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";

function getBuildingStyle() {
  return { backgroundColor: colors.gray100, borderColor: colors.border.strong };
}

function getGreeneryPatches(activeCampusKey) {
  if (activeCampusKey === "manila") {
    return [
      { key: "g1", top: "14%", left: "66%", width: 72, height: 38, rotate: "18deg" },
      { key: "g2", top: "48%", left: "8%", width: 64, height: 34, rotate: "-14deg" },
      { key: "g3", top: "74%", left: "68%", width: 84, height: 40, rotate: "10deg" },
    ];
  }

  return [
    { key: "g1", top: "16%", left: "12%", width: 88, height: 40, rotate: "-12deg" },
    { key: "g2", top: "46%", left: "70%", width: 72, height: 34, rotate: "15deg" },
    { key: "g3", top: "76%", left: "18%", width: 96, height: 42, rotate: "8deg" },
  ];
}

export default function CampusMapScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];
  const map = branch.mapMockup;
  const greeneryPatches = getGreeneryPatches(activeCampusKey);

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Wayfinding</Text>
          <Text style={styles.title}>Campus Map</Text>
          <View style={styles.titleRule} />
          <Text style={styles.subtitle}>{map.district}</Text>
          <Text style={styles.meta}>{branch.address}</Text>
        </View>

        <View style={styles.siteCard}>
          <View style={styles.siteCardHeader}>
            <View style={styles.siteCardHeaderCopy}>
              <Text style={styles.siteCardLabel}>Illustrative Site Card</Text>
              <Text style={styles.siteCardTitle}>{branch.name}</Text>
              <Text style={styles.siteCardMeta}>{map.district}</Text>
            </View>
            <View style={styles.orientationChip}>
              <Text style={styles.orientationText}>{map.orientation}</Text>
            </View>
          </View>

          <View style={styles.mapCanvas}>
            <View style={styles.canvasFrame} />
            {greeneryPatches.map((patch) => (
              <View
                key={patch.key}
                style={[
                  styles.greeneryPatch,
                  {
                    top: patch.top,
                    left: patch.left,
                    width: patch.width,
                    height: patch.height,
                    transform: [{ rotate: patch.rotate }],
                  },
                ]}
              />
            ))}
            {map.roads.map((road) => (
              <View
                key={road.key}
                style={[
                  styles.road,
                  {
                    top: road.top,
                    left: road.left,
                    width: road.width,
                    height: road.height,
                    transform: [{ rotate: `${road.angle}deg` }],
                  },
                ]}
              />
            ))}

            {map.paths.map((path) => (
              <View
                key={path.key}
                style={[
                  styles.path,
                  {
                    top: path.top,
                    left: path.left,
                    width: path.width,
                    height: path.height,
                    transform: [{ rotate: `${path.angle}deg` }],
                  },
                ]}
              />
            ))}

            {map.buildings.map((building) => (
              <View
                key={building.key}
                style={[
                  styles.building,
                  building.shape === "pill" && styles.buildingPill,
                  getBuildingStyle(),
                  {
                    top: building.top,
                    left: building.left,
                    width: building.width,
                    height: building.height,
                    transform: [{ rotate: `${building.angle}deg` }],
                  },
                ]}
              >
                <View style={styles.buildingCode}>
                  <View style={styles.buildingNumberBadge}>
                    <Text style={styles.buildingNumber}>{building.number}</Text>
                  </View>
                  <Text style={styles.buildingShort}>{building.short}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.legendSection}>
          <View style={styles.legendHeader}>
            <Text style={styles.legendTitle}>Landmarks</Text>
            <Text style={styles.legendMeta}>Numbered to match map</Text>
          </View>
          {map.buildings.map((building, index) => (
            <View key={building.key} style={[styles.legendRow, index === map.buildings.length - 1 && styles.legendRowLast]}>
              <View style={styles.legendIndexBadge}>
                <Text style={styles.legendIndex}>{building.number}</Text>
              </View>
              <View style={styles.legendCopy}>
                <Text style={styles.legendName}>{building.label}</Text>
                <Text style={styles.legendShort}>{building.short}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
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
    color: colors.text.primary,
    fontSize: typography.sizes.title,
    fontWeight: "800",
  },
  titleRule: {
    width: 84,
    height: signature.majorRuleHeight,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.major,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.body,
    fontWeight: "700",
  },
  meta: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
  },
  siteCard: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  siteCardHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md + 2,
    paddingBottom: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  siteCardHeaderCopy: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  siteCardLabel: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  siteCardTitle: {
    color: colors.text.inverse,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
  siteCardMeta: {
    color: "rgba(255,255,255,0.68)",
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  orientationChip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 7,
    borderRadius: radii.pill,
  },
  orientationText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  mapCanvas: {
    position: "relative",
    height: 372,
    margin: spacing.md,
    marginTop: spacing.sm + 2,
    backgroundColor: "#F3EFE3",
    borderRadius: radii.md,
    overflow: "hidden",
  },
  canvasFrame: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: borders.soft,
    borderColor: "rgba(13,13,13,0.12)",
    borderRadius: radii.md,
  },
  greeneryPatch: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(178, 212, 182, 0.55)",
  },
  road: {
    position: "absolute",
    borderRadius: radii.pill,
    backgroundColor: "#D6D1C2",
    opacity: 0.9,
  },
  path: {
    position: "absolute",
    borderRadius: radii.pill,
    backgroundColor: "#E3DED0",
  },
  building: {
    position: "absolute",
    borderWidth: borders.soft,
    borderRadius: radii.xs,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  buildingPill: {
    borderRadius: radii.xs,
    paddingHorizontal: 0,
  },
  buildingCode: {
    borderRadius: radii.pill,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
  buildingNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    alignItems: "center",
    justifyContent: "center",
  },
  buildingNumber: {
    color: colors.text.primary,
    fontWeight: "800",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "center",
  },
  buildingShort: {
    color: colors.text.primary,
    fontWeight: "800",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  legendSection: {
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  legendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  legendTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
  legendMeta: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  legendRowLast: {
    borderBottomWidth: 0,
  },
  legendIndexBadge: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    backgroundColor: colors.accent.default,
    borderWidth: borders.soft,
    borderColor: colors.accent.default,
    alignItems: "center",
    justifyContent: "center",
  },
  legendIndex: {
    color: colors.text.primary,
    fontSize: typography.sizes.meta,
    fontWeight: "800",
  },
  legendCopy: {
    flex: 1,
  },
  legendName: {
    color: colors.text.primary,
    fontSize: typography.sizes.body,
    fontWeight: "700",
  },
  legendShort: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    marginTop: 2,
  },
});
