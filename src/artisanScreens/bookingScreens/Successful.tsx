import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors, generalStyles } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { Successful } from "../../components/Successful";

export const ConfirmPaySuccess = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop("Bookings");
    }, 2500);
  }, []);
  return (
    <Successful info="The payment receipt has been successfully uploaded. You will be directed to the booking page shortly." />
  );
};

const styles = StyleSheet.create({
  outerImage: {
    width: 140,
    height: 140,
  },
  innerImage: { width: 60, height: 60, position: "absolute" },
  congrats: {
    color: colors.secondaryBlue200,
    textAlign: "center",
    fontSize: 25,
  },
});
