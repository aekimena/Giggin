import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export const ScreenLayout = ({
  children,
  backgroundColor,
  translucent = true,
  statusBarBackgroundColor = "transparent",
}: {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  translucent?: boolean;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor || colors.background,
      }}
    >
      <StatusBar
        translucent={translucent}
        backgroundColor={statusBarBackgroundColor || "transparent"}
        // barStyle="dark-content"
        style="dark"
        animated
      />
      {/* <View style={{ paddingTop:  StatusBar?.currentHeight || 20 }} /> */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});
