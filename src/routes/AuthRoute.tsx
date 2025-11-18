import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../authScreens/Onboarding";
import Login from "../authScreens/Login";
import SignUp from "../authScreens/SignUp";
import PhoneVerification from "../authScreens/PhoneVerification";
import Congratulations from "../authScreens/Congratulations";
import ForgotPassword from "../authScreens/forgotPassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../utils";

export const AuthRoute = () => {
  const [loading, setLoading] = useState(true);
  const [onboardingSeen, setOnboarding] = useState("");

  async function checkOnboarding() {
    try {
      const value = await AsyncStorage.getItem("onboarding-seen");
      setOnboarding(value);
      setLoading(false);
    } catch (e) {
      console.log("error getting value");
    }
  }

  useEffect(() => {
    checkOnboarding();
  }, []);
  const Stack = createNativeStackNavigator();
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.acentGrey50 }}>
        <StatusBar
          translucent
          backgroundColor={colors.acentGrey50}
          barStyle="dark-content"
        />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      {onboardingSeen !== "true" && (
        <Stack.Screen component={Onboarding} name="Onboarding" />
      )}
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={SignUp} name="SignUp" />

      <Stack.Screen component={PhoneVerification} name="PhoneVerification" />
      <Stack.Screen component={Congratulations} name="Congratulations" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
