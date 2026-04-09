import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, layout, spacing } from "../../theme";

export default function ScreenShell({ children, contentStyle }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: spacing.xl + insets.bottom },
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
    paddingTop: spacing.md,
    backgroundColor: colors.bg.app,
  },
  inner: {
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    gap: spacing.lg,
  },
});
