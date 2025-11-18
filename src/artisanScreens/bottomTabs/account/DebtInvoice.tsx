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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Btn100 } from "../../../components/Btn100";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";

const RenderFlexBtw = ({ left, right }) => (
  <View style={[generalStyles.flexRowBtw]}>
    <Text
      style={[generalStyles.poppins500_fs14, { color: colors.acentGrey500 }]}
    >
      {left}
    </Text>
    <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
      {right}
    </Text>
  </View>
);

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

export const DebtInvoice = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisanDebts = route.params.data;
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false);

  function verify() {
    // verify payment here
    setStatus(true);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      navigation.popToTop("Wallet");
    }, 1500);
  }
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Payment Invoice" hideRightComp />
      {/*  */}
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View
            style={[
              styles.header,
              {
                backgroundColor:
                  passedData.status == "pending"
                    ? colors.primaryRed50
                    : colors.forestGreen100,
              },
            ]}
          >
            <Text
              style={[
                generalStyles.poppins400_fs14,
                {
                  color:
                    passedData.status == "pending"
                      ? colors.primaryRed400
                      : colors.forestGreen600,
                },
              ]}
            >
              {passedData.status == "pending" ? "Pending" : "Paid"}
            </Text>
          </View>
          <View style={[generalStyles.flexRowBtw, { marginTop: 15 }]}>
            <Text
              style={[generalStyles.poppins600_fs16, { color: colors.black }]}
            >
              INV #97710037
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.primaryRed300 },
              ]}
            >
              Ref No: 233643645412
            </Text>
          </View>

          <View style={styles.clientInfoCont}>
            <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
              <Image
                source={passedData.image}
                style={{ height: 70, width: 90, borderRadius: 10 }}
              />
              <View style={{ gap: 3, flex: 1 }}>
                <Text
                  style={[
                    generalStyles.poppins500_fs12,
                    { color: colors.black },
                  ]}
                >
                  Ordered By
                </Text>
                <Text
                  style={[
                    generalStyles.poppins500_fs14,
                    { color: colors.black },
                  ]}
                >
                  {passedData.firstName} {passedData.lastName}
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
          <View style={styles.detailsCont}>
            <Text
              style={[generalStyles.poppins500_fs14, { color: colors.black }]}
            >
              Service Details
            </Text>
            <View style={styles.seperator}></View>
            <View style={{ gap: 15 }}>
              <RenderFlexBtw
                left={"Full Engine Repair"}
                right={"GHC " + passedData.price}
              />
              <RenderFlexBtw left={"Our Commission"} right={"GHC " + 100} />
            </View>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.black, marginTop: 20 },
              ]}
            >
              Payment Details
            </Text>
            <View style={styles.seperator}></View>
            <View style={{ gap: 15 }}>
              <View style={{ gap: 5 }}>
                <Text style={styles.headerKey}>Bank Name</Text>
                <Text style={styles.headerValue}>First Bank Plc</Text>
              </View>
              <View style={[generalStyles.flexRowBtw]}>
                <View style={{ gap: 5 }}>
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
                <View style={{ gap: 5 }}>
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
              {/*  */}
            </View>
          </View>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.black, textAlign: "center", marginTop: 15 },
            ]}
          >
            Make payment to QAS within 72hrs using the reference code above to
            prevent account blockage. Use this account for this transaction only
          </Text>
        </ScrollView>
      </View>
      <View style={styles.btnCont}>
        <Btn100
          text="I've sent the money"
          bg={colors.primaryRed400}
          pressFunc={verify}
          rounded
        />
      </View>
      <ModalView visible={visible} status={status} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailsCont: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
  },
  clientInfoCont: {
    marginTop: 20,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  seperator: {
    width: "100%",
    borderTopWidth: 2,
    borderColor: colors.acentGrey400,
    borderStyle: "dashed",
    marginVertical: 10,
  },
  header: {
    marginTop: 20,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 15,
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
});
