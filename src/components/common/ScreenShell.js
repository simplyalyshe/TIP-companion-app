import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, layout, spacing } from "../../theme";

const topSpacingMap = {
  tight: spacing.xs,
  default: spacing.sm,
  relaxed: spacing.md - 2,
};

export default function ScreenShell({
  children,
  contentStyle,
  backgroundColor = colors.bg.app,
  topSpacing = "relaxed",
}) {
  const insets = useSafeAreaInsets();
  const resolvedTopSpacing = topSpacingMap[topSpacing] ?? topSpacingMap.relaxed;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingTop: resolvedTopSpacing },
        { paddingBottom: spacing.xl + insets.bottom + spacing.sm },
        { backgroundColor },
        contentStyle,
      ]}
    >
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.md,
  },
  inner: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    gap: spacing.lg,
  },
});
