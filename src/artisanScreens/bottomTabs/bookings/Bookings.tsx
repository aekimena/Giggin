import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Pending } from "./topTabs/Pending";
import { Completed } from "./topTabs/Completed";
import { Cancelled } from "./topTabs/Cancelled";
import { DashboardHeader } from "../../../components/DashboardHeader";
import { colors, generalStyles } from "../../../utils";

export const Bookings = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ paddingHorizontal: 25 }}>
        <DashboardHeader title={"Bookings"} />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: { backgroundColor: colors.primaryRed400 },
          tabBarPressColor: "rgba(0,0,0,0.07)",
        }}
      >
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Completed" component={Completed} />
        <Tab.Screen name="Cancelled" component={Cancelled} />
      </Tab.Navigator>
    </SafeAreaView>
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
