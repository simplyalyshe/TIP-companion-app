import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import ChoiceCard from "../../components/auth/ChoiceCard";

export default function CrossEnrolleeScreen({ navigation }) {
  const { homeCampusKey, setIsCrossEnrollee, setActiveCampusKey } = useAppData();
  const [selection, setSelection] = useState("");
  const branch = campusData[homeCampusKey] || campusData.qc;

  function handleContinue() {
    const isCross = selection === "yes";
    setIsCrossEnrollee(isCross);
    setActiveCampusKey(homeCampusKey);
    navigation.navigate(isCross ? "SessionCampus" : "SignIn");
  }

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell>
        <BrandPanel
          campusKey={homeCampusKey}
          eyebrow="Access Check"
          title="Are you a cross-enrolee?"
          subtitle={`Your home campus is set to ${branch.name}.`}
        />

        <Text style={styles.pageTitle}>Campus access preference</Text>
        <Text style={styles.pageLead}>
          Let us know whether you need access to another campus for this session.
        </Text>

        <ChoiceCard
          title="No, I will use my home campus"
          description="You will sign in directly to your default campus and campus switching will stay locked."
          icon="school-outline"
          selected={selection === "no"}
          onPress={() => setSelection("no")}
        />
        <ChoiceCard
          title="Yes, I am cross-enrolled"
          description="You can pick the campus to access now and switch campuses later from your profile."
          icon="swap-horizontal"
          selected={selection === "yes"}
          onPress={() => setSelection("yes")}
        />

        <Pressable
          onPress={handleContinue}
          disabled={!selection}
          style={[styles.primaryButton, !selection && styles.buttonDisabled]}
        >
          <Text style={styles.primaryButtonText}>Continue to sign-in</Text>
        </Pressable>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.ink,
  },
  pageLead: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.gray900,
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
  buttonDisabled: {
    opacity: 0.6,
  },
});
