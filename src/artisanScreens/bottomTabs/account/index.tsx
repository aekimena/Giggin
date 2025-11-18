import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Account } from "./Account";
import { Badge } from "./Badge";
import { BadgePayment } from "./BadgePayment";
import { ActiveSuscriber } from "./ActiveSuscriber";
import { EditProfile } from "./EditProfile";
import { Gallery } from "./Gallery";
import { Verification } from "./Verification";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";

const Index = () => {
  const Stack = createNativeStackNavigator();
  const user: UserDataProps = useSelector(selectUserData);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Account} name="Account" />
      {user.artisanSuscribed && (
        <>
          <Stack.Screen component={ActiveSuscriber} name="Suscription" />
        </>
      )}
      {!user.artisanSuscribed && (
        <>
          <Stack.Screen component={Badge} name="Suscription" />
          <Stack.Screen component={BadgePayment} name="BadgePayment" />
        </>
      )}
      <Stack.Screen component={EditProfile} name="EditProfile" />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
