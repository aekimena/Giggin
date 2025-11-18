import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookService } from "./BookService";
import { BookingDetails } from "./BookingDetails";
import { BookingInView } from "../bottom Tabs/bookings/BookingInView";
import { StatusOrder } from "../bottom Tabs/bookings/StatusOrder";
import { WorkDone } from "../bottom Tabs/bookings/WorkDone";

const Index = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={BookService} name="BookService" />
      <Stack.Screen component={BookingDetails} name="BookingDetails" />
      <Stack.Screen component={BookingInView} name="BookingsInView" />
      <Stack.Screen component={StatusOrder} name="StatusOrder" />
      <Stack.Screen component={WorkDone} name="WorkDone" />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
