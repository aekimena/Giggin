import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../utils";
import Page from "../components/onboarding";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const Onboarding = () => {
  const ScrollRef = useRef<any>();
  const navigation = useNavigation<any>();
  const [screenIndex, setScreenIndex] = useState(0);
  const { flex1, bg, w100 } = styles;

  async function hideOnboardingScreens() {
    // hide onboarding forever once seen.
    try {
      await AsyncStorage.setItem("onboarding-seen", "true");
    } catch (e) {
      console.log("error hiding onboarding");
    }
    navigation.replace("Login");
  }

  function scrollToPage(pageNumber: number) {
    if (ScrollRef.current) {
      const offsetX = pageNumber * width;
      ScrollRef.current.scrollTo({ x: offsetX, animated: true });
    }
  }

  function scrollNext() {
    scrollToPage(screenIndex + 1);
    setScreenIndex((prev) => prev + 1);
  }
  return (
    <SafeAreaView style={[flex1, bg]}>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle="light-content"
        translucent
      />
      <ScrollView
        ref={ScrollRef}
        style={[flex1]}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={[w100, flex1]}>
          <Page
            image={require("../../assets/images/onboarding/1.png")}
            headerTxt={"Showcase your\nskillset"}
            bodyTxt={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
            }
            btnTxt={"Next"}
            pageNum={1}
            pressFunc={scrollNext}
          />
        </View>
        <View style={[w100, flex1]}>
          <Page
            image={require("../../assets/images/onboarding/2.png")}
            headerTxt={"Hire every type of\nskilled worker"}
            bodyTxt={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
            }
            btnTxt={"Next"}
            pageNum={2}
            pressFunc={scrollNext}
          />
        </View>
        <View style={[w100, flex1]}>
          <Page
            image={require("../../assets/images/onboarding/3.png")}
            headerTxt={"Have a seemless client and artisan experience"}
            bodyTxt={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
            }
            btnTxt={"Get started"}
            pageNum={3}
            pressFunc={hideOnboardingScreens}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bg: {
    backgroundColor: colors.whiteBg,
  },
  w100: {
    width: width,
  },
});
