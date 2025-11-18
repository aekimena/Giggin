import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BackBtn } from "../../components/auth/BackBtn";
import { colors, generalStyles } from "../../utils";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Btn100 } from "../../components/Btn100";

export const EnterCode = () => {
  const [value, setValue] = useState("");
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData = route.params.data;
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const first5Char = passedData.slice(0, 5);
  const atIndex = passedData.slice(passedData.indexOf("@"));

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

  function verifyEmail() {
    setLoading(true);
    // verify code here
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("NewPassword", { data: passedData });
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
          We have sent the OTP code sent to this email {first5Char}*****
          {atIndex}
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
      <View style={{ marginTop: 30 }}>
        <Btn100
          text={"Verify Email"}
          pressFunc={verifyEmail}
          bg={value.length !== 4 ? colors.acentGrey300 : colors.primaryRed400}
          disabled={value.length !== 4 || loading}
          rounded
          leftComponent={loading ? <ActivityIndicator color={"#fff"} /> : null}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    lineHeight: 55,
    fontSize: 24,
    borderWidth: 0.8,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 5,
    fontFamily: "Poppins400",
  },
  focusCell: {
    borderColor: colors.primaryRed400,
    color: colors.primaryRed400,
  },
});
