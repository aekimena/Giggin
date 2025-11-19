import {
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../utils";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import LabelInputIcon from "../../../components/LabelInputIcon";
import PhoneInput from "react-native-phone-number-input";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import { ButtonContainer } from "../../../components/ButtonContainer";

const ModalView = ({ visible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <View>
            <Image
              source={require("../../../../assets/images/artisanAccount/1.png")}
              style={{ height: 75, width: 75 }}
            />
          </View>
          <Text
            style={[
              generalStyles.poppins500_fs22,
              { color: colors.secondaryBlue200, fontSize: 30 },
            ]}
          >
            {"Successful!"}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            We will get back to you within 1 - 2 working day
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, textAlign: "center", marginTop: 20 },
            ]}
          >
            Please don’t resend same request.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const HelpCenter2 = () => {
  const navigation = useNavigation<any>();
  const user: UserDataProps = useSelector(selectUserData);
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [phoneNo, setPhone] = useState(user.phoneNo);
  const [email, setEmail] = useState(user.email);
  const [msg, setMsg] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const [visible, setVisible] = useState(false);

  function sendMail() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      navigation.popToTop("Account");
    }, 1000);
  }
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Help Center" hideRightComp />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={50}
        >
          <ScrollView
            contentContainerStyle={{
              marginTop: 20,
              paddingBottom: 50,
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <LabelInputIcon
              label="Name"
              defaultValue={name}
              placeholder={"Enter Name"}
              onChangeText={setName}
            />
            <View style={{ gap: 5 }}>
              <Text
                style={[generalStyles.poppins400_fs14, { color: colors.black }]}
              >
                Phone Number
              </Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={""}
                defaultCode="GH"
                layout="first"
                onChangeText={(text) => {
                  setPhone(text);
                }}
                containerStyle={styles.phoneCont}
                textContainerStyle={styles.phoneTxtCont}
              />
            </View>
            <LabelInputIcon
              label="Email"
              placeholder="Enter Email"
              onChangeText={setEmail}
              defaultValue={email}
            />
            <View style={{ gap: 5 }}>
              <Text
                style={[generalStyles.poppins400_fs14, { color: colors.black }]}
              >
                Message
              </Text>
              <TextInput
                multiline
                style={styles.textinput}
                placeholder="Enter Message"
                placeholderTextColor={"#999"}
                onChangeText={setMsg}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <ButtonContainer>
        <View style={styles.btnCont}>
          <Btn100
            text="Send"
            bg={colors.primaryRed400}
            pressFunc={sendMail}
            rounded
          />
        </View>
      </ButtonContainer>
      <ModalView visible={visible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  phoneCont: {
    height: 50,
    borderRadius: 50,
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
  },
  phoneTxtCont: {
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "rgba(0,0,0,0.3)",
    borderLeftWidth: 0.5,
    color: colors.black,
    fontFamily: generalStyles.poppins400_fs12.fontFamily,
  },
  textinput: {
    minHeight: 150,
    maxHeight: 200,
    color: "#444",
    fontFamily: "Poppins400",
    padding: 10,
    borderRadius: 20,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    textAlignVertical: "top",
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    padding: 15,
  },
  modalBox: {
    height: "auto",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: 25,
  },
});
