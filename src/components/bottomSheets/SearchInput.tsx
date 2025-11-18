import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../../utils";

type KeyboardType = "default" | "number-pad";

interface Props {
  placeholder: string;
  keyboardType?: KeyboardType;
  onChangeText: any;
  defaultValue?: string;
}

export const SearchInput = ({
  placeholder,
  keyboardType,
  onChangeText,
  defaultValue,
}: Props) => {
  return (
    <TextInput
      style={[generalStyles.poppins400_fs14, styles.textinput]}
      placeholder={placeholder}
      placeholderTextColor={colors.acentGrey400}
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  textinput: {
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.acentGrey400,
    width: "100%",
    paddingHorizontal: 10,
    color: colors.black,
  },
});
