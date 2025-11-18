import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

const ModalView = ({ visible, status }) => {
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
              source={
                status
                  ? require("../../../../assets/images/artisanAccount/1.png")
                  : require("../../../../assets/images/artisanAccount/2.png")
              }
              style={{ height: 75, width: 75 }}
            />
          </View>
          <Text
            style={[
              generalStyles.poppins500_fs22,
              { color: colors.secondaryBlue200, fontSize: 30 },
            ]}
          >
            {status ? "Successful!" : "Unsuccessful"}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            {status
              ? "An admin will verify your\npayment shortly."
              : "Network error 503"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const BadgePayment = () => {
  const user: UserDataProps = useSelector(selectUserData);
  const route = useRoute<any>();
  const passedData = route.params.data; // this passed data is eiher 1 or 2. 1 means user selected annual, 2 means montly
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [copiedText, setCopiedText] = useState("");

  function verifyPayment() {
    setVisible(true);
    setPaymentStatus(true);
    setTimeout(() => {
      setVisible(false);
      navigation.popToTop("AccountScreens");
    }, 1000);
  }

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <View>
        <OverviewPagesHeader title="Payment Info" hideRightComp />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.pendingCont}>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.primaryRed300 },
            ]}
          >
            Pending
          </Text>
        </View>

        <View style={[generalStyles.flexRowBtw, { marginTop: 20 }]}>
          <Text
            style={[
              generalStyles.poppins600_fs16,
              { color: colors.black, lineHeight: 21 },
            ]}
          >
            INV #99789861
          </Text>
          <View style={[generalStyles.flexRow, { gap: 5 }]}>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.primaryRed300 },
              ]}
            >
              Ref No: 233643645412
            </Text>
            <Pressable onPress={() => copyToClipboard("233643645412")}>
              <Ionicons
                name="copy-outline"
                size={17}
                color={colors.primaryRed300}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.infoCont}>
          <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
            <Image
              source={
                user.image == null
                  ? require("../../../../assets/images/signUp/2.png")
                  : { uri: user.image }
              }
              style={{
                height: 70,
                width: 90,
                borderRadius: 10,
              }}
            />
            <View style={{ gap: 3, flex: 1 }}>
              <Text
                style={[generalStyles.poppins500_fs12, { color: colors.black }]}
              >
                Requested By
              </Text>
              <Text
                style={[generalStyles.poppins500_fs14, { color: colors.black }]}
              >
                {user.firstName} {user.lastName}
              </Text>
            </View>
          </View>
          <Text
            style={[
              generalStyles.poppins500_fs14,
              { color: colors.acentGrey500 },
            ]}
          >
            Due 12/14/2024
          </Text>
        </View>
        <View style={styles.accountCont}>
          <View>
            <Text style={styles.headerKey}>Bank Name</Text>
            <Text style={styles.headerValue}>First Bank Plc</Text>
          </View>
          <View style={[generalStyles.flexRowBtw]}>
            <View>
              <Text style={styles.headerKey}>Account Number</Text>
              <Text style={styles.headerValue}>3137033886</Text>
            </View>
            <Pressable onPress={() => copyToClipboard("3137033886")}>
              <Ionicons
                name="copy-outline"
                size={17}
                color={colors.acentGrey500}
              />
            </Pressable>
          </View>
          <View style={[generalStyles.flexRowBtw]}>
            <View>
              <Text style={styles.headerKey}>Amount</Text>
              <Text style={styles.headerValue}>GHC 50</Text>
            </View>
            <Pressable onPress={() => copyToClipboard("50")}>
              <Ionicons
                name="copy-outline"
                size={17}
                color={colors.acentGrey500}
              />
            </Pressable>
          </View>
        </View>
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { marginTop: 20, textAlign: "center", color: colors.black },
          ]}
        >
          Use this account for this transaction only
        </Text>
        <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
          <Btn100
            text="I've sent the money"
            pressFunc={verifyPayment}
            bg={colors.primaryRed400}
            rounded
          />
        </View>
      </ScrollView>
      <ModalView visible={visible} status={paymentStatus} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  pendingCont: {
    marginTop: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCont: {
    marginTop: 20,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerKey: {
    color: colors.acentGrey500,
    ...generalStyles.poppins500_fs14,
  },
  headerValue: {
    color: colors.black,
    ...generalStyles.poppins500_fs14,
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    padding: 15,
  },
  modalBox: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: 25,
  },
  accountCont: {
    marginTop: 20,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    padding: 15,
    gap: 20,
  },
});
