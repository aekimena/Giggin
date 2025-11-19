import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../authScreens/Onboarding";
import Login from "../authScreens/Login";
import SignUp from "../authScreens/SignUp";
import PhoneVerification from "../authScreens/PhoneVerification";
import Congratulations from "../authScreens/Congratulations";
import ForgotPassword from "../authScreens/forgotPassword";

import { useSelector } from "react-redux";
import { selectSplashSeen } from "../redux/features/authReducer";
import { screenNames } from "./routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const spalshSeen = useSelector(selectSplashSeen);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      {/* {!spalshSeen && (
        <Stack.Screen component={Onboarding} name={screenNames.onboarding} />
      )} */}
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={SignUp} name="SignUp" />

      <Stack.Screen component={PhoneVerification} name="PhoneVerification" />
      <Stack.Screen component={Congratulations} name="Congratulations" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
