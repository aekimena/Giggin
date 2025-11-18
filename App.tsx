import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { AppContextProvider } from "./src/context/AppContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins400: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    Poppins500: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins600: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Poppins700: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 3000);
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Provider store={store}>
      <AppContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AppContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
