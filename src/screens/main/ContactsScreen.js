import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";

export default function ContactsScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];

  function getContactIcon(type) {
    return type === "email" ? "email-outline" : "phone-outline";
  }

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.section}>
          <Text style={styles.eyebrow}>Contacts</Text>
          <Text style={styles.title}>Office Directory</Text>
          {branch.contacts.map((contact, index) => (
            <View key={`${contact.label}-${contact.value}`} style={[styles.contactRow, index === branch.contacts.length - 1 && styles.contactRowLast]}>
              <MaterialCommunityIcons name={getContactIcon(contact.type)} size={18} color={colors.accent.strong} style={styles.contactIcon} />
              <View style={styles.contactTextWrap}>
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Emergency Guidance</Text>
          <Text style={styles.body}>For urgent concerns, contact campus security immediately or proceed to the nearest clinic for on-site assistance.</Text>
        </View>
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingBottom: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  eyebrow: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.section,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: spacing.sm + 2,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  contactRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  contactIcon: {
    marginTop: 2,
  },
  contactTextWrap: {
    flex: 1,
  },
  contactLabel: {
    fontSize: typography.sizes.meta,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: typography.sizes.meta,
    lineHeight: 20,
    color: colors.text.secondary,
  },
  body: {
    fontSize: typography.sizes.body,
    lineHeight: 22,
    color: colors.text.secondary,
  },
});
