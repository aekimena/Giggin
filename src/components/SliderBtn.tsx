import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../utils";

interface Props {
  defaultState: boolean;
  activeBg: string;
  inActiveBg: string;
  innerBg: string;
  onChangeState: (value: boolean) => void;
}

export const SliderBtn = ({
  defaultState,
  activeBg,
  inActiveBg,
  innerBg,
  onChangeState,
}: Props) => {
  const [active, setActive] = useState(defaultState);
  return (
    <Pressable
      onPress={() => {
        setActive(!active);
        onChangeState(!active);
      }}
      style={[
        styles.container,
        {
          backgroundColor: active ? activeBg : inActiveBg,
          alignItems: active ? "flex-end" : "flex-start",
        },
      ]}
    >
      <View style={[styles.circle, { backgroundColor: innerBg }]}></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  container: {
    height: 17,
    width: 30,
    borderRadius: 50,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
});
