import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import { maskContact, MOCK_OTP_CODE } from "../../utils/auth";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import AuthInput from "../../components/auth/AuthInput";

export default function SignInScreen({ navigation }) {
  const { activeCampusKey, setStudentId } = useAppData();
  const branch = campusData[activeCampusKey] || campusData.qc;
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  React.useEffect(() => {
    if (!otpVisible || countdown <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpVisible, countdown]);

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
    setOtpVisible(true);
    setCountdown(30);
    setOtp("");
    setOtpError("");
  }

  function onOtpChange(value) {
    setOtp(value.replace(/\D/g, "").slice(0, 6));
    if (otpError) {
      setOtpError("");
    }
  }

  function handleVerifyOtp() {
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Enter the 6-digit code.");
      return;
    }

    if (otp !== MOCK_OTP_CODE) {
      setOtpError("Incorrect verification code.");
      return;
    }

    setOtpError("");
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpVisible(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    }, 700);
  }

  function handleResend() {
    if (countdown > 0) {
      return;
    }

    setCountdown(30);
    setOtp("");
    setOtpError("");
  }

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell contentStyle={styles.content}>
        <BrandPanel
          campusKey={activeCampusKey}
          eyebrow="Step 3"
          title="Sign in"
          subtitle={branch.name}
        >
          <View style={styles.portalMetaRow}>
            <Text style={styles.portalMeta}>{branch.shortName} Student Portal</Text>
          </View>
        </BrandPanel>

        <View style={styles.formSection}>
          <AuthInput
            label=""
            placeholder="6-digit ID"
            value={studentNumber}
            onChangeText={onStudentChange}
            keyboardType="number-pad"
            maxLength={6}
            centered
          />

          <AuthInput
            label=""
            placeholder="Password"
            value={password}
            onChangeText={onPasswordChange}
            secureTextEntry={!showPassword}
            centered
            rightAdornment={
              <Pressable onPress={() => setShowPassword((value) => !value)}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.text.muted}
                />
              </Pressable>
            }
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable onPress={handleSubmit} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Enter</Text>
          </Pressable>
        </View>
      </ScreenShell>

      <Modal transparent animationType="fade" visible={otpVisible} onRequestClose={() => setOtpVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>Verification</Text>
            <Text style={styles.modalTitle}>Enter code</Text>
            <Text style={styles.modalText}>{maskContact(studentNumber)}</Text>

            <AuthInput
              label=""
              placeholder="6-digit code"
              value={otp}
              onChangeText={onOtpChange}
              keyboardType="number-pad"
              maxLength={6}
              centered
            />

            <View style={styles.otpMetaRow}>
              <Text style={styles.otpMetaText}>Sent to your T.I.P. email</Text>
              <Text style={styles.otpMetaText}>{countdown > 0 ? `Resend in ${countdown}s` : "Resend available"}</Text>
            </View>

            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

            <Pressable onPress={handleVerifyOtp} disabled={isVerifying} style={[styles.primaryButton, isVerifying && styles.buttonDisabled]}>
              <Text style={styles.primaryButtonText}>{isVerifying ? "Verifying" : "Verify"}</Text>
            </Pressable>

            <Pressable onPress={handleResend} style={styles.secondaryButton}>
              <Text style={[styles.secondaryButtonText, countdown > 0 && styles.secondaryButtonTextDisabled]}>Resend code</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  portalMetaRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
  },
  portalMeta: {
    color: colors.text.secondary,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  formSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  errorText: {
    color: colors.status.error,
    marginTop: spacing.sm,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: colors.bg.inverse,
    borderRadius: radii.pill,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontWeight: "700",
    fontSize: typography.sizes.body,
  },
  secondaryButton: {
    alignItems: "center",
    marginTop: spacing.md,
    paddingVertical: spacing.xs,
  },
  secondaryButtonText: {
    color: colors.text.accent,
    fontWeight: "700",
    fontSize: typography.sizes.meta,
  },
  secondaryButtonTextDisabled: {
    color: colors.text.muted,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.32)",
    justifyContent: "center",
    padding: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.bg.surface,
    borderRadius: radii.lg,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    padding: spacing.lg,
  },
  modalEyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
    fontWeight: "700",
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
    textAlign: "center",
  },
  modalText: {
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontSize: typography.sizes.body,
    textAlign: "center",
  },
  otpMetaRow: {
    marginTop: spacing.md,
    gap: 3,
    alignItems: "center",
  },
  otpMetaText: {
    color: colors.text.muted,
    fontSize: typography.sizes.meta,
  },
});
