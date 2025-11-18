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
import { useNavigation, useRoute } from "@react-navigation/native";

export const NewPassword = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData = route.params.data;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

  function createNewPassword() {
    setConfirmErr(false);
    setPasswordErr(false);
    if (!passwordRegex.test(password)) {
      setPasswordErr(true);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmErr(true);
      return;
    }
    setLoading(true);

    // using the password, and the email from passedData, you can handle password change here
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Successful");
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
          New Password
        </Text>
        <Text style={[generalStyles.poppins400_fs16, { color: "#000" }]}>
          You can now create new password and confirm below
        </Text>
      </View>
      <View style={{ marginTop: 30, gap: 25 }}>
        <LabelInputIcon
          placeholder="Enter Password"
          defaultValue={password}
          onChangeText={setPassword}
          showRightIcon
          secureTextEntry={hidePassword}
          rightIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
          onRightIconPress={() => setHidePassword(!hidePassword)}
          showErrorText={passwordErr}
          errorText="Password must be at lease 8 characters long, must contain at least a number, an uppercase letter, and a special character"
        />
        <LabelInputIcon
          placeholder="Confirm Password"
          defaultValue={confirmPassword}
          onChangeText={setConfirmPassword}
          showRightIcon
          secureTextEntry={hideConfirmPassword}
          rightIcon={hideConfirmPassword ? "eye-outline" : "eye-off-outline"}
          onRightIconPress={() => setHideConfirmPassword(!hideConfirmPassword)}
          disabled={password == ""}
          showErrorText={confirmErr}
          errorText="Passwords do not match!"
        />
      </View>
      <View style={{ marginTop: 40 }}>
        <Btn100
          text={loading ? null : "Continue"}
          bg={colors.primaryRed400}
          pressFunc={createNewPassword}
          rounded
          disabled={loading}
          leftComponent={
            loading && <ActivityIndicator size={20} color={"#fff"} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
