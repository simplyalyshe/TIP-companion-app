import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import DetailRow from "../../components/common/DetailRow";

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
  const profile = campusData[homeCampusKey].studentProfile;

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
        <View style={styles.identitySection}>
          <Text style={styles.eyebrow}>Profile</Text>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.meta}>{campusData[homeCampusKey].name}</Text>
          <Text style={styles.status}>Student record and campus access</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Student Record</Text>
          <DetailRow label="Student ID" value={studentId || profile.studentId} emphasize />
          <DetailRow label="Program" value={profile.program} />
          <DetailRow label="Year Level" value={profile.yearLevel} />
          <DetailRow label="Email" value={profile.email} isLast />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Campus Access</Text>
          <DetailRow label="Home Campus" value={campusData[homeCampusKey].name} />
          <DetailRow label="Current Campus" value={branch.name} />
          <DetailRow label="Cross-Enrollee Status" value={isCrossEnrollee ? "Enabled" : "Home campus only"} isLast />
        </View>

        <View style={styles.actionsSection}>
          {isCrossEnrollee ? (
            <Pressable onPress={switchCampus} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Switch Campus</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={signOut} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign Out</Text>
          </Pressable>
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  identitySection: {
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
  name: {
    color: colors.text.primary,
    fontSize: typography.sizes.title,
    fontWeight: "800",
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.sizes.body,
    marginTop: spacing.xs,
  },
  status: {
    color: colors.text.muted,
    fontSize: typography.sizes.meta,
    marginTop: spacing.xs,
  },
  section: {
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  title: {
    fontSize: typography.sizes.section,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  actionsSection: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  secondaryButton: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    paddingVertical: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
  primaryButton: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
});
