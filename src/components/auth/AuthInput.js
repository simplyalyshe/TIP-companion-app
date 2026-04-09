import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function AuthInput(props) {
  const { label, value, onChangeText, placeholder, keyboardType, secureTextEntry, rightAdornment, maxLength } = props;

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.shell}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          style={styles.input}
        />
        {rightAdornment ? <View style={styles.adornment}>{rightAdornment}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: spacing.md,
  },
  label: {
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    color: colors.text.muted,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  shell: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.bg.surface,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    paddingRight: 48,
    fontSize: typography.sizes.body,
    color: colors.text.primary,
  },
  adornment: {
    position: "absolute",
    right: 14,
  },
});
