import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import DetailRow from "../../components/common/DetailRow";

function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function ProfileScreen({ navigation }) {
  const {
    homeCampusKey,
    activeCampusKey,
    setHomeCampusKey,
    setActiveCampusKey,
    isCrossEnrollee,
    setIsCrossEnrollee,
    studentId,
    setStudentId,
  } = useAppData();
  const branch = campusData[activeCampusKey];
  const homeCampus = campusData[homeCampusKey];
  const profile = homeCampus.studentProfile;
  const avatarInitials = getInitials(profile.name);
  const resolvedStudentId = studentId || profile.studentId;
  const accessLabel = isCrossEnrollee ? "Cross-enrollee access" : "Home campus access";

  function signOut() {
    setStudentId("");
    setIsCrossEnrollee(false);
    setHomeCampusKey("qc");
    setActiveCampusKey("qc");
    navigation.getParent()?.reset({ index: 0, routes: [{ name: "HomeCampus" }] });
  }

  function switchCampus() {
    if (!isCrossEnrollee) {
      return;
    }

    setActiveCampusKey(activeCampusKey === "qc" ? "manila" : "qc");
    navigation.navigate("Home");
  }

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.identityCard}>
          <View style={styles.identityHeader}>
            <Text style={styles.eyebrow}>Profile</Text>
            <View style={styles.identityRule} />
          </View>

          <View style={styles.identityTop}>
            <View style={styles.avatarHalo}>
              <View style={styles.avatarShell}>
                <Text style={styles.avatarInitials}>{avatarInitials}</Text>
              </View>
            </View>

            <View style={styles.identityCopy}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.meta}>{profile.program}</Text>
              <Text style={styles.metaSub}>{homeCampus.name}</Text>
            </View>
          </View>

          <View style={styles.factGrid}>
            <View style={styles.factCard}>
              <Text style={[styles.factLabel, styles.factLabelAccent]}>Student ID</Text>
              <Text style={styles.factValue}>{resolvedStudentId}</Text>
            </View>
            <View style={styles.factCard}>
              <Text style={[styles.factLabel, styles.factLabelAccent]}>Year Level</Text>
              <Text style={styles.factValue}>{profile.yearLevel}</Text>
            </View>
            <View style={styles.factCardWide}>
              <Text style={[styles.factLabel, styles.factLabelAccent]}>Access Mode</Text>
              <Text style={styles.factValue}>{accessLabel}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>Student Record</Text>
              <Text style={styles.title}>Academic Identity</Text>
            </View>
            <MaterialCommunityIcons name="card-account-details-outline" size={20} color={colors.accent.strong} />
          </View>

          <DetailRow label="Student ID" value={resolvedStudentId} emphasize variant="highlight" />
          <DetailRow label="Program" value={profile.program} />
          <DetailRow label="Year Level" value={profile.yearLevel} />
          <DetailRow label="Email" value={profile.email} isLast />
        </View>

        <View style={styles.utilityCard}>
          <Text style={styles.utilityLabel}>Session Control</Text>
          <Text style={styles.utilityBody}>Use sign out when you need to clear this device and return to campus selection.</Text>
          {isCrossEnrollee ? (
            <Pressable onPress={switchCampus} style={styles.secondaryButton}>
              <MaterialCommunityIcons name="swap-horizontal" size={18} color={colors.text.primary} />
              <Text style={styles.secondaryButtonText}>Switch Campus</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={signOut} style={styles.primaryButton}>
            <MaterialCommunityIcons name="logout" size={18} color={colors.text.inverse} />
            <Text style={styles.primaryButtonText}>Sign Out</Text>
          </Pressable>
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  identityCard: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  identityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  identityRule: {
    flex: 1,
    height: 3,
    maxWidth: 88,
    borderRadius: radii.pill,
    backgroundColor: colors.signature.major,
  },
  identityTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarHalo: {
    width: 98,
    height: 98,
    borderRadius: radii.pill,
    backgroundColor: "rgba(242,194,48,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarShell: {
    width: 78,
    height: 78,
    borderRadius: radii.pill,
    backgroundColor: colors.bg.surface,
    borderWidth: 3,
    borderColor: colors.accent.default,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
    letterSpacing: 1,
  },
  identityCopy: {
    flex: 1,
  },
  name: {
    color: colors.text.inverse,
    fontSize: typography.sizes.title,
    fontWeight: "800",
    lineHeight: 32,
  },
  meta: {
    color: colors.accent.default,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  metaSub: {
    color: "rgba(255,255,255,0.74)",
    fontSize: typography.sizes.meta,
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  factGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  factCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: radii.md,
    borderWidth: borders.hairline,
    borderColor: colors.border.inverse,
    padding: spacing.sm + 2,
  },
  factCardWide: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: radii.md,
    borderWidth: borders.hairline,
    borderColor: colors.border.inverse,
    padding: spacing.sm + 2,
  },
  factLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.9,
    marginBottom: spacing.xs,
  },
  factLabelAccent: {
    color: colors.accent.default,
  },
  factValue: {
    color: colors.text.inverse,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    lineHeight: 21,
  },
  sectionCard: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    padding: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionEyebrow: {
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
  },
  secondaryButton: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
  utilityCard: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    padding: spacing.md,
    gap: spacing.sm,
  },
  utilityLabel: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  utilityBody: {
    color: colors.text.secondary,
    fontSize: typography.sizes.body,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
});
