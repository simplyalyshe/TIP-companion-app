import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";

const tipMilestones = [
  {
    year: "1962",
    title: "Founded in Quiapo",
    detail:
      "T.I.P. was established on February 8, 1962 by Engr. Demetrio A. Quirino, Jr. and Dr. Teresita U. Quirino.",
  },
  {
    year: "1967",
    title: "Main site expands",
    detail:
      "Its early growth in Quiapo led to a main site at G. Puyat Street as enrollment continued to climb.",
  },
  {
    year: "1981-1983",
    title: "Two-campus footprint",
    detail:
      "T.I.P. Manila expanded through P. Casal and Arlegui, while T.I.P. Quezon City opened in Cubao in 1983.",
  },
  {
    year: "2000s-now",
    title: "Global quality push",
    detail:
      "T.I.P. strengthened its reputation through international accreditation, outcomes-based education, and innovation-led growth.",
  },
  {
    year: "2017+",
    title: "TechnoCoRe era",
    detail:
      "The institution deepened its focus on technopreneurship and collaborative applied research through T.I.P. TechnoCoRe.",
  },
];

const institutionLead =
  "From its Quiapo beginnings to its Manila and Quezon City campuses today, the Technological Institute of the Philippines has grown with a clear focus on engineering, technology, and industry-ready education.";

function formatCampusLines(phone) {
  return (phone || "")
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AboutScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];
  const campusLines = formatCampusLines(branch.phone);

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>About T.I.P.</Text>
          <Text style={styles.heroTitle}>A legacy built for builders, makers, and future engineers.</Text>
          <Text style={styles.heroBody}>{institutionLead}</Text>

          <View style={styles.founderPanel}>
            <Text style={styles.founderLabel}>Founders</Text>
            <Text style={styles.founderNames}>Engr. Demetrio A. Quirino, Jr. and Dr. Teresita U. Quirino</Text>
            <Text style={styles.founderMeta}>Established on February 8, 1962</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.eyebrow}>Historical Snapshot</Text>
              <Text style={styles.title}>Milestones</Text>
            </View>
            <View style={styles.sectionRule} />
          </View>

          <View style={styles.timeline}>
            {tipMilestones.map((item, index) => (
              <View key={item.year} style={[styles.timelineCard, index === tipMilestones.length - 1 && styles.timelineCardLast]}>
                <View style={styles.timelineYearWrap}>
                  <Text style={styles.timelineYear}>{item.year}</Text>
                </View>
                <View style={styles.timelineCopy}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineBody}>{item.detail}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.eyebrow}>Active Campus</Text>
              <Text style={styles.title}>{branch.name}</Text>
            </View>
            <View style={styles.sectionRule} />
          </View>

          <Text style={styles.body}>{branch.about}</Text>

          <View style={styles.campusFeatureCard}>
            <View style={styles.campusFeatureHeader}>
              <View>
                <Text style={styles.campusFeatureEyebrow}>Campus Profile</Text>
                <Text style={styles.campusFeatureTitle}>{branch.name}</Text>
              </View>
              <View style={styles.campusFeaturePill}>
                <Text style={styles.campusFeaturePillText}>{activeCampusKey === "qc" ? "QC" : "MNL"}</Text>
              </View>
            </View>

            <Text style={styles.campusLead}>{branch.subtitle}</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Campus</Text>
                <Text style={[styles.infoValue, styles.infoValueStrong]}>{branch.name}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{branch.address}</Text>
              </View>

              <View style={styles.campusLineBlock}>
                <Text style={styles.campusLineLabel}>Campus Lines</Text>
                <View style={styles.campusLineList}>
                  {campusLines.map((line, index) => (
                    <Text key={line} style={[styles.campusLineValue, index === campusLines.length - 1 && styles.campusLineValueLast]}>
                      {line}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.lg,
    padding: spacing.lg,
    overflow: "hidden",
  },
  section: {
    paddingBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    color: colors.text.inverse,
    fontSize: typography.sizes.title,
    fontWeight: "800",
    lineHeight: 32,
  },
  heroBody: {
    color: "rgba(255,255,255,0.78)",
    fontSize: typography.sizes.body,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  founderPanel: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: borders.hairline,
    borderTopColor: colors.border.inverse,
  },
  founderLabel: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  founderNames: {
    color: colors.text.inverse,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    lineHeight: 22,
  },
  founderMeta: {
    color: "rgba(255,255,255,0.72)",
    fontSize: typography.sizes.meta,
    marginTop: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.section,
    fontWeight: "800",
    color: colors.text.primary,
  },
  sectionRule: {
    width: 72,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.major,
    marginBottom: 4,
  },
  timeline: {
    gap: spacing.sm,
  },
  timelineCard: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    backgroundColor: colors.bg.surface,
  },
  timelineCardLast: {
    marginBottom: 0,
  },
  timelineYearWrap: {
    width: 78,
    alignItems: "flex-start",
  },
  timelineYear: {
    color: colors.text.accent,
    fontSize: typography.sizes.label,
    fontWeight: "800",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  timelineCopy: {
    flex: 1,
  },
  timelineTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  timelineBody: {
    color: colors.text.secondary,
    fontSize: typography.sizes.body,
    lineHeight: 22,
  },
  body: {
    fontSize: typography.sizes.body,
    lineHeight: 23,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  campusFeatureCard: {
    borderRadius: radii.lg,
    borderWidth: borders.soft,
    borderColor: colors.bg.inverse,
    backgroundColor: colors.bg.inverse,
    padding: spacing.md,
    gap: spacing.md,
  },
  campusFeatureHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  campusFeatureEyebrow: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  campusFeatureTitle: {
    color: colors.text.inverse,
    fontSize: typography.sizes.section,
    fontWeight: "800",
    lineHeight: 28,
  },
  campusFeaturePill: {
    backgroundColor: colors.accent.default,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  campusFeaturePillText: {
    color: colors.text.primary,
    fontSize: typography.sizes.micro,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  campusLead: {
    color: "rgba(255,255,255,0.8)",
    fontSize: typography.sizes.body,
    lineHeight: 22,
  },
  infoCard: {
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    borderRadius: radii.md,
    backgroundColor: colors.bg.surface,
    overflow: "hidden",
  },
  infoRow: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  infoLabel: {
    fontSize: typography.sizes.micro,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent.default,
    marginBottom: spacing.sm,
    fontWeight: "700",
  },
  infoValue: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    fontWeight: "600",
    lineHeight: 22,
  },
  infoValueStrong: {
    fontWeight: "800",
  },
  campusLineBlock: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  campusLineLabel: {
    fontSize: typography.sizes.micro,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent.default,
    marginBottom: spacing.sm,
    fontWeight: "700",
  },
  campusLineList: {
    gap: spacing.xs,
  },
  campusLineValue: {
    fontSize: typography.sizes.body,
    color: colors.text.primary,
    fontWeight: "700",
    lineHeight: 22,
  },
  campusLineValueLast: {
    marginBottom: 0,
  },
});
