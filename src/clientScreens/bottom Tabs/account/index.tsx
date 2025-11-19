import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Account } from "./Account";
import { PaymentHistory } from "./PaymentHistory";
import { Receipt } from "./Receipt";
import { Profile } from "./Profile";
import { Privacy } from "./Privacy";
import { Verification } from "./Verification";
import { Verification2 } from "./Verification2";
import { Verification3 } from "./Verification3";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import { CVerify2 } from "./companyVerify/CVerify2";
import { CVerify3 } from "./companyVerify/CVerify3";
import { CVerify4 } from "./companyVerify/CVerify4";
import { SupportWebview } from "./Webview";

const Index = () => {
  const Stack = createNativeStackNavigator();
  const user: UserDataProps = useSelector(selectUserData);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={Account} name="AccountScreen" />
      {/* <Stack.Screen component={PaymentHistory} name="PaymentHistory" />
      <Stack.Screen component={Receipt} name="Receipt" />
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen component={Privacy} name="Privacy" />
      <Stack.Screen component={Verification} name="Verification" />
      {user.clientType == "individual" && (
        <>
          <Stack.Screen component={Verification2} name="Verification2" />
          <Stack.Screen component={Verification3} name="Verification3" />
        </>
      )}
      {user.clientType == "company" && (
        <>
          <Stack.Screen component={CVerify2} name="Verification2" />
          <Stack.Screen component={CVerify3} name="Verification3" />
          <Stack.Screen component={CVerify4} name="Verification4" />
        </>
      )}
      <Stack.Screen component={SupportWebview} name="Webview" /> */}
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
