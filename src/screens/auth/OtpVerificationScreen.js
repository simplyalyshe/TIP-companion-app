import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import { maskContact, MOCK_OTP_CODE } from "../../utils/auth";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";
import AuthInput from "../../components/auth/AuthInput";

export default function OtpVerificationScreen({ navigation }) {
  const { activeCampusKey, studentId } = useAppData();
  const branch = campusData[activeCampusKey] || campusData.qc;
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [statusText, setStatusText] = useState("Verification code sent");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  function onOtpChange(value) {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
    if (error) {
      setError("");
    }
  }

  function handleVerify() {
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    if (otp !== MOCK_OTP_CODE) {
      setError("The verification code is incorrect. Use 246810 to continue.");
      return;
    }

    setError("");
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
    }, 900);
  }

  function handleResend() {
    if (countdown > 0) {
      return;
    }

    setCountdown(30);
    setOtp("");
    setError("");
    setStatusText("A fresh code is on its way");
  }

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell>
        <BrandPanel
          campusKey={activeCampusKey}
          eyebrow="Two-Factor Verification"
          title="Enter your OTP"
          subtitle={`A verification code was sent to ${maskContact(studentId)}.`}
        />

        <SectionCard title="Verify your sign-in">
          <Text style={styles.bodyText}>
            This extra step protects access to {branch.shortName}. Use{" "}
            <Text style={styles.inlineStrong}>{MOCK_OTP_CODE}</Text> to continue.
          </Text>

          <AuthInput
            label="Verification Code"
            placeholder="Enter the 6-digit OTP"
            value={otp}
            onChangeText={onOtpChange}
            keyboardType="number-pad"
            maxLength={6}
          />

          <View style={styles.otpRow}>
            <Text style={styles.otpText}>{statusText}</Text>
            <Text style={styles.otpTimer}>
              {countdown > 0 ? `Resend in ${countdown}s` : "You can resend now"}
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            onPress={handleVerify}
            disabled={isVerifying}
            style={[styles.primaryButton, isVerifying && styles.buttonDisabled]}
          >
            <Text style={styles.primaryButtonText}>
              {isVerifying ? "Verifying..." : "Verify and continue"}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleResend}
            disabled={countdown > 0}
            style={[styles.secondaryButton, countdown > 0 && styles.secondaryButtonDisabled]}
          >
            <Text style={styles.secondaryButtonText}>Resend code</Text>
          </Pressable>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
  inlineStrong: {
    fontWeight: "800",
    color: colors.ink,
  },
  otpRow: {
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  otpText: {
    color: colors.gray900,
    fontSize: 13,
    fontWeight: "700",
  },
  otpTimer: {
    color: colors.gray700,
    fontSize: 13,
    fontWeight: "700",
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
  secondaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  secondaryButtonDisabled: {
    opacity: 0.55,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontWeight: "800",
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
