import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, signature, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";

function getBuildingStyle(tone) {
  if (tone === "dark") {
    return { backgroundColor: colors.bg.inverse, borderColor: colors.bg.inverse };
  }

  if (tone === "accent") {
    return { backgroundColor: colors.accent.default, borderColor: colors.accent.strong };
  }

  return { backgroundColor: colors.bg.surface, borderColor: colors.border.strong };
}

function getBuildingTextStyle(tone) {
  return tone === "dark"
    ? { color: colors.text.inverse }
    : { color: colors.text.primary };
}

export default function CampusMapScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];
  const map = branch.mapMockup;

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
            <View>
              <Text style={styles.siteCardLabel}>Illustrative Site Card</Text>
              <Text style={styles.siteCardTitle}>{branch.name}</Text>
            </View>
            <View style={styles.orientationChip}>
              <Text style={styles.orientationText}>{map.orientation}</Text>
            </View>
          </View>

          <View style={styles.mapCanvas}>
            <View style={styles.canvasFrame} />
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
              >
                <Text style={styles.roadLabel}>{road.label}</Text>
              </View>
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
                  getBuildingStyle(building.tone),
                  {
                    top: building.top,
                    left: building.left,
                    width: building.width,
                    height: building.height,
                    transform: [{ rotate: `${building.angle}deg` }],
                  },
                ]}
              >
                <View style={styles.buildingTopRow}>
                  <Text style={styles.buildingNumber}>{building.number}</Text>
                  <Text style={[styles.buildingShort, getBuildingTextStyle(building.tone)]}>{building.short}</Text>
                </View>
                <Text style={[styles.buildingLabel, getBuildingTextStyle(building.tone)]}>{building.label}</Text>
              </View>
            ))}

            {map.nodes.map((node) => (
              <View key={node.key} style={[styles.node, { top: node.top, left: node.left }]}>
                <View style={styles.nodeDot} />
                <Text style={styles.nodeLabel}>{node.label}</Text>
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
              <Text style={styles.legendIndex}>{building.number}</Text>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
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
  orientationChip: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
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
    height: 390,
    margin: spacing.md,
    marginTop: spacing.sm,
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
  road: {
    position: "absolute",
    borderRadius: radii.pill,
    backgroundColor: "#D6D1C2",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  roadLabel: {
    color: "#6B665A",
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  path: {
    position: "absolute",
    borderRadius: radii.pill,
    backgroundColor: "rgba(242,194,48,0.65)",
  },
  building: {
    position: "absolute",
    borderWidth: borders.soft,
    borderRadius: radii.md,
    padding: spacing.sm,
    justifyContent: "space-between",
  },
  buildingPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
  },
  buildingTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  buildingNumber: {
    width: 24,
    height: 24,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    color: colors.text.primary,
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "800",
    fontSize: typography.sizes.micro,
  },
  buildingShort: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  buildingLabel: {
    fontWeight: "700",
    fontSize: typography.sizes.micro,
    lineHeight: 16,
  },
  node: {
    position: "absolute",
    alignItems: "center",
    gap: 4,
  },
  nodeDot: {
    width: 10,
    height: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.rail,
    borderWidth: 2,
    borderColor: colors.white,
  },
  nodeLabel: {
    color: "#5C584E",
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
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
    paddingVertical: spacing.sm,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  legendRowLast: {
    borderBottomWidth: 0,
  },
  legendIndex: {
    width: 28,
    color: colors.text.accent,
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
