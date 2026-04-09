import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { branchOptions, campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import CampusCard from "../../components/auth/CampusCard";

export default function SessionCampusScreen({ navigation }) {
  const { homeCampusKey, activeCampusKey, setActiveCampusKey } = useAppData();
  const homeCampus = campusData[homeCampusKey] || campusData.qc;

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell>
        <BrandPanel
          campusKey={activeCampusKey}
          eyebrow="Cross-Enrollee Access"
          title="Choose the campus for this session"
          subtitle="Only cross-enrollees can switch this later from the profile tab."
        />

        <Text style={styles.pageTitle}>Current access campus</Text>
        <Text style={styles.pageLead}>
          Your home campus remains <Text style={styles.inlineStrong}>{homeCampus.name}</Text>. Pick
          the campus you want this session to open with.
        </Text>

        {branchOptions.map((option) => {
          const campus = campusData[option.key];

          return (
            <CampusCard
              key={option.key}
              optionKey={option.key}
              title={option.title}
              description={
                option.key === homeCampusKey
                  ? "Use your home campus for this session."
                  : "Access the other campus as a cross-enrollee."
              }
              address={campus.address}
              selected={activeCampusKey === option.key}
              onPress={() => setActiveCampusKey(option.key)}
            />
          );
        })}

        <Pressable onPress={() => navigation.navigate("SignIn")} style={styles.primaryButton}>
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
  inlineStrong: {
    fontWeight: "800",
    color: colors.ink,
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
