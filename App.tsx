import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { AppContextProvider } from "./src/context/AppContext";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import store from "./src/redux/store/configureStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins400: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    Poppins500: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    Poppins600: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    Poppins700: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     setTimeout(async () => {
  //       await SplashScreen.hideAsync();
  //     }, 3000);
  //   }
  // }, [fontsLoaded, fontError]);

  // useEffect(() => {
  //   onLayoutRootView();
  // }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      {/* <AppContextProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
          {/* <Routes /> */}
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
      {/* </AppContextProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({});
