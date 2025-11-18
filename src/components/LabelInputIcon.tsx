import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, generalStyles } from "../utils";

interface LabelInputIconProps {
  placeholder: string;
  label?: string;
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  secureTextEntry?: boolean;
  onLeftIconPress?: any;
  onRightIconPress?: any;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  defaultValue?: string;
  errorText?: string;
  showErrorText?: boolean;
  onChangeText?: (value: string) => void;
}
const LabelInputIcon = ({
  placeholder,
  label,
  showRightIcon,
  showLeftIcon,
  rightIcon,
  leftIcon,
  secureTextEntry,
  onLeftIconPress,
  onRightIconPress,
  keyboardType,
  disabled,
  defaultValue,
  errorText,
  showErrorText,
  onChangeText,
}: LabelInputIconProps) => {
  return (
    <View style={{ gap: 3 }}>
      {label && (
        <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
          {label}
        </Text>
      )}
      <View style={styles.textinputCont}>
        {showLeftIcon && <Ionicons name={leftIcon} color={"#888"} size={17} />}
        <TextInput
          style={styles.textinput}
          placeholder={placeholder}
          placeholderTextColor={"#999"}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || "default"}
          editable={!disabled}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
        />
        {showRightIcon && (
          <Pressable onPress={onRightIconPress}>
            <Ionicons name={rightIcon} color={"#888"} size={17} />
          </Pressable>
        )}
      </View>
      {showErrorText && (
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { color: colors.primaryRed400 },
          ]}
        >
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default LabelInputIcon;

const styles = StyleSheet.create({
  textinputCont: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  textinput: {
    height: "100%",
    flex: 1,
    marginHorizontal: 5,
    color: "#444",
    fontFamily: "Poppins400",
  },
});
