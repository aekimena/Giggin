import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { BackIconTitle } from "../../components/BackIconTitle";
import { colors, generalStyles } from "../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Btn100 } from "../../components/Btn100";
import { BookingInfo } from "../../components/BookingInfo";

const ConfirmBookingModal = ({ visible, setVisible, setOtherVisible }) => {
  const [checked, setChecked] = useState(false);
  function showSuccessModal() {
    setVisible(false);
    setOtherVisible(true);
  }
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalCont}>
        <View style={[styles.section, styles.modalBox]}>
          <Image
            source={require("../../../assets/images/artisanBookings/2.png")}
            style={{ alignSelf: "center", top: -0.57 }}
          />
          <View style={styles.modalHeaderTxtCont}>
            <Text
              style={[
                generalStyles.poppins500_fs16,
                { color: colors.acentGrey800 },
              ]}
            >
              Confirm Booking
            </Text>
            <Text
              style={[generalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Do you want to confirm this booking?
            </Text>
          </View>
          <View style={[styles.modalTerms]}>
            <Pressable onPress={() => setChecked(!checked)}>
              <IonIcons
                name={checked ? "checkbox" : "square"}
                color={colors.primaryRed400}
                size={20}
              />
            </Pressable>

            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.black, lineHeight: 16 },
              ]}
            >
              Using our platforms implies you agree to our terms and conditions
            </Text>
          </View>
          <View style={[styles.flexRowBtw, { marginTop: 50, gap: 15 }]}>
            <View style={{ flex: 1 }}>
              <Btn100
                text="Cancel"
                textCol={colors.primaryRed400}
                pressFunc={() => setVisible(false)}
                outlined
              />
            </View>
            <View style={{ flex: 1 }}>
              <Btn100
                text="Confirm"
                bg={colors.primaryRed400}
                pressFunc={showSuccessModal}
                disabled={checked == false}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const SuccessModal = ({ visible, setVisible }) => {
  const route = useRoute<any>();
  const { date, time, artisanData } = route.params.data;
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
            source={require("../../../assets/images/artisanBookings/2.png")}
            style={{ alignSelf: "center", top: -0.57 }}
          />
          <View style={styles.modalHeaderTxtCont}>
            <Text
              style={[
                generalStyles.poppins500_fs16,
                { color: colors.acentGrey800 },
              ]}
            >
              Success
            </Text>
            <Text
              style={[generalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Your Booking is confirmed
            </Text>
          </View>
          <View style={styles.successModalInnerSection}>
            <View style={styles.flexRowBtw}>
              <Text
                style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}
              >
                Date
              </Text>
              <Text
                style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}
              >
                Time Slot
              </Text>
            </View>

            <View style={styles.flexRowBtw}>
              <Text
                style={[generalStyles.poppins400_fs14, styles.innerRightTxt]}
              >
                {date}
              </Text>
              <Text
                style={[generalStyles.poppins400_fs14, styles.innerRightTxt]}
              >
                {time}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 15, gap: 5 }}>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.acentGrey600 },
              ]}
            >
              Total Amount
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {artisanData.price}GH₵
            </Text>
          </View>
          <View style={[styles.flexRowBtw, { marginTop: 20, gap: 15 }]}>
            <View style={{ flex: 1 }}>
              <Btn100
                bg={colors.primaryRed400}
                text="Message"
                pressFunc={() => {
                  navigation.navigate("Chats", { artisan: artisanData });
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
                pressFunc={null}
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

export const BookingDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const artisanData: ArtisansDataObjProps = route.params.data.artisanData;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { date, time, address, description } = route.params.data;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.acentGrey50 }}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 15, paddingHorizontal: 15, paddingBottom: 10 }}>
        <BackIconTitle title={"Booking Details"} />
      </View>
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={styles.stepsCont}>
          <View style={{ alignItems: "center" }}>
            <IonIcons name="ellipse" color={colors.primaryRed200} size={27} />
            <Text
              style={[generalStyles.poppins400_fs12, { color: colors.black }]}
            >
              Step 1
            </Text>
          </View>
          <View style={styles.dash}></View>
          <View style={{ alignItems: "center" }}>
            <IonIcons name="ellipse" color={colors.primaryRed400} size={27} />
            <Text
              style={[generalStyles.poppins400_fs12, { color: colors.black }]}
            >
              Step 2
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 25 }}>
          <BookingInfo
            image={artisanData.image}
            address={address}
            dateTime={`${date}, ${time}`}
            provider={artisanData}
            service={"Radiator Flush"}
            clientProduct={"Toyata Camry"}
          />
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 20, gap: 10 }}>
          <Text
            style={[generalStyles.poppins500_fs16, { color: colors.black }]}
          >
            Price Detail
          </Text>
          <View style={styles.section}>
            <View style={styles.flexRowBtw}>
              <Text
                style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}
              >
                Artisan Price Range
              </Text>
              <Text
                style={[generalStyles.poppins400_fs14, styles.innerRightTxt]}
              >
                GHC {artisanData.price} - GHC{" "}
                {artisanData.price + artisanData.price * 2}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.flexRowBtw,
            { marginTop: 30, gap: 15, paddingHorizontal: 15 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Btn100
              text="Back"
              textCol={colors.primaryRed400}
              pressFunc={() => navigation.goBack()}
              outlined
            />
          </View>
          <View style={{ flex: 1 }}>
            <Btn100
              text="Next"
              bg={colors.primaryRed400}
              pressFunc={() => setShowConfirmModal(true)}
            />
          </View>
        </View>
      </ScrollView>
      <ConfirmBookingModal
        visible={showConfirmModal}
        setVisible={setShowConfirmModal}
        setOtherVisible={setShowSuccessModal}
      />
      <SuccessModal
        visible={showSuccessModal}
        setVisible={setShowSuccessModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stepsCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 50,
    marginTop: 15,
  },
  dash: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1.2,
    borderColor: colors.black,
    borderStyle: "dashed",
    flex: 1,
  },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
  },
  innerSection: {
    padding: 15,
    backgroundColor: colors.acentGrey50,
    borderRadius: 5,
    gap: 5,
    marginTop: 15,
    borderColor: colors.acentGrey200,
    borderWidth: 0.5,
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerLeftTxt: {
    color: colors.acentGrey600,
  },
  innerRightTxt: {
    color: colors.secondaryBlue400,
  },
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
});
