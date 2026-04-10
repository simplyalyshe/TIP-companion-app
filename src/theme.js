const brand = {
  gold: "#F2C230",
  goldDeep: "#C69812",
  black: "#0D0D0D",
  charcoal: "#191919",
  white: "#FFFFFF",
  gray900: "#232323",
  gray700: "#525252",
  gray500: "#7A7A7A",
  gray300: "#D7D7D7",
  gray200: "#E8E8E8",
  gray100: "#F4F4F4",
  success: "#2E7D32",
  error: "#B3261E",
};

export const colors = {
  brand,
  bg: {
    app: brand.white,
    surface: brand.white,
    muted: brand.gray100,
    inverse: brand.black,
    auth: "#F6F1E6",
    authSurface: "#FFF9F0",
    authMuted: "#F2E8D3",
  },
  text: {
    primary: brand.black,
    secondary: brand.gray700,
    muted: brand.gray500,
    inverse: brand.white,
    accent: brand.goldDeep,
  },
  border: {
    soft: brand.gray200,
    strong: brand.gray300,
    inverse: "rgba(255,255,255,0.16)",
    auth: "#E3D2A6",
  },
  accent: {
    default: brand.gold,
    strong: brand.goldDeep,
  },
  signature: {
    major: brand.gold,
    minor: "#E4B224",
    rail: "#D6A31A",
  },
  status: {
    success: brand.success,
    error: brand.error,
  },
  primary: brand.gold,
  primaryDark: brand.goldDeep,
  ink: brand.black,
  charcoal: brand.charcoal,
  shell: brand.black,
  gray900: brand.gray900,
  gray700: brand.gray700,
  gray500: brand.gray500,
  gray400: brand.gray300,
  gray300: brand.gray300,
  gray100: brand.gray100,
  gray050: brand.white,
  paper: brand.white,
  white: brand.white,
  success: brand.success,
  error: brand.error,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  xxl: 40,
};

export const radii = {
  xs: 6,
  sm: 10,
  md: 12,
  lg: 16,
  pill: 999,
};

export const borders = {
  hairline: 1,
  soft: 1,
  strong: 1.5,
};

export const signature = {
  majorRuleHeight: 4,
  minorRuleHeight: 2,
  railWidth: 6,
  headerBandHeight: 28,
};

export const typography = {
  displayFamily: "System",
  bodyFamily: "System",
  labelFamily: "System",
  sizes: {
    hero: 30,
    title: 24,
    section: 18,
    cardTitle: 16,
    body: 15,
    meta: 13,
    label: 12,
    micro: 11,
  },
};

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  panel: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const layout = {
  maxContentWidth: 720,
};
