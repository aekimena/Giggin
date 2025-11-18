import {
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../../utils";
import { BackIconTitle } from "../../../../components/BackIconTitle";
import { Btn100 } from "../../../../components/Btn100";
import { TextInput6 } from "../../../../components/TextInput6";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../../redux/features/UserData";
import { useNavigation } from "@react-navigation/native";

const VerifySuccessModal = ({ visible, setVisible }) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../../assets/images/artisanBookings/8.png")}
            style={{ marginTop: 30 }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey800, marginTop: 10 },
            ]}
          >
            Bank Account Verification Successful
          </Text>
          <View style={{ width: "100%", marginTop: 50 }}>
            <Btn100
              text="Done"
              bg={colors.primaryRed400}
              pressFunc={() => {
                setVisible(false);
                navigation.popToTop("Account");
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const VerifyFailedModal = ({ visible, setVisible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../../assets/images/artisanBookings/9.png")}
            style={{ marginTop: 30 }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey800, marginTop: 10 },
            ]}
          >
            Bank Account Verification Unsuccessful
          </Text>
          <View style={{ width: "100%", marginTop: 50 }}>
            <Btn100
              text="Try Again"
              bg={colors.primaryRed400}
              pressFunc={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const CVerify4 = () => {
  const user: UserDataProps = useSelector(selectUserData);
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState(user.companyName);
  const [accountNo, setAccountNo] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

  function verifyBackAcc() {
    // verify here.
    setSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Bank Account Verification"} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 20, gap: 15 }}>
          <TextInput6
            label="Bank Name"
            placeholder="Enter Bank Name"
            onChangeText={(txt) => setBankName(txt)}
          />
          <TextInput6
            label="Account Name"
            placeholder="Enter Account Name"
            defaultValue={accountName}
            onChangeText={(txt) => setAccountName(txt)}
          />
          <TextInput6
            label="Account Number"
            placeholder="Enter Account Number"
            onChangeText={(txt) => setAccountNo(txt)}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={{ paddingVertical: 15 }}>
        <Btn100
          text="Done"
          bg={colors.primaryRed400}
          pressFunc={verifyBackAcc}
        />
      </View>
      <VerifySuccessModal visible={successModal} setVisible={setSuccessModal} />
      <VerifyFailedModal visible={failureModal} setVisible={setFailureModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  modalBox: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
});
