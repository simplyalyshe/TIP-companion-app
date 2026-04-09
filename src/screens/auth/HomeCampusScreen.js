import React from "react";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAppData } from "../../context/AppContext";
import { branchOptions, campusData } from "../../data/campuses";
import { colors } from "../../theme";
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
          eyebrow="Welcome"
          title="Choose your home campus"
          subtitle="We will use this as your default T.I.P. access point before sign-in."
        />

        <Text style={styles.pageTitle}>Campus setup</Text>
        <Text style={styles.pageLead}>
          Pick the campus you are primarily enrolled in. Cross-enrollees can choose a different
          access campus in the next step.
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
});
