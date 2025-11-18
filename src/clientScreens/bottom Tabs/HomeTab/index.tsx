import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Home";
import { SeeAllFeaturedArtisans } from "./SeeAllFeaturedArtisans";
import { SeeArtisanCategory } from "./SeeArtisanCategory";
import { SeeArtisanProfile } from "./SeeArtisanProfile";
import { ReportArtisan } from "./ReportArtisan";
import { RatingsAndReviews } from "./RatingsAndReviews";
import { SeeArtisanServices } from "./SeeArtisanServices";
import { SeeArtisanGallery } from "./SeeArtisanGallery";

const HomeScreens = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen
        component={SeeAllFeaturedArtisans}
        name="SeeAllFeaturedArtisans"
      />
      <Stack.Screen component={SeeArtisanCategory} name="SeeArtisanCategory" />
      <Stack.Screen component={SeeArtisanProfile} name="SeeArtisanProfile" />
      <Stack.Screen component={ReportArtisan} name="ReportArtisan" />
      <Stack.Screen component={RatingsAndReviews} name="RatingsAndReviews" />
      <Stack.Screen component={SeeArtisanServices} name="SeeArtisanServices" />
      <Stack.Screen component={SeeArtisanGallery} name="SeeArtisanGallery" />
    </Stack.Navigator>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({});
