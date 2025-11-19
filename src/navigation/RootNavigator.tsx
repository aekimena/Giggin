import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenNames } from "./routes";
import AuthNavigator from "./AuthNavigator";
import { useSelector } from "react-redux";
// import { selectUserData } from "../storeServices/reducers/userReducer";
import ClientNavigator from "./client";
import ArtisanNavigator from "./artisan";
import { selectUserData } from "../redux/features/UserData";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const user = useSelector(selectUserData); // use token or user data to determine auth status
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user && (
        <Stack.Screen name={screenNames.auth} component={AuthNavigator} />
      )}

      {user && user?.accountType === "client" && (
        <Stack.Screen name={screenNames.client} component={ClientNavigator} />
      )}
      {user && user?.accountType === "artisan" && (
        <Stack.Screen name={screenNames.artisan} component={ArtisanNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
