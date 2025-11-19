import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Pending } from "./topTabs/Pending";
import { Completed } from "./topTabs/Completed";
import { Cancelled } from "./topTabs/Cancelled";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { colors, generalStyles } from "../../../utils";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";

export const Bookings = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <ScreenLayout>
      <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
        <DashboardHeader title={"Bookings"} />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: { backgroundColor: colors.primaryRed400 },
          tabBarPressColor: "rgba(0,0,0,0.07)",
          swipeEnabled: false,
        }}
      >
        <Tab.Screen name="Pending" component={Pending} key={"pending"} />
        <Tab.Screen name="Completed" component={Completed} key={"completed"} />
        <Tab.Screen name="Cancelled" component={Cancelled} key={"cancelled"} />
      </Tab.Navigator>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
  },
  tabBarLabel: {
    ...generalStyles.poppins500_fs16,
    color: colors.black,
    textTransform: "none",
  },
  tabBar: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 2,
    borderColor: colors.acentGrey300,
  },
});
