import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors, generalStyles } from "../../../utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Successful } from "../../../components/Successful";

export const VerifySuccess = () => {
  const route = useRoute<RouteProp<any>>();
  const passedData = route.params.data;

  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Verification");
    }, 2500);
  }, []);
  return <Successful info={passedData.info} />;
};

const styles = StyleSheet.create({});
