import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import { useRoute } from "@react-navigation/native";

export const Receipt = () => {
  const route = useRoute<any>();
  const passedData: ArtisanPaymentDataProps = route.params.data;
  const timestampString = passedData.paymentTime;
  const isIsoDate = timestampString.toString().includes("T" || "Z");
  const timestamp = isIsoDate ? timestampString : parseInt(timestampString);
  const dateObject = new Date(timestamp);

  const hour = isIsoDate ? dateObject.getUTCHours() : dateObject.getHours();
  const minute = isIsoDate
    ? dateObject.getUTCMinutes()
    : dateObject.getMinutes();
  const day = isIsoDate ? dateObject.getUTCDate() : dateObject.getDate();
  const month = isIsoDate
    ? dateObject.getUTCMonth() + 1
    : dateObject.getMonth() + 1;
  const year = isIsoDate
    ? dateObject.getUTCFullYear()
    : dateObject.getFullYear();
  const dateString = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
  const timeString = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }${hour < 12 ? "am" : "pm"}`;
  const FlexRowBtw = ({ left, right }) => (
    <View style={styles.flexRowBtw}>
      <Text
        style={[generalStyles.poppins400_fs14, { color: colors.acentGrey400 }]}
      >
        {left}
      </Text>
      <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
        {right}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Payments"} />
      </View>
      <View style={styles.infoCont}>
        <View style={{ alignItems: "center", gap: 12 }}>
          <Image
            source={require("../../../../assets/images/account/3.png")}
            style={{ height: 100, width: 100 }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.acentGrey500 },
            ]}
          >
            Payment Success!
          </Text>
          <Text
            style={[
              generalStyles.poppins700_fs20,
              { color: colors.black, lineHeight: 24 },
            ]}
          >
            GHC {passedData.amount}
          </Text>
        </View>
        <View style={{ marginTop: 30, gap: 17 }}>
          <FlexRowBtw left={"Ref Number"} right={passedData.refNumber} />
          <FlexRowBtw
            left={"Payment Time"}
            right={`${dateString}, ${timeString}`}
          />
          <View style={styles.flexRowBtw}>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.acentGrey400 },
              ]}
            >
              Payment Type
            </Text>
            {passedData.paymentMethod == "cash" ? (
              <Text
                style={[generalStyles.poppins500_fs14, { color: colors.black }]}
              >
                Cash
              </Text>
            ) : (
              <View style={styles.onlinePayment}>
                <Text
                  style={[
                    generalStyles.poppins400_fs12,
                    { color: colors.whiteBg, fontSize: 10 },
                  ]}
                >
                  Online Payment
                </Text>
              </View>
            )}
          </View>
          <FlexRowBtw left={"Sender Name"} right={passedData.senderName} />
          <View style={styles.dashSeperator}></View>
          <FlexRowBtw
            left={"Amount"}
            right={`GHC ${passedData.amount.toLocaleString()}`}
          />
          <FlexRowBtw
            left={"Service Charge"}
            right={"IDR" + " " + passedData.serviceCharge}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.slipBigEnd}></View>
        <View style={styles.slipSmallEnd}></View>
        <View style={styles.slipSmallEnd}></View>
        <View style={styles.slipSmallEnd}></View>
        <View style={styles.slipSmallEnd}></View>
        <View style={styles.slipBigEnd}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  infoCont: {
    marginTop: 20,
    backgroundColor: colors.whiteBg,
    padding: 15,
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 0.8,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: colors.acentGrey200,
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slipBigEnd: {
    height: 20,
    width: 35,
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    borderTopWidth: 0,
  },
  slipSmallEnd: {
    height: 20,
    width: 25,
    borderWidth: 0.8,
    borderTopWidth: 0,
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
  },
  dashSeperator: {
    marginVertical: 20,
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey400,
    borderStyle: "dashed",
  },
  onlinePayment: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: "rgba(65, 191, 45, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
