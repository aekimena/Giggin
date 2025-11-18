import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Bookings } from "./Bookings";

const Index = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Bookings} name="Bookings" />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
