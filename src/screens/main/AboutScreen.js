import React from "react";
import { StyleSheet, Text } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";
import DetailRow from "../../components/common/DetailRow";

export default function AboutScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <SectionCard title="About T.I.P.">
          <Text style={styles.bodyText}>
            Technological Institute of the Philippines is a private higher education institution
            focused on engineering, technology, architecture, business, and the arts. It operates
            campuses in Manila and Quezon City.
          </Text>
          <Text style={[styles.bodyText, styles.spacedText]}>{branch.about}</Text>
        </SectionCard>

        <SectionCard title="Campus Details" compact>
          <DetailRow label="Campus" value={branch.name} />
          <DetailRow label="Address" value={branch.address} />
          <DetailRow label="Campus Line" value={branch.phone} isLast />
        </SectionCard>

        <SectionCard title="Brand Story">
          <Text style={styles.bodyText}>
            The interface keeps T.I.P.'s black, gray, and yellow character, but applies it through
            cleaner panels, focused accents, and a more professional student-facing layout.
          </Text>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
  spacedText: {
    marginTop: spacing.md,
  },
});
