import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";

interface Props {
  placeholder?: string;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  defaultValue?: string;
}

export const TextInput6 = ({
  placeholder,
  label,
  onChangeText,
  defaultValue,
  keyboardType,
}: Props) => {
  return (
    <View style={{ gap: 7 }}>
      <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
        {label}
      </Text>
      <TextInput
        style={[
          generalStyles.poppins400_fs14,
          {
            height: 40,
            width: "100%",
            paddingHorizontal: 15,
            color: colors.acentGrey500,
            backgroundColor: colors.whiteBg,
            borderRadius: 5,
            borderWidth: 0.8,
            borderColor: colors.acentGrey200,
          },
        ]}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholderTextColor={colors.acentGrey400}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
