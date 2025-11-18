import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors } from "../../../utils";
import LabelDropDownIcon from "../../../components/LabelDropDownIcon";
import LabelInputIcon from "../../../components/LabelInputIcon";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const MomoVerification = () => {
  const [selected, setSelected] = useState("");
  const [accNo, setAccNo] = useState("");
  const [accName, setAccName] = useState("");
  const navigation = useNavigation<any>();

  function verify() {
    navigation.replace("VerifySuccess", {
      data: {
        info: "Your Momo has been successfully submitted for verification. You will be directed to the verification page shortly.",
      },
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Momo Verification" hideRightComp />
      <View style={{ marginTop: 30, gap: 20 }}>
        <LabelDropDownIcon
          label="Mobile Money Type"
          placeholder="Mobile Money Number"
          collection={[
            { label: "AirtelTigo", value: "airtedTigo" },
            { label: "Vodaphone Cash", value: "vodaphoneCash" },
          ]}
          onSelect={setSelected}
        />
        <LabelInputIcon
          placeholder="Enter Account No."
          label="Account Number"
          onChangeText={setAccNo}
          keyboardType="number-pad"
        />

        <LabelInputIcon
          placeholder="Enter Account Name"
          label="Account Name"
          onChangeText={setAccName}
        />
        <View style={{ marginTop: 20 }}>
          <Btn100
            text="Done"
            bg={colors.primaryRed400}
            pressFunc={verify}
            rounded
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: colors.acentGrey50,
  },
});
