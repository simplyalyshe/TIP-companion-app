import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, radii, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import HeroBanner from "../../components/common/HeroBanner";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";

export default function HomeScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <HeroBanner branch={branch} />

        <SectionCard title="Quick Links">
          <View style={styles.chipRow}>
            {branch.quickLinks.map((item) => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Announcements">
          {branch.announcements.map((notice, index) => (
            <View
              key={notice.title}
              style={[styles.listBlock, index === branch.announcements.length - 1 && styles.listBlockLast]}
            >
              <Text style={styles.noticeTitle}>{notice.title}</Text>
              <Text style={styles.bodyText}>{notice.detail}</Text>
            </View>
          ))}
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: "#fff4bf",
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipText: {
    color: colors.ink,
    fontWeight: "800",
  },
  listBlock: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  listBlockLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
});
