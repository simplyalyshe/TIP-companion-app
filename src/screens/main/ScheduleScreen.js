import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";

export default function ScheduleScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <SectionCard title="Weekly Class Schedule">
          {branch.schedule.map((classItem) => (
            <View key={`${classItem.code}-${classItem.day}`} style={styles.card}>
              <View style={styles.topRow}>
                <Text style={styles.code}>{classItem.code}</Text>
                <Text style={styles.day}>{classItem.day}</Text>
              </View>
              <Text style={styles.subject}>{classItem.subject}</Text>
              <Text style={styles.bodyText}>{classItem.time}</Text>
              <Text style={styles.roomText}>{classItem.room}</Text>
            </View>
          ))}
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.gray300,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: "#fcfcfc",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  code: {
    fontWeight: "900",
    color: colors.ink,
    fontSize: 16,
  },
  day: {
    color: colors.primaryDark,
    fontWeight: "800",
  },
  subject: {
    color: colors.gray900,
    fontWeight: "800",
    marginBottom: spacing.xs,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
  roomText: {
    marginTop: spacing.xs,
    color: colors.gray700,
    fontWeight: "700",
  },
});
