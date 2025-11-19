import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const insets = useSafeAreaInsets();
  return <View style={{ marginBottom: insets.bottom + 5 }}>{children}</View>;
};

const styles = StyleSheet.create({});
