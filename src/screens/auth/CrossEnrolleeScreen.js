import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    navigation.navigate("SignIn");
  }

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell contentStyle={styles.content}>
        <BrandPanel
          campusKey={homeCampusKey}
          eyebrow="Step 2"
          title="Cross-enrollee?"
          subtitle="Access preference"
        />

        <View style={styles.choiceGrid}>
          <ChoiceCard
            title="No"
            description="Home campus"
            icon="school-outline"
            selected={selection === "no"}
            onPress={() => setSelection("no")}
          />
          <ChoiceCard
            title="Yes"
            description="Switch later"
            icon="swap-horizontal"
            selected={selection === "yes"}
            onPress={() => setSelection("yes")}
          />
        </View>

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
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  choiceGrid: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.xs,
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
