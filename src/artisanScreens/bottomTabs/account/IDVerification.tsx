import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import LabelDropDownIcon from "../../../components/LabelDropDownIcon";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const IDVerification = () => {
  const [selectedMmn, setSelectedMmn] = useState("");
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Identity Verification" hideRightComp />
      <View style={{ marginTop: 20 }}>
        <Text style={[generalStyles.poppins400_fs16, { color: colors.black }]}>
          Select any of these documents for your verification process
        </Text>
        <View style={styles.ghanaCardCont}>
          <Text style={styles.inputTxt}>Ghana Card</Text>
        </View>
        <LabelDropDownIcon
          placeholder="Mobile Money Number"
          collection={[
            { label: "AT Cash", value: "atCash" },
            { label: "Vodaphone Cash", value: "vodaphoneCash" },
            { label: "MTN Mobile Money", value: "mtnMobileNo" },
          ]}
          textStyle={styles.inputTxt}
          placeHolderStyle={styles.inputTxt}
          onSelect={setSelectedMmn}
        />
        <View style={{ marginTop: 50 }}>
          <Btn100
            text="Continue"
            bg={colors.primaryRed400}
            pressFunc={() => navigation.navigate("IdVerification_2")}
            rounded
          />
        </View>
        <View style={styles.line}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  ghanaCardCont: {
    marginTop: 30,
    marginBottom: 5,
    height: 50,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: "rgba(202, 9, 0, 1)",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  line: {
    marginTop: 50,
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.acentGrey300,
  },
  inputTxt: {
    ...generalStyles.poppins400_fs16,
    color: colors.acentGrey800,
  },
});
