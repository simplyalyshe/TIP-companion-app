import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { branchOptions } from "../../data/campuses";
import { colors, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import CampusCard from "../../components/auth/CampusCard";

export default function HomeCampusScreen({ navigation }) {
  const { homeCampusKey, setHomeCampusKey, setActiveCampusKey, setIsCrossEnrollee } = useAppData();

  return (
    <AppScreen backgroundColor={colors.bg.app}>
      <StatusBar style="dark" />
      <ScreenShell backgroundColor={colors.bg.app} contentStyle={styles.content}>
        <BrandPanel
          campusKey={homeCampusKey}
          eyebrow="Step 1"
          title="Choose campus"
        />

        <View style={styles.cardGrid}>
          {branchOptions.map((option) => {
            return (
              <CampusCard
                key={option.key}
                optionKey={option.key}
                title={option.title}
                selected={homeCampusKey === option.key}
                onPress={() => {
                  setHomeCampusKey(option.key);
                  setActiveCampusKey(option.key);
                  setIsCrossEnrollee(false);
                  navigation.navigate("CrossEnrollee");
                }}
              />
            );
          })}
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardGrid: {
    gap: spacing.md,
  },
});
