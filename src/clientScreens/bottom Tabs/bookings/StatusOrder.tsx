import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../../../utils";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BookingInfo } from "../../../components/BookingInfo";
import { Btn100 } from "../../../components/Btn100";

const ProgressView = ({ title, time, completed, isLastIndex }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
      <View style={{ alignItems: "center", gap: 5 }}>
        <View style={[generalStyles.allCenter, styles.outerCircle]}>
          {completed && <View style={styles.innerCircle}></View>}
        </View>
        {!isLastIndex && (
          <Image
            source={
              completed
                ? require("../../../../assets/images/artisanBookings/5.png")
                : require("../../../../assets/images/artisanBookings/6.png")
            }
            style={{ height: 60, resizeMode: "contain" }}
          />
        )}
      </View>
      <View style={{ gap: 5 }}>
        <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
          {title}
        </Text>
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { color: colors.acentGrey500 },
          ]}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export const StatusOrder = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.passedData;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 15,
      }}
    >
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Status Order"} />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 10 }}>
          <BookingInfo
            image={passedData.image}
            service={passedData.service}
            clientProduct={passedData.clientProduct}
            dateTime={passedData.dateTime}
            address={passedData.address}
            provider={passedData.provider}
            status={passedData.status}
          />
        </View>
        <View style={[styles.section, { marginTop: 20, gap: 10 }]}>
          <ProgressView
            title={"Booking Accepted"}
            time={"30:00pm"}
            completed={true}
          />
          <ProgressView
            title={"Job Completed"}
            time={"30:00pm"}
            completed={false}
          />
          <ProgressView
            title={"Booking Cancelled By Artisan"}
            time={"30:00pm"}
            completed={false}
          />
          <ProgressView
            title={"Payment Made"}
            time={"30:00pm"}
            completed={false}
            isLastIndex={true}
          />
        </View>
      </ScrollView>
      {passedData.status == "Pending" && (
        <View style={styles.btnCont}>
          <Btn100
            text="Check Out"
            bg={colors.primaryRed400}
            pressFunc={() => navigation.navigate("WorkDone", { passedData })}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 7,
  },
  outerCircle: {
    backgroundColor: colors.primaryRed100,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
  innerCircle: {
    height: 15,
    width: 15,
    backgroundColor: colors.primaryRed400,
    borderRadius: 15 / 2,
  },
  btnCont: {
    bottom: 20,
    backgroundColor: colors.acentGrey50,
    paddingTop: 10,
  },
});
