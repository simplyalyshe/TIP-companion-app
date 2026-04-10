import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { borders, colors, radii, spacing, typography } from "../../theme";

export default function AuthInput(props) {
  const { label, value, onChangeText, placeholder, keyboardType, secureTextEntry, rightAdornment, maxLength, centered = false } = props;

  return (
    <View style={styles.group}>
      {label ? <Text style={[styles.label, centered && styles.labelCentered]}>{label}</Text> : null}
      <View style={styles.shell}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.muted}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          style={[styles.input, centered && styles.inputCentered]}
        />
        {rightAdornment ? <View style={styles.adornment}>{rightAdornment}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginTop: spacing.md,
    width: "100%",
  },
  label: {
    fontSize: typography.sizes.micro,
    fontWeight: "700",
    color: colors.text.muted,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  labelCentered: {
    textAlign: "center",
  },
  shell: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.bg.surface,
    borderWidth: borders.soft,
    borderColor: colors.border.strong,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    paddingRight: 48,
    fontSize: typography.sizes.body,
    color: colors.text.primary,
  },
  inputCentered: {
    textAlign: "center",
  },
  adornment: {
    position: "absolute",
    right: 14,
  },
});
