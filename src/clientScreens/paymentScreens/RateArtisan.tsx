import {
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../utils";
import { BackIconTitle } from "../../components/BackIconTitle";
import StarRating from "react-native-star-rating-widget";
import { Btn100 } from "../../components/Btn100";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { LeftIconTitleHeader } from "../../components/headers/LeftIconTitleHeader";

const ReviewSentModal = ({ visible, pressFunc }) => {
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
          <Text style={styles.modalTxt}>Your review has been sent</Text>
          <View style={{ marginTop: 70 }}>
            <Btn100
              text="Done"
              bg={colors.primaryRed400}
              pressFunc={pressFunc}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ReviewFailedModal = ({ visible, setVisible }) => {
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
          <Text style={styles.modalTxt}>Your review was not sent</Text>
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

export const RateArtisan = () => {
  const [rating, setRating] = useState(0);
  const [showModal, setModal] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [reviewFailed, setReviewFailed] = useState(false);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.data; // use this to handle rating

  function sendReview() {
    // send review here.
    setReviewSent(true);
  }
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <LeftIconTitleHeader title={"Rate Artisan"} />
        <Image
          source={require("../../../assets/images/payment/3.png")}
          style={{
            height: 120,
            width: 120,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
        <Text
          style={[
            generalStyles.poppins500_fs22,
            { color: colors.black, alignSelf: "center", marginTop: 7 },
          ]}
        >
          Nana Kojo
        </Text>
        <View style={{ marginTop: 50, alignItems: "center", gap: 15 }}>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey400 },
            ]}
          >
            Rate this Artisan Service
          </Text>
          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={25}
            color={colors.primaryRed400}
            emptyColor={colors.primaryRed400}
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <TextInput
            style={[generalStyles.poppins400_fs12, styles.textInput]}
            placeholder="Additional comments"
            placeholderTextColor={colors.acentGrey300}
            multiline
          />
        </View>
        <View style={{ marginTop: 40, gap: 15 }}>
          <Btn100
            text="Submit Review"
            bg={colors.primaryRed400}
            pressFunc={() => {
              sendReview();
            }}
            disabled={rating == 0}
          />
          <Btn100
            text="Not Now"
            outlined
            textCol={colors.primaryRed400}
            pressFunc={() => navigation.navigate("BottomTabs")}
          />
        </View>
        <ReviewSentModal
          visible={reviewSent}
          pressFunc={() => {
            setReviewSent(false);
            navigation.navigate("BottomTabs");
          }}
        />
        <ReviewFailedModal
          visible={reviewFailed}
          setVisible={setReviewFailed}
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
  textInput: {
    minHeight: 80,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    textAlignVertical: "top",
    color: colors.black,
  },
  reviewSentModalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 20,
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
