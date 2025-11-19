import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../utils";
import { BackBtn } from "../../components/auth/BackBtn";
import LabelInputIcon from "../../components/LabelInputIcon";
import { Btn100 } from "../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { Vspacer } from "../../components/Vspacer";

export const EnterEmail = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [loading, setLoading] = useState(false);

  function sendCode() {
    setEmailErr(false);
    if (email == "") {
      setEmailErr(true);
      return;
    }
    // handle send code function here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("EnterCode", { data: email });
    }, 1500);
  }
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Vspacer />
        <BackBtn />
        <View style={{ marginTop: 30 }}>
          <Text
            style={[
              generalStyles.poppins500_fs22,
              { color: colors.secondaryBlue200, fontSize: 25 },
            ]}
          >
            Email Verification
          </Text>
          <Text style={[generalStyles.poppins400_fs16, { color: "#000" }]}>
            Please type your email below to enable us send you an OTP code
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          <LabelInputIcon
            label="Email"
            placeholder="Enter Email"
            keyboardType="email-address"
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            showErrorText={emailErr}
            errorText="Please enter an email address"
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Btn100
            text={"Send Code"}
            textCol="#fff"
            pressFunc={sendCode}
            bg={colors.primaryRed400}
            leftComponent={
              loading ? <ActivityIndicator size={20} color={"#fff"} /> : null
            }
            rounded
            disabled={loading}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({});
