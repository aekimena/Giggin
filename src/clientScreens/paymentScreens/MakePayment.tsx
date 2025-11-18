import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BackIconTitle } from "../../components/BackIconTitle";
import { colors, generalStyles } from "../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Btn100 } from "../../components/Btn100";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymenStatusModal = ({ visible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../assets/images/artisanBookings/8.png")}
            style={styles.tickImage}
          />
          <Text style={styles.modalTxt}>Payment made successfully</Text>
          <View style={{ marginTop: 70 }}>
            <Btn100 text="Done" bg={colors.primaryRed400} pressFunc={null} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PaymentFailedModal = ({ visible, setVisible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../assets/images/artisanBookings/9.png")}
            style={styles.tickImage}
          />
          <Text style={styles.modalTxt}>Payment was unsuccessful</Text>
          <View style={{ marginTop: 70 }}>
            <Btn100
              text="Try Again"
              bg={colors.primaryRed400}
              pressFunc={null}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// here's what happens in this screen: using the passed data which should
// contain the artisan's data and client's data, you can work on the payment.
export const MakePayment = () => {
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.data;
  const [selected, setSelected] = useState(0);
  const [showModal, setModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);
  const navigation = useNavigation<any>();

  function onlinePay() {
    // pay online here. show failure or success modal depending on the outcome
    setFailureModal(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Payment"} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.black, textAlign: "center" },
          ]}
        >
          Select Payment Method
        </Text>
        <View style={{ marginTop: 10, gap: 15 }}>
          <Pressable style={styles.section} onPress={() => setSelected(0)}>
            <View style={styles.flexRow}>
              <FontAwesome
                name="building-columns"
                size={20}
                color={colors.primaryRed400}
              />
              <View style={{ gap: 5 }}>
                <Text
                  style={[
                    generalStyles.poppins400_fs16,
                    { color: colors.black },
                  ]}
                >
                  Mobile Money
                </Text>
                <Text
                  style={[
                    generalStyles.poppins400_fs12,
                    { color: colors.acentGrey500 },
                  ]}
                >
                  (Make online payment)
                </Text>
              </View>
            </View>
            <View style={[generalStyles.allCenter, styles.outerCircle]}>
              {selected == 0 && <View style={styles.innerCircle}></View>}
            </View>
          </Pressable>
          <Pressable style={styles.section} onPress={() => setSelected(1)}>
            <View style={styles.flexRow}>
              <IonIcons name="cash" size={25} color={colors.primaryRed400} />
              <View style={{ gap: 5 }}>
                <Text
                  style={[
                    generalStyles.poppins400_fs16,
                    { color: colors.black },
                  ]}
                >
                  Cash
                </Text>
                <Text
                  style={[
                    generalStyles.poppins400_fs12,
                    { color: colors.acentGrey500 },
                  ]}
                >
                  (Pay professional with cash)
                </Text>
              </View>
            </View>
            <View style={[generalStyles.allCenter, styles.outerCircle]}>
              {selected == 1 && <View style={styles.innerCircle}></View>}
            </View>
          </Pressable>
        </View>
        <View style={[styles.seperator, { marginTop: 10 }]}></View>
      </View>
      <View style={[styles.flexRow, { gap: 4, marginTop: 30 }]}>
        <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
          Make payment of
        </Text>
        <Text
          style={[
            generalStyles.poppins500_fs14,
            { color: colors.primaryRed400 },
          ]}
        >
          1000GH₵
        </Text>
      </View>
      <View style={styles.btnCont}>
        <Btn100
          text="Continue"
          bg={colors.primaryRed400}
          pressFunc={() => {
            selected == 0
              ? onlinePay()
              : navigation.navigate("ConfirmCashPayment", { data: passedData });
          }}
        />
      </View>
      <PaymenStatusModal visible={showModal} />
      <PaymentFailedModal visible={failureModal} setVisible={setFailureModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.primaryRed100,
    borderWidth: 0.8,
    borderColor: colors.primaryRed400,
  },
  innerCircle: {
    height: 17,
    width: 17,
    borderRadius: 17 / 2,
    backgroundColor: colors.primaryRed400,
  },
  seperator: {
    height: 0.8,
    width: "100%",
    backgroundColor: colors.acentGrey300,
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    alignSelf: "center",
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: colors.whiteBg,
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tickImage: { marginTop: 70, alignSelf: "center", height: 60, width: 60 },
  modalTxt: {
    ...generalStyles.poppins400_fs14,
    color: colors.black,
    alignSelf: "center",
    marginTop: 20,
  },
});
