import { Dimensions, ScrollView, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "../components/layouts/ScreenLayout";
import { OnboardingPage } from "../components/onboarding/OnboardingPage";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");
const Onboarding = () => {
  const ScrollRef = useRef<any>(null);
  const navigation = useNavigation<any>();
  const [screenIndex, setScreenIndex] = useState(0);

  const dispatch = useDispatch();

  async function hideOnboardingScreens() {
    dispatch({ type: "SET_SPLASH_SEEN", payload: true });
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
    <ScreenLayout>
      <ScrollView
        ref={ScrollRef}
        style={{}}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        // scrollEnabled={false}
      >
        <OnboardingPage
          image={require("../../assets/images/onboarding/1.png")}
          headerTxt={"Showcase your\nskillset"}
          bodyTxt={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
          }
          btnTxt={"Next"}
          pageNum={1}
          index={0}
        />
        <OnboardingPage
          image={require("../../assets/images/onboarding/2.png")}
          headerTxt={"Hire every type of\nskilled worker"}
          bodyTxt={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
          }
          btnTxt={"Next"}
          pageNum={1}
          index={1}
        />
        <OnboardingPage
          image={require("../../assets/images/onboarding/3.png")}
          headerTxt={"Have a seemless experience"}
          bodyTxt={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, esse. Quam aperiam fugiat ipsum."
          }
          btnTxt={"Next"}
          pageNum={1}
          index={2}
          pressFunc={hideOnboardingScreens}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
