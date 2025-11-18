import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../utils";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Btn100 } from "../components/Btn100";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useSelector } from "react-redux";
import { selectRegData } from "../redux/features/RegistrationData";

const PhoneVerification = () => {
  const [value, setValue] = useState("");
  const navigation = useNavigation<any>();
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const RegData: UserDataProps = useSelector(selectRegData);
  function resendCode() {
    // resend code here
    setTimer(60);
  }

  useEffect(() => {
    if (timer < 1) {
      setTimer(0);
    } else if (timer <= 60 && timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  }, [timer]);

  function verifyPhone() {
    setLoading(true);
    // once the phone number has been verified, and account has been created using the RegData from redux state, proceed to congratulations
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Congratulations");
    }, 1500);
  }
  return (
    <SafeAreaView
      style={[
        generalStyles.flex1,
        generalStyles.bgWhite,
        { paddingHorizontal: 30 },
      ]}
    >
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <View style={{ paddingBottom: 10, marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={[generalStyles.allCenter, styles.backBtn]}
        >
          <Ionicons name="arrow-back" color={colors.primaryRed400} size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={[
            generalStyles.poppins500_fs22,
            { color: colors.secondaryBlue200, fontSize: 32 },
          ]}
        >
          Phone Verification
        </Text>
        <Text style={[generalStyles.poppins400_fs16, { color: colors.black }]}>
          We have sent the OTP code sent to this phone number{" "}
          {RegData.phoneNo.slice(0, 2)}******
          {RegData.phoneNo.slice(RegData.phoneNo.length - 2)}
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={4}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <View style={{ alignItems: "flex-end", marginTop: 15 }}>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.primaryRed400 },
            ]}
            onPress={resendCode}
            disabled={timer > 0}
          >
            {timer < 1
              ? "Resend OTP"
              : `Resend OTP in 0:${timer < 10 ? "0" + timer : timer}`}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <Btn100
          text={loading ? "Verifying" : "Verify Phone Number"}
          textCol="#fff"
          bg={value.length !== 4 ? colors.acentGrey300 : colors.primaryRed400}
          pressFunc={verifyPhone}
          disabled={value.length < 4 || loading}
          leftComponent={loading ? <ActivityIndicator color={"#fff"} /> : null}
          rounded
        />
      </View>
    </SafeAreaView>
  );
};

export default PhoneVerification;

const styles = StyleSheet.create({
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primaryRed400,
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 55,
    fontSize: 24,
    borderWidth: 0.8,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 10,
    fontFamily: "Poppins400",
  },
  focusCell: {
    borderColor: colors.primaryRed400,
    color: colors.primaryRed400,
  },
});
