import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles, month_2 } from "../../../utils";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Btn100 } from "../../../components/Btn100";
import IonIcons from "@expo/vector-icons/Ionicons";
import { AddImageModal } from "../../../components/AddImageModal";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { LeftIconTitleHeader } from "../../../components/headers/LeftIconTitleHeader";
import { ConfirmModal } from "../../../modals/ConfirmModal";

const ReviewSentModal = ({ visible, setVisible, successful }) => {
  const navigation = useNavigation<any>();

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.reviewSentModalCont}>
        <View style={[styles.section, { gap: 10 }]}>
          <Image
            source={
              successful
                ? require("../../../../assets/images/artisanBookings/8.png")
                : require("../../../../assets/images/artisanBookings/9.png")
            }
            style={{ alignSelf: "center" }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            {successful
              ? "Work Confirmation\nSuccessful"
              : "Work Confirmation\nUnsuccessful"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export const WorkDone = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.passedData;
  const dateObj = new Date();
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const timeString = `${hour < 10 ? "0" + hour : hour}: ${
    minute < 10 ? "0" + minute : minute
  }${hour < 12 ? "am" : "pm"}`;
  const dateString = `${date} ${month_2[month]}, ${year} - ${timeString}`;
  const [showAddImageModal, setAddImageModal] = useState(false);
  const [showDeleteImageModal, setDeleteImageModal] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showReviewModal, setReviewModal] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    // check if review has been sent
    if (reviewSent && showReviewModal) {
      setTimeout(() => {
        setReviewModal(false);
        navigation.replace("PaymentScreens", {
          screen: "MakePayment",
          params: { data: passedData },
        });
      }, 1500);
    } else {
      setTimeout(() => {
        setReviewModal(false);
      }, 1000);
    }
  }, [showReviewModal, reviewSent]);
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <LeftIconTitleHeader title={"Work Done"} />
        <View style={{ marginTop: 20, alignItems: "center", gap: 10 }}>
          <Text
            style={[generalStyles.poppins400_fs14, { color: colors.black }]}
          >
            Upload a picture of the work done
          </Text>
          {image == null && (
            <Pressable
              onPress={() => setAddImageModal(true)}
              style={[styles.section, generalStyles.allCenter, { height: 200 }]}
            >
              <View>
                <Image
                  source={require("../../../../assets/images/artisanBookings/7.png")}
                  style={styles.placeholderImage}
                />
              </View>
            </Pressable>
          )}
          {image !== null && (
            <Pressable
              style={{ width: "100%" }}
              onPress={() => setAddImageModal(true)}
            >
              <Image
                source={{ uri: image }}
                style={{
                  height: 200,
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
            </Pressable>
          )}
        </View>
        <View style={{ gap: 15, marginTop: 30 }}>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Date Completed
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins400_fs12]}>
              {dateString}
            </Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Time Completed
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins400_fs12]}>
              {timeString}
            </Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Artisan
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins400_fs12]}>
              {passedData.provider.name}
            </Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Address
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins400_fs12]}>
              {passedData.address}
            </Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Price
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins400_fs16]}>
              500GH₵
            </Text>
          </View>
        </View>
        <View style={styles.btnCont}>
          <Btn100
            text="Confirm Work"
            bg={colors.primaryRed400}
            pressFunc={() => setConfirmModal(true)}
          />
        </View>
        <AddImageModal
          setVisible={setAddImageModal}
          visible={showAddImageModal}
          onSelect={setImage}
          onDelete={setImage}
        />
        <ConfirmModal
          visible={showConfirmModal}
          setVisible={setConfirmModal}
          setOtherVisible={setReviewModal}
          setReviewSent={setReviewSent}
          onPressConfirm={() => {
            setReviewModal(true);
            setConfirmModal(false);
            setReviewSent(true);
          }}
          title="Confirm This Job is done?"
          subtitle="Do you want to confirm that this job is done?"
        />
        <ReviewSentModal
          visible={showReviewModal}
          setVisible={setReviewModal}
          successful={reviewSent}
        />
      </View>
    </ScreenLayout>
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
    borderRadius: 7,
  },
  flexRowBtw: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  innerLeftTxt: {
    color: colors.acentGrey600,
  },
  innerRightTxt: {
    color: colors.secondaryBlue200,
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    alignSelf: "center",
  },
  placeholderImage: {
    height: 90,
    width: 90,
    // borderWidth: 1,
    resizeMode: "contain",
  },

  optionIconCont: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  seperator: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.acentGrey200,
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  modalBox: {
    padding: 15,
    minHeight: 200,
    backgroundColor: colors.acentGrey200,
    borderRadius: 10,
    width: "100%",
    gap: 10,
  },
  modalTerms: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
    flexDirection: "row",
    marginTop: 40,
  },
  modalHeaderTxtCont: { alignItems: "center", marginTop: 20, gap: 7 },
  reviewSentModalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
});
