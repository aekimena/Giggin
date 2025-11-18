import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EnterEmail } from "./EnterEmail";
import { EnterCode } from "./EnterCode";
import { NewPassword } from "./NewPassword";
import { Successful } from "./Successful";

const ForgotPassword = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={EnterEmail} name="EnterEmail" />
      <Stack.Screen component={EnterCode} name="EnterCode" />
      <Stack.Screen component={NewPassword} name="NewPassword" />
      <Stack.Screen component={Successful} name="Successful" />
    </Stack.Navigator>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
