import { colors } from "../theme";

export const MOCK_OTP_CODE = "111111";

export function getCampusTheme(key) {
  if (key === "manila") {
    return {
      accent: "#D0A01A",
      panel: colors.bg.inverse,
      surface: colors.bg.surface,
      label: "Manila",
    };
  }

  return {
    accent: colors.accent.default,
    panel: colors.bg.inverse,
    surface: colors.bg.surface,
    label: "Quezon City",
  };
}

export function maskContact(studentId) {
  return `s***${(studentId || "00").slice(-2)}@tip.edu.ph`;
}
