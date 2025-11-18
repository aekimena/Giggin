import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import { SeeAllArtisanCategory } from "../../clientScreens/SeeAllArtisanCategory";
import BookingScreens from "../../clientScreens/bookingScreens";
import PaymentScreens from "../../clientScreens/paymentScreens";
import { PhotoInView } from "../../clientScreens/PhotoInView";
import { Chats } from "../../clientScreens/Chats";

const ClientRoute = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={BottomTabs} name="BottomTabs" />
      <Stack.Screen
        component={SeeAllArtisanCategory}
        name="SeeAllArtisansCategory"
      />

      <Stack.Screen component={BookingScreens} name="BookingScreens" />
      <Stack.Screen component={PaymentScreens} name="PaymentScreens" />

      <Stack.Screen component={PhotoInView} name="PhotoInView" />
      <Stack.Screen component={Chats} name="Chats" />
    </Stack.Navigator>
  );
};

export default ClientRoute;

const styles = StyleSheet.create({});
