import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors, generalStyles } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../redux/features/UserData";
import { Successful } from "../components/Successful";

const Congratulations = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const RegData: UserDataProps = useSelector(
    (state: any) => state.RegData.registerData
  );
  useEffect(() => {
    setTimeout(() => {
      // so, after everything is settled, store the user data in redux state before navigating
      // to the main screens
      dispatch(updateUserData(RegData));
    }, 2500);
  }, []);
  return (
    <Successful
      info="Your account has been successfully created. You will be directed to the homepage shortly."
      heading="Congratulations!"
    />
  );
};

export default Congratulations;

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
