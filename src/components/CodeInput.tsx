import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, generalStyles } from "../utils";

interface CodeInputProps {
  fields: number;
  onFieldsComplete: (value: string) => void;
}

const CodeInput = ({ fields, onFieldsComplete }: CodeInputProps) => {
  const [fieldsTxt, setFieldsTxt] = useState([]);
  const textInputArray = Array.from({ length: fields }, (_, index) => index);
  const focusRef = useRef([]);
  const [focusField, setFocusField] = useState(0);

  function onInputChange(text, index) {
    if (fieldsTxt.length !== fields) {
      const updatedFieldsTxt = [...fieldsTxt];
      updatedFieldsTxt[index] = text;
      setFieldsTxt(updatedFieldsTxt);

      if (index < fields - 1) {
        setFocusField(index + 1); // Move focus to the next input
      } else {
        // When all inputs are filled, blur the last input
        focusRef.current[index].blur();
      }
    }
  }
  useEffect(() => {
    if (fieldsTxt.length !== fields) {
      focusRef.current[focusField].focus();
    }
  }, [focusField]);

  useEffect(() => {
    if (fieldsTxt.length == fields) {
      onFieldsComplete(fieldsTxt.join(""));
    }
  }, [fieldsTxt]);
  return (
    <View style={styles.textInputsCont}>
      {textInputArray.map((_, index) => (
        <TextInput
          ref={(ref) => (focusRef.current[index] = ref)}
          editable={index === focusField && fieldsTxt.length !== fields}
          style={[
            generalStyles.poppins500_fs20,
            styles.textInput,
            {
              borderColor:
                focusField == index && fieldsTxt.length !== fields
                  ? colors.primaryRed400
                  : "rgba(0,0,0,0.3)",
            },
          ]}
          cursorColor={colors.primaryRed400}
          key={index}
          keyboardType="number-pad"
          onChangeText={(text) => onInputChange(text, index)}
          maxLength={1}
        />
      ))}
    </View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({
  textInputsCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.8,
    textAlign: "center",
    color: colors.black,
  },
});
