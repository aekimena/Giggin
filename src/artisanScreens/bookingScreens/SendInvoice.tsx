import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Btn100 } from "../../components/Btn100";

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

const ModalView = ({ visible, setVisible }) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisanBookingsProps = route.params.data;
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.modalCont}>
        <View
          style={{
            backgroundColor: colors.whiteBg,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <View style={{ width: "70%", alignSelf: "center" }}>
            <Text
              style={[
                generalStyles.poppins400_fs16,
                { textAlign: "center", color: colors.black },
              ]}
            >
              Are you sure you have received this payment?
            </Text>
          </View>
          <View
            style={[generalStyles.flexRowCenter, { gap: 20, marginTop: 10 }]}
          >
            <Pressable
              onPress={() => {
                setVisible(false);
                navigation.navigate("ConfirmPayment", { data: passedData });
              }}
              style={({ pressed }) => [
                styles.yesNoCont,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.forestGreen600 },
                ]}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.yesNoCont,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
                },
              ]}
              onPress={() => setVisible(false)}
            >
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.primaryRed400 },
                ]}
              >
                No
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const SendInvoice = () => {
  const route = useRoute<any>();
  const passedData: ArtisanBookingsProps = route.params.data;
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.header,
            passedData.paymentMade && {
              backgroundColor: "rgba(0, 193, 19, 0.16)",
            },
          ]}
        >
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.primaryRed400 },
              passedData.paymentMade && { color: colors.forestGreen600 },
            ]}
          >
            {passedData.paymentMade ? "Paid" : "Pending"}
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
                style={[generalStyles.poppins500_fs12, { color: colors.black }]}
              >
                Ordered By
              </Text>
              <Text
                style={[generalStyles.poppins500_fs14, { color: colors.black }]}
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
            Invoice Details
          </Text>
          <View style={styles.seperator}></View>
          <View style={{ gap: 15 }}>
            <RenderFlexBtw
              left={"Service Offered"}
              right={passedData.service}
            />
            <RenderFlexBtw left={"Service Status"} right={"Completed"} />
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
            <RenderFlexBtw
              left={"Final Fee Charged"}
              right={"GHC" + passedData.finalFee}
            />
            <View style={[generalStyles.flexRowBtw]}>
              <Text
                style={[
                  generalStyles.poppins500_fs14,
                  { color: colors.acentGrey500 },
                ]}
              >
                Platform Charges
              </Text>
              <View style={[generalStyles.flexRow, { gap: 3 }]}>
                <Text
                  style={[
                    generalStyles.poppins500_fs12,
                    { color: colors.acentGrey400, fontSize: 10 },
                  ]}
                >
                  (2%)
                </Text>
                <Text
                  style={[
                    generalStyles.poppins500_fs14,
                    { color: colors.black },
                  ]}
                >
                  GHC{parseInt(passedData.finalFee) * 0.02}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <RenderFlexBtw
                left={"Client Payable Fee"}
                right={"GHC" + passedData.finalFee}
              />
            </View>
          </View>
        </View>
        <Text
          style={[
            generalStyles.poppins500_fs12,
            { color: colors.black, textAlign: "center", marginTop: 20 },
          ]}
        >
          Make payment to Artisan within 24 - 48hrs above to prevent blockage of
          account and some legal actions
        </Text>
        {/* </View> */}
        <View style={{ marginTop: 40, gap: 20 }}>
          <Btn100
            text="Send Invoice"
            bg={colors.primaryRed400}
            pressFunc={null}
            rounded
          />
          {passedData.paymentMethod == "offline" && (
            <Btn100
              text="Verify Offline Payment"
              bg={
                passedData.paymentMade == true
                  ? colors.primaryRed400
                  : colors.acentGrey400
              }
              pressFunc={() => setVisible(true)}
              rounded
            />
          )}
        </View>
      </ScrollView>
      <ModalView visible={visible} setVisible={setVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
    backgroundColor: colors.acentGrey50,
  },
  header: {
    marginTop: 20,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
    justifyContent: "center",
    alignItems: "center",
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
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  detailsCont: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
  },
  yesNoCont: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
