import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import ChoiceCard from "../../components/auth/ChoiceCard";

export default function CrossEnrolleeScreen({ navigation }) {
  const { homeCampusKey, setIsCrossEnrollee, setActiveCampusKey } = useAppData();
  const [selection, setSelection] = useState("");

  function handleContinue() {
    const isCross = selection === "yes";
    setIsCrossEnrollee(isCross);
    setActiveCampusKey(homeCampusKey);
    navigation.navigate("SignIn");
  }

  return (
    <AppScreen backgroundColor={colors.bg.app}>
      <StatusBar style="dark" />
      <ScreenShell backgroundColor={colors.bg.app} contentStyle={styles.content}>
        <BrandPanel
          campusKey={homeCampusKey}
          eyebrow="Step 2"
          title="Are you a cross-enrollee?"
        />

        <View style={styles.choiceGrid}>
          <ChoiceCard
            title="Yes"
            selected={selection === "yes"}
            onPress={() => setSelection("yes")}
            style={styles.choiceCard}
          />
          <ChoiceCard
            title="No"
            selected={selection === "no"}
            onPress={() => setSelection("no")}
            style={styles.choiceCard}
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
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
  },
  choiceCard: {
    flex: 1,
    width: undefined,
    maxWidth: 160,
  },
  primaryButton: {
    backgroundColor: colors.accent.default,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.xs,
  },
  primaryButtonText: {
    color: colors.text.primary,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
});
