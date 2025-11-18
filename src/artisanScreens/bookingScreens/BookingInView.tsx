import {
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../utils";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";

const ProgressView = ({ title, time, completed, isLastIndex }) => {
  const route = useRoute<any>();
  const passedData: ArtisanBookingsProps = route.params.data;
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
                ? require("../../../assets/images/artisanBookings/5.png")
                : require("../../../assets/images/artisanBookings/6.png")
            }
            style={{ height: 60, resizeMode: "contain" }}
          />
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <View style={{ gap: 5 }}>
          <Text
            style={[generalStyles.poppins500_fs14, { color: colors.black }]}
          >
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
        {title == "Payment Made" && (
          <View
            style={[
              styles.paymentStatusCont,
              {
                backgroundColor:
                  passedData.paymentMethod !== "offline"
                    ? "rgba(65, 191, 45, 0.75)"
                    : colors.primaryRed400,
              },
            ]}
          >
            <Text style={[generalStyles.poppins500_fs12, { color: "#fff" }]}>
              {passedData.paymentMethod == "offline"
                ? "Offline Payment"
                : "Online Payment"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export const BookingInView = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisanBookingsProps = route.params.data;
  const [inputTxt, setInputTxt] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader
        title={passedData.service}
        bookingStatus={
          passedData.status == "pending"
            ? "Pending"
            : passedData.status == "completed"
            ? "Completed"
            : "Cancelled"
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          source={require("../../../assets/images/artisanProflie/2.png")}
          style={styles.image}
        />
        <View style={{ marginTop: 20, gap: 10 }}>
          <Text
            style={[generalStyles.poppins600_fs16, { color: colors.black }]}
          >
            {passedData.service}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, lineHeight: 28 },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            laboriosam. At labore vero alias laborum quaerat dolores beatae
            laboriosam adipisci.
          </Text>
        </View>
        {/*  */}
        <View
          style={[
            styles.jobsNotifCont,
            passedData.status == "cancelled" && { alignItems: "flex-end" },
          ]}
        >
          <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
            <Image
              source={passedData.image}
              style={{ height: 70, width: 90, borderRadius: 10 }}
            />
            <View style={{ gap: 2, flex: 1 }}>
              <Text
                style={[
                  generalStyles.poppins500_fs14,
                  { color: colors.black, flex: 1 },
                ]}
              >
                {passedData.firstName} {passedData.lastName}
              </Text>

              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: "rgba(104, 104, 104, 0.6)" },
                ]}
              >
                {passedData.bookDate}, {passedData.bookTime}
              </Text>
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: colors.black, maxWidth: 100, lineHeight: 21 },
                ]}
              >
                GHC {passedData.startingPrice} - {passedData.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              gap: 15,
              alignItems: "flex-end",
            }}
          >
            {!passedData.ongoing && passedData.status !== "cancelled" && (
              <View
                style={[
                  styles.statusCont,
                  {
                    backgroundColor:
                      passedData.status == "pending"
                        ? "rgba(65, 191, 45, 0.75)"
                        : colors.primaryRed400,
                  },
                ]}
              >
                <Text
                  style={[generalStyles.poppins500_fs12, { color: "#fff" }]}
                >
                  {passedData.status == "pending" && "Accepted"}
                  {passedData.status == "completed" && "Completed"}
                </Text>
              </View>
            )}
            {passedData.ongoing && (
              <View
                style={[
                  styles.statusCont,
                  {
                    backgroundColor: colors.secondaryBlue200,
                  },
                ]}
              >
                <Text
                  style={[generalStyles.poppins500_fs12, { color: "#fff" }]}
                >
                  Ongoing
                </Text>
              </View>
            )}
            {passedData.status == "cancelled" && (
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: colors.primaryRed400 },
                ]}
              >
                Cancelled
              </Text>
            )}
            {passedData.status == "pending" && (
              <View style={[generalStyles.flexRow, { gap: 15 }]}>
                <TouchableOpacity
                  style={styles.boxIconCont}
                  onPress={() =>
                    navigation.navigate("Chats", {
                      client: passedData.clientData,
                    })
                  }
                >
                  <IonIcons
                    name="chatbubble"
                    size={15}
                    color={colors.primaryRed400}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.boxIconCont}
                  onPress={() =>
                    Linking.openURL(`tel:${passedData.clientData.phoneNo}`)
                  }
                >
                  <IonIcons
                    name="call"
                    size={15}
                    color={colors.primaryRed400}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        {passedData.status == "completed" && (
          <View style={styles.textinputCont}>
            <TextInput
              placeholder="Input Final Fee"
              placeholderTextColor={colors.acentGrey500}
              keyboardType="number-pad"
              onChangeText={setInputTxt}
              style={[
                generalStyles.poppins600_fs16,
                { flex: 1, height: "100%", color: colors.black },
              ]}
            />
            <Pressable
              style={({ pressed }) => [
                styles.enterFeeBtn,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "transparenr",
                },
              ]}
              disabled={inputTxt == ""}
              onPress={() =>
                navigation.navigate("SendInvoice", {
                  data: { ...passedData, finalFee: inputTxt },
                })
              }
            >
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: colors.acentGrey500, lineHeight: 18 },
                ]}
              >
                Enter Fee Charged
              </Text>
            </Pressable>
          </View>
        )}
        {/*  */}
        {passedData.status !== "cancelled" && (
          <View style={[styles.box, { marginTop: 20, gap: 10 }]}>
            <ProgressView
              title={"Booking Accepted"}
              time={"30:00pm"}
              completed={true}
            />
            <ProgressView
              title={"Job Onging"}
              time={"30:00pm"}
              completed={true}
            />
            <ProgressView
              title={"Job Completed"}
              time={"30:00pm"}
              completed={true}
            />
            <ProgressView
              title={"Payment Made"}
              time={"30:00pm"}
              completed={true}
              isLastIndex={true}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  image: {
    height: 250,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
  },
  jobsNotifCont: {
    padding: 15,
    backgroundColor: "rgba(255, 195, 192, 0.1)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },
  statusCont: {
    width: 80,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  boxIconCont: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.primaryRed50,
    justifyContent: "center",
    alignItems: "center",
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
  box: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 7,
  },
  paymentStatusCont: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    height: 26,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  textinputCont: {
    paddingHorizontal: 15,
    backgroundColor: colors.whiteBg,
    height: 60,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  enterFeeBtn: {
    height: 40,
    width: 130,
    borderRadius: 10,
    borderColor: "rgba(65, 191, 45, 0.5)",
    borderWidth: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
