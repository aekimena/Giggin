import { Image, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../constants/styles";
import { colors } from "../constants/colors";
import { Btn100 } from "../components/Btn100";
import IonIcons from "@expo/vector-icons/Ionicons";

export const SuccessModal = ({ visible, setVisible, date, time, data }) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalCont}>
        <View style={[styles.section, styles.modalBox]}>
          <Image
            source={require("../../assets/images/artisanBookings/2.png")}
            style={{ alignSelf: "center", top: -0.57 }}
          />
          <View style={styles.modalHeaderTxtCont}>
            <Text
              style={[
                globalStyles.poppins500_fs16,
                { color: colors.acentGrey800 },
              ]}
            >
              Success
            </Text>
            <Text
              style={[globalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Your Booking is confirmed
            </Text>
          </View>
          <View style={styles.successModalInnerSection}>
            <View style={{ ...globalStyles.flexRowBtw }}>
              <Text style={[globalStyles.poppins400_fs12, styles.innerLeftTxt]}>
                Date
              </Text>
              <Text style={[globalStyles.poppins400_fs12, styles.innerLeftTxt]}>
                Time Slot
              </Text>
            </View>

            <View style={{ ...globalStyles.flexRowBtw }}>
              <Text
                style={[globalStyles.poppins400_fs14, styles.innerRightTxt]}
              >
                {date}
              </Text>
              <Text
                style={[globalStyles.poppins400_fs14, styles.innerRightTxt]}
              >
                {time}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 15, gap: 5 }}>
            <Text
              style={[
                globalStyles.poppins400_fs14,
                { color: colors.acentGrey600 },
              ]}
            >
              Total Amount
            </Text>
            <Text
              style={[
                globalStyles.poppins500_fs14,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {data.price}GH₵
            </Text>
          </View>
          <View
            style={[{ ...globalStyles.flexRowBtw, marginTop: 20, gap: 15 }]}
          >
            <View style={{ flex: 1 }}>
              <Btn100
                bg={colors.primaryRed400}
                text="Message"
                pressFunc={() => {
                  navigation.navigate("Chats", { artisan: data });
                  setVisible(false);
                }}
                leftComponent={
                  <IonIcons
                    name="chatbubble-ellipses"
                    size={20}
                    color={"#fff"}
                  />
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Btn100
                text="Call"
                bg={colors.primaryRed400}
                pressFunc={() => {}}
                leftComponent={
                  <IonIcons name="call" size={20} color={"#fff"} />
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: colors.acentGrey50,
    paddingTop: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  modalTerms: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
    flexDirection: "row",
    marginTop: 60,
  },
  modalHeaderTxtCont: { alignItems: "center", marginTop: 20, gap: 7 },
  successModalInnerSection: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.acentGrey400,
    borderStyle: "dashed",
    marginTop: 20,
    gap: 10,
  },
  innerLeftTxt: {
    color: colors.acentGrey600,
  },
  innerRightTxt: {
    color: colors.secondaryBlue400,
  },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
  },
});
