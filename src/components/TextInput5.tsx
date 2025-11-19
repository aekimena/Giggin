import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { globalStyles } from "../constants/styles";

interface Props {
  placeholder: string;
  leftIcon: string;
  onChangeText: (value: string) => void;
  textInputContstyle?: ViewStyle;
}

export const TextInput5 = ({
  placeholder,
  leftIcon,
  onChangeText,
  textInputContstyle,
}: Props) => {
  return (
    <View style={[styles.container, textInputContstyle]}>
      <IonIcons name={leftIcon} size={17} color={colors.acentGrey400} />
      <TextInput
        style={[
          generalStyles.poppins500_fs14,
          {
            flex: 1,
            height: "100%",
            color: colors.acentGrey600,

            paddingTop: 2, // without this, the text and the icon dont align
            // backgroundColor: "red",
          },
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={colors.acentGrey300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "center",
    ...globalStyles.flexRow,
    height: 45,
    width: "100%",
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    paddingHorizontal: 15,
    gap: 7,
    overflow: "hidden",
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
  },
});
