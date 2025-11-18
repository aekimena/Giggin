import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoute } from "./AuthRoute";
import ClientRoute from "./client";
import ArtisanRoute from "./artisan";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/features/UserData";

const index = () => {
  const Stack = createNativeStackNavigator();
  // check if a user's data is stored in redux state
  // const userExists = useSelector(
  //   (state: any) => state.UserData.userData !== null
  // );
  const userExists = useSelector(selectUserData) !== null;
  const user: UserDataProps = useSelector(
    (state: any) => state.UserData.userData
  );
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userExists && <Stack.Screen component={AuthRoute} name="AuthRoute" />}
      {userExists && (
        <>
          {user.accountType == "client" && (
            <Stack.Screen component={ClientRoute} name="Main" />
          )}
          {user.accountType == "artisan" && (
            <Stack.Screen component={ArtisanRoute} name="Main" />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default index;

const styles = StyleSheet.create({});
