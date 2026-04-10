import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppData } from "../../context/AppContext";
import { campusData } from "../../data/campuses";
import { borders, colors, radii, spacing, typography } from "../../theme";
import AppScreen from "../../components/common/AppScreen";
import ScreenShell from "../../components/common/ScreenShell";

const HOURS = Array.from({ length: 15 }, (_, index) => index + 7);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const GRID_HOUR_HEIGHT = 44;

export default function ScheduleScreen() {
  const { activeCampusKey } = useAppData();
  const branch = campusData[activeCampusKey];
  const [viewMode, setViewMode] = useState("list");

  const scheduleBlocks = useMemo(
    () =>
      branch.schedule.map((item) => {
        const dayIndex = DAYS.indexOf(item.dayShort);
        const start = item.startHour + item.startMinute / 60;
        const end = item.endHour + item.endMinute / 60;

        return {
          ...item,
          dayIndex,
          top: (start - HOURS[0]) * GRID_HOUR_HEIGHT,
          height: Math.max((end - start) * GRID_HOUR_HEIGHT, 40),
        };
      }),
    [branch.schedule]
  );

  return (
    <AppScreen>
      <ScreenShell>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Schedule</Text>
          <Text style={styles.title}>Weekly Classes</Text>
        </View>

        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>School Calendar</Text>
            <Text style={styles.calendarMeta}>{branch.shortName}</Text>
          </View>
          {branch.academicCalendar.map((item, index) => (
            <View key={`${item.dateLabel}-${item.title}`} style={[styles.calendarRow, index === branch.academicCalendar.length - 1 && styles.calendarRowLast]}>
              <View style={styles.calendarDate}>
                <Text style={styles.calendarDateText}>{item.dateLabel}</Text>
              </View>
              <View style={styles.calendarCopy}>
                <Text style={styles.calendarItemTitle}>{item.title}</Text>
                <Text style={styles.calendarItemMeta}>{item.tag}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.toggleRow}>
          <Pressable onPress={() => setViewMode("list")} style={[styles.toggleButton, viewMode === "list" && styles.toggleButtonActive]}>
            <Text style={[styles.toggleText, viewMode === "list" && styles.toggleTextActive]}>Agenda</Text>
          </Pressable>
          <Pressable onPress={() => setViewMode("grid")} style={[styles.toggleButton, viewMode === "grid" && styles.toggleButtonActive]}>
            <Text style={[styles.toggleText, viewMode === "grid" && styles.toggleTextActive]}>Grid</Text>
          </Pressable>
        </View>

        {viewMode === "list" ? (
          <View style={styles.listWrap}>
            {branch.schedule.map((classItem, index) => (
              <View key={`${classItem.code}-${classItem.day}`} style={[styles.classRow, index === branch.schedule.length - 1 && styles.classRowLast]}>
                <View style={styles.classMain}>
                  <Text style={styles.classCode}>{classItem.code}</Text>
                  <Text style={styles.classSubject}>{classItem.subject}</Text>
                  <Text style={styles.classProfessor}>{classItem.professor}</Text>
                </View>
                <View style={styles.classMeta}>
                  <Text style={styles.classDay}>{classItem.dayShort}</Text>
                  <Text style={styles.classTime}>{classItem.time}</Text>
                  <Text style={styles.classRoom}>{classItem.room}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.gridCard}>
              <View style={styles.gridHeader}>
                <View style={styles.timeColumnHeader} />
                {DAYS.map((day) => (
                  <View key={day} style={styles.dayHeaderCell}>
                    <Text style={styles.dayHeaderText}>{day}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.gridBody}>
                <View style={styles.timeColumn}>
                  {HOURS.map((hour) => (
                    <View key={hour} style={styles.timeLabelWrap}>
                      <Text style={styles.timeLabel}>{`${String(hour).padStart(2, "0")}:00`}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.dayColumns}>
                  {DAYS.map((day) => (
                    <View key={day} style={styles.dayColumn}>
                      {HOURS.map((hour) => (
                        <View key={`${day}-${hour}`} style={styles.hourCell} />
                      ))}
                    </View>
                  ))}

                  {scheduleBlocks.map((item) => (
                    <View key={`${item.code}-${item.day}`} style={[styles.classBlock, { top: item.top, left: `${item.dayIndex * 20}%`, height: item.height }]}>
                      <Text style={styles.blockCode}>{item.code}</Text>
                      <Text style={styles.blockSubject}>{item.subject}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </ScreenShell>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing.sm,
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
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
  toggleRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  calendarSection: {
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    borderRadius: radii.md,
    backgroundColor: colors.bg.surface,
    padding: spacing.md,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  calendarTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.section,
    fontWeight: "800",
  },
  calendarMeta: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  calendarRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  calendarRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  calendarDate: {
    minWidth: 72,
    paddingHorizontal: spacing.sm,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.bg.muted,
    alignItems: "center",
  },
  calendarDateText: {
    color: colors.text.primary,
    fontSize: typography.sizes.micro,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  calendarCopy: {
    flex: 1,
  },
  calendarItemTitle: {
    color: colors.text.primary,
    fontSize: typography.sizes.body,
    fontWeight: "700",
  },
  calendarItemMeta: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    marginTop: 3,
  },
  toggleButton: {
    flex: 1,
    borderRadius: radii.pill,
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    paddingVertical: 11,
    alignItems: "center",
    backgroundColor: colors.bg.surface,
  },
  toggleButtonActive: {
    backgroundColor: colors.bg.inverse,
    borderColor: colors.bg.inverse,
  },
  toggleText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  toggleTextActive: {
    color: colors.text.inverse,
  },
  listWrap: {
    borderTopWidth: borders.hairline,
    borderTopColor: colors.border.soft,
  },
  classRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  classRowLast: {
    paddingBottom: spacing.sm,
  },
  classMain: {
    flex: 1,
  },
  classCode: {
    color: colors.text.accent,
    fontSize: typography.sizes.micro,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  classSubject: {
    color: colors.text.primary,
    fontSize: typography.sizes.body,
    fontWeight: "700",
    marginBottom: 4,
  },
  classProfessor: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    lineHeight: 19,
  },
  classMeta: {
    alignItems: "flex-end",
    gap: 4,
  },
  classDay: {
    color: colors.text.primary,
    fontSize: typography.sizes.meta,
    fontWeight: "700",
  },
  classTime: {
    color: colors.text.secondary,
    fontSize: typography.sizes.meta,
    textAlign: "right",
  },
  classRoom: {
    color: colors.text.muted,
    fontSize: typography.sizes.meta,
    textAlign: "right",
  },
  gridCard: {
    borderWidth: borders.soft,
    borderColor: colors.border.soft,
    borderRadius: radii.md,
    overflow: "hidden",
    minWidth: 640,
    backgroundColor: colors.bg.surface,
  },
  gridHeader: {
    flexDirection: "row",
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
    backgroundColor: colors.bg.muted,
  },
  timeColumnHeader: {
    width: 58,
  },
  dayHeaderCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderLeftWidth: borders.hairline,
    borderLeftColor: colors.border.soft,
  },
  dayHeaderText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  gridBody: {
    flexDirection: "row",
  },
  timeColumn: {
    width: 58,
  },
  timeLabelWrap: {
    height: GRID_HOUR_HEIGHT,
    justifyContent: "flex-start",
    paddingTop: 4,
    paddingHorizontal: 6,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  timeLabel: {
    color: colors.text.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  dayColumns: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    height: GRID_HOUR_HEIGHT * HOURS.length,
  },
  dayColumn: {
    flex: 1,
    borderLeftWidth: borders.hairline,
    borderLeftColor: colors.border.soft,
  },
  hourCell: {
    height: GRID_HOUR_HEIGHT,
    borderBottomWidth: borders.hairline,
    borderBottomColor: colors.border.soft,
  },
  classBlock: {
    position: "absolute",
    width: "20%",
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: colors.bg.inverse,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent.default,
  },
  blockCode: {
    color: colors.accent.default,
    fontWeight: "800",
    fontSize: 10,
  },
  blockSubject: {
    color: colors.text.inverse,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },
});
