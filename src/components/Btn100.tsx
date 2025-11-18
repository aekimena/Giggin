import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { generalStyles } from "../utils";

interface Btn100Props {
  bg?: string;
  text: string;
  textCol?: string;
  pressFunc: any;
  disabled?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  leftComponent?: any;
}

export const Btn100: React.FC<Btn100Props> = ({
  bg,
  text,
  textCol,
  pressFunc,
  disabled,
  rounded,
  outlined,
  leftComponent,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={pressFunc}
      activeOpacity={0.8}
      style={[
        styles.btn,
        {
          backgroundColor: outlined ? "transparent" : bg,
          borderRadius: rounded ? 50 : 5,
          borderColor: outlined ? textCol : null,
          borderWidth: outlined ? 0.8 : 0,
        },
      ]}
    >
      {leftComponent && leftComponent}
      <Text
        style={[generalStyles.poppins500_fs16, { color: textCol || "#fff" }]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
});
