import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, shadows, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";
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
  const profile = branch.studentProfile;

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
  }

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name.slice(0, 2).toUpperCase()}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileBranch}>{branch.name}</Text>
        </View>

        <SectionCard title="Student Information" compact>
          <DetailRow label="Student ID" value={studentId || profile.studentId} />
          <DetailRow label="Program" value={profile.program} />
          <DetailRow label="Year Level" value={profile.yearLevel} />
          <DetailRow label="Email" value={profile.email} isLast />
        </SectionCard>

        <SectionCard title="Access Settings" compact>
          <DetailRow label="Home Campus" value={campusData[homeCampusKey].name} />
          <DetailRow label="Current Campus" value={branch.name} />
          <DetailRow
            label="Cross-Enrollee Status"
            value={isCrossEnrollee ? "Enabled" : "Home campus only"}
            isLast
          />
        </SectionCard>

        <SectionCard title="Actions">
          {isCrossEnrollee ? (
            <Pressable onPress={switchCampus} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Switch Campus</Text>
            </Pressable>
          ) : null}
          <Pressable onPress={signOut} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sign Out</Text>
          </Pressable>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: colors.ink,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: "center",
    ...shadows.card,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900",
  },
  profileName: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  profileBranch: {
    color: "#d6d6d6",
    fontSize: 15,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 15,
  },
});
