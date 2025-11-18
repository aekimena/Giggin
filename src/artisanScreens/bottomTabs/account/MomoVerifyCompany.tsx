import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../utils";
import { Btn100 } from "../../../components/Btn100";
import LabelInputIcon from "../../../components/LabelInputIcon";
import LabelDropDownIcon from "../../../components/LabelDropDownIcon";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";

export const MomoVerifyCompany = () => {
  const user: UserDataProps = useSelector(selectUserData);
  const [selected, setSelected] = useState("");
  const [accNo, setAccNo] = useState("");
  const [accName, setAccName] = useState("");
  const navigation = useNavigation<any>();

  function verify() {
    navigation.replace("VerifySuccess", {
      data: {
        info: "Your National ID Card has been successfully uploaded. You will be directed to the verification page shortly.",
      },
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Momo Verification" hideRightComp />
      <View style={{ gap: 5, marginTop: 20 }}>
        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Input your valid Momo to receive your earnings
        </Text>
        <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
          Regulations requires you to input your valid Momo details to complete
          the verification process
        </Text>
      </View>
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
            text="Continue"
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
