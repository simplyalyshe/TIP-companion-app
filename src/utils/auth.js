import { colors } from "../theme";

export const MOCK_OTP_CODE = "246810";

export function getCampusTheme(key) {
  return key === "manila"
    ? { accent: "#ffe177", surface: "#fff8de", panel: "#242424", label: "Manila Access" }
    : { accent: colors.primary, surface: "#fff7d6", panel: "#1d1d1d", label: "Quezon City Access" };
}

export function maskContact(studentId) {
  return `s***${(studentId || "00").slice(-2)}@tip.edu.ph`;
}
