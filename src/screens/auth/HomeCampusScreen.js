import React from "react";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { branchOptions, campusData } from "../../data/campuses";
import { colors, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import BrandPanel from "../../components/common/BrandPanel";
import ScreenShell from "../../components/common/ScreenShell";
import CampusCard from "../../components/auth/CampusCard";

export default function HomeCampusScreen({ navigation }) {
  const { homeCampusKey, setHomeCampusKey, setActiveCampusKey, setIsCrossEnrollee } = useAppData();

  return (
    <AppScreen>
      <StatusBar style="dark" />
      <ScreenShell>
        <BrandPanel
          campusKey={homeCampusKey}
          eyebrow="Initial Setup"
          title="Select your home campus"
          subtitle="This will be used as your default campus before sign-in."
        />

        <Text style={styles.pageLead}>
          Choose the campus where you are primarily enrolled or assigned.
        </Text>

        {branchOptions.map((option) => {
          const campus = campusData[option.key];

          return (
            <CampusCard
              key={option.key}
              optionKey={option.key}
              title={option.title}
              description={option.description}
              address={campus.address}
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
});
