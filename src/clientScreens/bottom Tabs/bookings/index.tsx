import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookingInView } from "./BookingInView";
import { StatusOrder } from "./StatusOrder";
import { WorkDone } from "./WorkDone";
import { Bookings } from "./Bookings";

const Index = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={Bookings} name="BookingsTab" />
      <Stack.Screen component={BookingInView} name="BookingsInView" />
      <Stack.Screen component={StatusOrder} name="StatusOrder" />
      <Stack.Screen component={WorkDone} name="WorkDone" />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
