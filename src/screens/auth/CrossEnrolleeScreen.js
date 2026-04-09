import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing, typography } from "../../theme";
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
          title="Cross-enrollee access"
          subtitle={`Home campus on file: ${branch.name}.`}
        />

        <Text style={styles.pageLead}>
          Confirm whether you need access to another campus during this session.
        </Text>

        <ChoiceCard
          title="Use my home campus"
          description="Continue directly with your default campus access."
          icon="school-outline"
          selected={selection === "no"}
          onPress={() => setSelection("no")}
        />
        <ChoiceCard
          title="I am cross-enrolled"
          description="Choose another campus for this session and allow switching later."
          icon="swap-horizontal"
          selected={selection === "yes"}
          onPress={() => setSelection("yes")}
        />

        <Pressable
          onPress={handleContinue}
          disabled={!selection}
          style={[styles.primaryButton, !selection && styles.buttonDisabled]}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  pageLead: {
    fontSize: typography.sizes.body,
    lineHeight: 22,
    color: colors.text.secondary,
    marginTop: -spacing.sm,
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
  buttonDisabled: {
    opacity: 0.45,
  },
});
