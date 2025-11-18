import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../utils";
import LabelInputIcon from "../components/LabelInputIcon";
import RadioBtns from "../components/RadioBtns";
import { Btn100 } from "../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateUserData } from "../redux/features/UserData";

const Login = () => {
  const navigation = useNavigation<any>();
  const { flex1, bgWhite } = styles;
  const { height } = useWindowDimensions();
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("client");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const randomBoolean = [true, false];
  const randomVal2 = ["done", "failed", null];
  const randomVal3 = ["company", "individual"];

  // i assume this is how the client data would look like when a data response is returned
  const FakeUserData: UserDataProps = {
    id: "98754",
    firstName: "Barry",
    lastName: "Charles",
    phoneNo: "9087656567",
    email: email,
    street: "45 Kumasi Street.",
    town: "45 Kumasi Street.",
    city: "Kumasi",
    clientType: randomVal3[Math.floor(Math.random() * randomVal3.length)],
    artisanType: randomVal3[Math.floor(Math.random() * randomVal3.length)],
    region: "Kumasi",
    image: null,
    accountType,
    password: "78u7788",
    companyIndustry: "education",
    companyName: "Ashafs Limited",
    service: "Braiding of hair for women",
    artisanSuscribed:
      randomBoolean[Math.floor(Math.random() * randomBoolean.length)],
    artisanIdVerifyStatus:
      randomVal2[Math.floor(Math.random() * randomVal2.length)],
    artisanMomoStatus:
      randomVal2[Math.floor(Math.random() * randomVal2.length)],
  };

  function signIn() {
    setEmailErr(false);
    setPasswordErr(false);
    if (!emailRegex.test(email)) {
      setEmailErr(true);
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordErr(true);
      return;
    }
    // this is where you handle sign in if the inputs are valid.
    setLoading(true);
    setTimeout(() => {
      // automatically, screen would be navigated to main when the userData
      // in redux state is not null

      dispatch(updateUserData(FakeUserData));
      setLoading(false);
    }, 1500);
  }
  return (
    <SafeAreaView style={[flex1, bgWhite, { paddingHorizontal: 30 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <ScrollView
        style={[flex1]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={[flex1, { height: height * 0.9 }]}>
          <View style={{ marginTop: 30, gap: 7 }}>
            <Text
              style={[
                generalStyles.poppins500_fs20,
                { color: colors.secondaryBlue200, fontSize: 25 },
              ]}
            >
              Welcome Back
            </Text>
            <Text style={[generalStyles.poppins400_fs16, { color: "#000" }]}>
              Good to have you back, please enter your details to make use of
              the app
            </Text>
          </View>
          <View style={{ marginTop: 25, gap: 10 }}>
            <LabelInputIcon
              placeholder="Enter Email"
              label="Email"
              keyboardType="email-address"
              showErrorText={emailErr}
              errorText="Please enter a valid email address"
              onChangeText={setEmail}
            />
            <LabelInputIcon
              showRightIcon
              rightIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
              placeholder={"Enter Password"}
              label={"Password"}
              secureTextEntry={hidePassword}
              onRightIconPress={() => setHidePassword(!hidePassword)}
              showErrorText={passwordErr}
              errorText="Password must be at least 8 characters long, must contain at least a number, an uppercase letter, and a special character"
              onChangeText={setPassword}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 30, gap: 15 }}>
            <Text style={[generalStyles.poppins400_fs16]}>Which are you?</Text>
            <RadioBtns
              defaultValue="client"
              collection={[
                { name: "Client", value: "client" },
                { name: "Artisan", value: "artisan" },
              ]}
              onSelect={setAccountType}
            />
          </View>
          <View style={{ marginTop: 30, gap: 13 }}>
            <Btn100
              bg={colors.primaryRed400}
              text={"Sign In"}
              leftComponent={
                loading ? <ActivityIndicator size={20} color={"#fff"} /> : null
              }
              textCol="#fff"
              pressFunc={signIn}
              rounded
              disabled={loading}
            />
            <Text
              style={[styles.poppins400_fs16, styles.forgotPasswordTxt]}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              Forgot password?
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("SignUp")}
          style={[
            styles.allCenter,
            styles.flexRow,
            {
              height: height * 0.1,
              width: "100%",
              gap: 3,
            },
          ]}
        >
          <Text style={[generalStyles.poppins400_fs14, { color: "#222" }]}>
            Don't have an account?
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.primaryRed400 },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  bgWhite: {
    backgroundColor: colors.whiteBg,
  },
  poppins700_fs22: {
    fontFamily: "Poppins700",
    fontSize: 22,
  },
  poppins400_fs16: {
    fontFamily: "Poppins400",
    fontSize: 16,
  },
  forgotPasswordTxt: {
    alignSelf: "flex-end",
    color: colors.primaryRed400,
    fontSize: 12,
  },
  allCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
