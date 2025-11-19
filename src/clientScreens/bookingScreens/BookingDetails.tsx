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
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { Vspacer } from "../../components/Vspacer";
import { ConfirmModal } from "../../modals/ConfirmModal";
import { SuccessModal } from "../../modals/SuccessModal";

export const BookingDetails = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const artisanData: ArtisansDataObjProps = route.params.data.artisanData;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { date, time, address, description } = route.params.data;
  return (
    <ScreenLayout>
      <Vspacer />
      <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
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
      <ConfirmModal
        visible={showConfirmModal}
        setVisible={setShowConfirmModal}
        setOtherVisible={setShowSuccessModal}
        onPressConfirm={() => {
          setShowConfirmModal(false);
          setShowSuccessModal(true);
        }}
        title="Confirm Booking"
        subtitle="Do you want to confirm this booking?"
      />
      <SuccessModal
        visible={showSuccessModal}
        setVisible={setShowSuccessModal}
        data={artisanData}
        date={date}
        time={time}
      />
    </ScreenLayout>
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
});
