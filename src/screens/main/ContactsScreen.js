import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { colors, spacing } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";
import SectionCard from "../../components/common/SectionCard";

export default function ContactsScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  return (
    <AppScreen>
      <ScreenShell>
        <SectionCard title="Important Contacts">
          {branch.contacts.map((contact, index) => (
            <View
              key={contact.label}
              style={[styles.contactRow, index === branch.contacts.length - 1 && styles.contactRowLast]}
            >
              <MaterialCommunityIcons name="phone-outline" size={22} color={colors.primaryDark} />
              <View style={styles.contactTextWrap}>
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.bodyText}>{contact.value}</Text>
              </View>
            </View>
          ))}
        </SectionCard>

        <SectionCard title="Emergency Reminder">
          <Text style={styles.bodyText}>
            In an urgent situation, contact campus security immediately and proceed to the nearest
            student services or clinic area for assistance.
          </Text>
        </SectionCard>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  contactRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  contactTextWrap: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.gray900,
  },
});
