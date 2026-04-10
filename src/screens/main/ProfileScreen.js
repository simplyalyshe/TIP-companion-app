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
          <Text style={styles.eyebrow}>Profile</Text>

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

          <View style={styles.identityFooter}>
            <View style={styles.identityBadge}>
              <MaterialCommunityIcons name="account-school-outline" size={16} color={colors.text.primary} />
              <Text style={styles.identityBadgeText}>{isCrossEnrollee ? "Cross-enrollee access" : "Home campus access"}</Text>
            </View>
            <Text style={styles.identityNote}>Student record and campus access</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.title}>Student Record</Text>
          <DetailRow label="Student ID" value={studentId || profile.studentId} emphasize />
          <DetailRow label="Program" value={profile.program} />
          <DetailRow label="Year Level" value={profile.yearLevel} />
          <DetailRow label="Email" value={profile.email} isLast />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.title}>Campus Access</Text>
          <DetailRow label="Home Campus" value={homeCampus.name} />
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
  identityCard: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent.default,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  identityTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarHalo: {
    width: 94,
    height: 94,
    borderRadius: radii.pill,
    backgroundColor: "rgba(242,194,48,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarShell: {
    width: 76,
    height: 76,
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
  identityFooter: {
    gap: spacing.sm,
  },
  identityBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.accent.default,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  identityBadgeText: {
    color: colors.text.primary,
    fontSize: typography.sizes.meta,
    fontWeight: "800",
  },
  identityNote: {
    color: "rgba(255,255,255,0.72)",
    fontSize: typography.sizes.meta,
  },
  sectionCard: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.md,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    padding: spacing.md,
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
