import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { branchOptions, campusData } from "../../data/campuses";
import { colors, radii, spacing, typography } from "../../theme";
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
          eyebrow="Session Access"
          title="Choose the campus for this session"
          subtitle={`Home campus remains ${homeCampus.name}.`}
        />

        <Text style={styles.pageLead}>
          Select which campus workspace should open after sign-in.
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
                  ? "Use your registered home campus for this session."
                  : "Open the alternate campus under cross-enrollee access."
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
});
