import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";

interface Props {
  placeholder: string;
  onPress?: any;
  disabled?: boolean;
  autoFocus?: boolean;
  onChangeText?: (value: string) => void;
}

export const FindClientArtisan = ({
  placeholder,
  onPress,
  disabled,
  autoFocus,
  onChangeText,
}: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <IonIcons name="search" color={colors.acentGrey300} size={20} />
      <TextInput
        style={[
          generalStyles.poppins400_fs14,
          {
            height: "100%",
            color: colors.black,
            // paddingTop: 3,
            flex: 1,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.acentGrey300}
        editable={!disabled}
        autoFocus={autoFocus || false}
        onChangeText={onChangeText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.whiteBg,
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 15,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
  },
});
