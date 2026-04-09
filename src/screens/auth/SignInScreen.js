import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";
import AuthInput from "../../components/auth/AuthInput";

export default function SignInScreen({ navigation }) {
  const { activeCampusKey, setStudentId } = useAppData();
  const branch = campusData[activeCampusKey] || campusData.qc;
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function onStudentChange(value) {
    setStudentNumber(value.replace(/\D/g, "").slice(0, 6));
    if (error) {
      setError("");
    }
  }

  function onPasswordChange(value) {
    setPassword(value);
    if (error) {
      setError("");
    }
  }

  function handleSubmit() {
    if (!studentNumber || !password.trim()) {
      setError("Enter your 6-digit student ID and password to continue.");
      return;
    }

    if (!/^\d{6}$/.test(studentNumber)) {
      setError("Student ID must be exactly 6 digits.");
      return;
    }

    setStudentId(studentNumber);
    navigation.navigate("OtpVerification");
  }

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell>
        <BrandPanel
          campusKey={activeCampusKey}
          eyebrow="Secure Sign-In"
          title="Student access"
          subtitle={`You are signing in to ${branch.name}.`}
        >
          <View style={styles.campusChip}>
            <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color={colors.ink} />
            <Text style={styles.campusChipText}>{branch.shortName}</Text>
          </View>
        </BrandPanel>

        <SectionCard title="Sign in">
          <Text style={styles.bodyText}>
            Continue with your student credentials to verify your campus access.
          </Text>

          <AuthInput
            label="Student ID"
            placeholder="Enter your 6-digit student ID"
            value={studentNumber}
            onChangeText={onStudentChange}
            keyboardType="number-pad"
            maxLength={6}
          />

          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry={!showPassword}
            rightAdornment={
              <Pressable onPress={() => setShowPassword((value) => !value)}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.gray700}
                />
              </Pressable>
            }
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable onPress={handleSubmit} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continue</Text>
          </Pressable>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  campusChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  campusChipText: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.sm,
    fontWeight: "700",
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
