import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MakePayment } from "./MakePayment";
import { ConfirmCashPayment } from "./ConfirmCashPayment";
import { ConfirmCashPayment2 } from "./ConfirmCashPayment2";
import { RateArtisan } from "./RateArtisan";

const Index = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={MakePayment} name="MakePayment" />
      <Stack.Screen component={ConfirmCashPayment} name="ConfirmCashPayment" />
      <Stack.Screen
        component={ConfirmCashPayment2}
        name="ConfirmCashPayment2"
      />
      <Stack.Screen component={RateArtisan} name="RateArtisan" />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
