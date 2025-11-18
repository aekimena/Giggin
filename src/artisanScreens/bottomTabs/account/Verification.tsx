import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";

export const Verification = () => {
  const navigation = useNavigation<any>();
  const user: UserDataProps = useSelector(selectUserData);
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Verification" hideRightComp />
      <View style={{ marginTop: 30, gap: 20 }}>
        <Pressable
          style={styles.box}
          onPress={() => navigation.navigate("IdVerification")}
        >
          <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
            <View style={styles.leftIconCont}>
              <Image
                source={require("../../../../assets/images/artisanAccount/6.png")}
                style={{ height: 20, width: 20 }}
              />
            </View>
            <Text style={styles.boxTxt}>KYC Verification</Text>
          </View>
          {user.artisanIdVerifyStatus == null && (
            <Ionicons name="chevron-forward" size={25} color={colors.black} />
          )}
          {user.artisanIdVerifyStatus == "done" && (
            <View
              style={[
                styles.statusCont,
                { backgroundColor: "rgba(65, 191, 45, 1)" },
              ]}
            >
              <Text style={styles.statusTxt}>Done</Text>
            </View>
          )}
          {user.artisanIdVerifyStatus == "failed" && (
            <View
              style={[
                styles.statusCont,
                { backgroundColor: colors.primaryRed400 },
              ]}
            >
              <Text style={styles.statusTxt}>Failed</Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={styles.box}
          onPress={() => navigation.navigate("MomoVerification")}
        >
          <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
            <View style={styles.leftIconCont}>
              <Image
                source={require("../../../../assets/images/artisanAccount/7.png")}
                style={{ height: 20, width: 20 }}
              />
            </View>
            {user.artisanType == "individual" && (
              <Text style={styles.boxTxt}>Momo Account</Text>
            )}
            {user.artisanType == "company" && (
              <Text style={styles.boxTxt}>Mobile Money Account</Text>
            )}
          </View>
          {user.artisanMomoStatus == null && (
            <Ionicons name="chevron-forward" size={25} color={colors.black} />
          )}
          {user.artisanMomoStatus == "done" && (
            <View
              style={[
                styles.statusCont,
                { backgroundColor: "rgba(65, 191, 45, 1)" },
              ]}
            >
              <Text style={styles.statusTxt}>Done</Text>
            </View>
          )}
          {user.artisanMomoStatus == "failed" && (
            <View
              style={[
                styles.statusCont,
                { backgroundColor: colors.primaryRed400 },
              ]}
            >
              <Text style={styles.statusTxt}>Failed</Text>
            </View>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: colors.acentGrey50,
    flex: 1,
  },
  leftIconCont: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.acentGrey300,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: colors.primaryRed50,
    padding: 15,
    paddingVertical: 30,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  statusCont: {
    paddingVertical: 7,
    minWidth: 77,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statusTxt: { ...generalStyles.poppins500_fs16, color: "#fff" },
  boxTxt: { ...generalStyles.poppins500_fs16, color: colors.black, flex: 1 },
});
