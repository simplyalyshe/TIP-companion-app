import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import HeroBanner from "../../components/common/HeroBanner";
import ScreenShell from "../../components/common/ScreenShell";

const quickLinkIcons = {
  Canvas: "monitor-dashboard",
  Library: "bookshelf",
  Scholarships: "school-outline",
  "Student Services": "account-group-outline",
  "Career Center": "briefcase-outline",
  FAQs: "help-circle-outline",
  Enrollment: "clipboard-text-outline",
};

const quickLinkLabels = {
  Scholarships: "Grants",
};

export default function HomeScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];
  const todayClass = branch.schedule[0];
  const leadActions = branch.quickLinks.slice(0, 3);
  const supportActions = branch.quickLinks.slice(3).filter((item) => item !== "Student Services");

  return (
    <AppScreen>
      <ScreenShell>
        <HeroBanner branch={branch} />

        <View style={styles.actionRail}>
          <View style={styles.actionRailHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>Quick Actions</Text>
              <Text style={styles.sectionTitle}>Student Services</Text>
            </View>
            <View style={styles.sectionRule} />
          </View>

          <View style={styles.leadActionRow}>
            {leadActions.map((item) => (
              <Pressable key={item} style={styles.leadActionCard}>
                <View style={styles.leadActionTop}>
                  <MaterialCommunityIcons name={quickLinkIcons[item] || "arrow-top-right"} size={22} color={colors.accent.strong} />
                  <MaterialCommunityIcons name="arrow-top-right" size={18} color={colors.text.muted} />
                </View>
                <Text style={styles.leadActionText} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.82}>
                  {quickLinkLabels[item] || item}
                </Text>
              </Pressable>
            ))}
          </View>

          {supportActions.length ? (
            <View style={styles.supportActionRow}>
              {supportActions.map((item) => (
                <Pressable key={item} style={styles.supportActionChip}>
                  <Text style={styles.supportActionText}>{quickLinkLabels[item] || item}</Text>
                  <MaterialCommunityIcons name="arrow-top-right" size={15} color={colors.text.secondary} />
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.scheduleStrip}>
          <View style={styles.scheduleRail} />
          <View style={styles.scheduleMain}>
            <Text style={styles.sectionEyebrowInverse}>Next Class</Text>
            <Text style={styles.scheduleCode}>{todayClass.code}</Text>
            <Text style={styles.scheduleSubject}>{todayClass.subject}</Text>
            <Text style={styles.scheduleProfessor}>{todayClass.professor}</Text>
          </View>
          <View style={styles.scheduleMetaWrap}>
            <Text style={styles.scheduleMeta}>{todayClass.dayShort}</Text>
            <Text style={styles.scheduleMeta}>{todayClass.time}</Text>
            <Text style={styles.scheduleRoom}>{todayClass.room}</Text>
          </View>
        </View>

        <View style={styles.secondarySection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionEyebrow}>Campus Bulletin</Text>
              <Text style={styles.sectionTitle}>Announcements</Text>
            </View>
            <Text style={styles.sectionHeaderMeta}>Official</Text>
          </View>
          {branch.announcements.map((notice, index) => (
            <View key={notice.title} style={[styles.noticeRow, index === branch.announcements.length - 1 && styles.noticeRowLast]}>
              <View style={styles.noticeAccent} />
              <View style={styles.noticeCopy}>
                <Text style={styles.noticeTitle}>{notice.title}</Text>
                <Text style={styles.noticeBody}>{notice.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  primarySection: {
    gap: spacing.sm,
  },
  actionRail: {
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  actionRailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.md,
  },
  sectionEyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
  sectionRule: {
    width: 72,
    height: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.major,
    marginBottom: 4,
  },
  leadActionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  leadActionCard: {
    flex: 1,
    minHeight: 108,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    padding: spacing.md,
    justifyContent: "space-between",
    backgroundColor: colors.bg.surface,
  },
  leadActionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leadActionText: {
    color: colors.text.primary,
    fontWeight: "700",
    fontSize: typography.sizes.cardTitle,
    lineHeight: 18,
  },
  supportActionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  supportActionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.bg.muted,
  },
  supportActionText: {
    color: colors.text.primary,
    fontSize: typography.sizes.meta,
    fontWeight: "700",
  },
  scheduleStrip: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.md,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    position: "relative",
    overflow: "hidden",
  },
  scheduleRail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: colors.signature.major,
  },
  scheduleMain: {
    flex: 1,
    paddingLeft: spacing.sm,
  },
  sectionEyebrowInverse: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  scheduleCode: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  scheduleSubject: {
    color: colors.text.inverse,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  scheduleProfessor: {
    color: "rgba(255,255,255,0.74)",
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  scheduleMetaWrap: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  scheduleMeta: {
    color: colors.text.inverse,
    fontSize: typography.sizes.meta,
    fontWeight: "700",
  },
  scheduleRoom: {
    color: "rgba(255,255,255,0.72)",
    fontSize: typography.sizes.meta,
  },
  secondarySection: {
    paddingBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  sectionHeaderMeta: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  noticeRow: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.bg.surface,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    marginBottom: spacing.sm,
  },
  noticeRowLast: {
    marginBottom: 0,
  },
  noticeAccent: {
    width: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.major,
  },
  noticeCopy: {
    flex: 1,
  },
  noticeTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.cardTitle,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  noticeBody: {
    color: colors.text.secondary,
    fontSize: typography.sizes.body,
    lineHeight: 22,
  },
});
