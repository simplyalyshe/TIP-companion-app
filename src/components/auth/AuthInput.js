import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radii, spacing } from "../../theme";

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
          placeholderTextColor={colors.gray700}
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
    fontSize: 13,
    fontWeight: "800",
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  shell: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    paddingRight: 48,
    fontSize: 15,
    color: colors.ink,
  },
  adornment: {
    position: "absolute",
    right: 14,
  },
});
