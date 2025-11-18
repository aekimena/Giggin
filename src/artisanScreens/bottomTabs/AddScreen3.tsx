import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Successful } from "../../components/Successful";
import { useNavigation } from "@react-navigation/native";

export const AddScreen3 = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop("Main");
    }, 3000);
  }, []);
  return (
    <Successful info="The new service has been successfully created. You will be directed to the dashhboard shortly." />
  );
};

const styles = StyleSheet.create({});
