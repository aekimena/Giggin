import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles, month_1 } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ArtisanPaymentHistory } from "../../../utils/dummyData";
import { useNavigation } from "@react-navigation/native";
import { PaymentTimeFilter } from "../../../components/PaymentTimeFilter";

interface RenderProps {
  item: ArtisanPaymentDataProps;
  paymentBefore: ArtisanPaymentDataProps;
  paymentAfter: ArtisanPaymentDataProps;
}

const RenderPayments = ({ item, paymentBefore, paymentAfter }: RenderProps) => {
  const navigation = useNavigation<any>();
  const timestampString = item.paymentTime;
  const timestamp = timestampString;
  const dateObject = new Date(timestamp);
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  const isToday = Math.abs(item.paymentTime - Date.now()) < 24 * 60 * 60 * 1000;
  const isYesterDay =
    Math.abs(item.paymentTime - Date.now()) > 24 * 60 * 60 * 1000 &&
    Math.abs(item.paymentTime - Date.now()) < 48 * 60 * 60 * 1000;
  const dateString = `${day}/${month}/${year}`;
  const timeString = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  } ${hour < 12 ? "am" : "pm"}`;

  const displayString = `${
    isToday ? "Today" : isYesterDay ? "Yesterday" : dateString
  }, ${timeString}`;
  // check if time diff btw payment and payment before is less that 24 hrs
  const paymentBeforeWithin24Hrs =
    Math.abs(item.paymentTime - paymentBefore?.paymentTime) <
    24 * 60 * 60 * 1000;
  // check if time diff btw payment and payment after is less that 24 hrs
  const paymentAfterWithin24Hrs =
    Math.abs(item.paymentTime - paymentAfter?.paymentTime) <
    24 * 60 * 60 * 1000;
  return (
    <View>
      {!paymentBeforeWithin24Hrs && (
        <View style={{ marginVertical: 10 }}>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.acentGrey400 },
            ]}
          >
            {isToday
              ? `Today, ${day} ${month_1[month - 1]}`
              : isYesterDay
              ? `Yesterday, ${day} ${month_1[month - 1]}`
              : dateString}
          </Text>
        </View>
      )}
      <Pressable
        onPress={() => navigation.navigate("Receipt", { data: item })}
        style={({ pressed }) => [
          styles.paymentBox,
          {
            backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "#fff",
            borderWidth: 0.8,
            borderTopWidth: paymentBeforeWithin24Hrs ? 0 : 0.8,
            borderBottomWidth: paymentAfterWithin24Hrs ? 0 : 0.8,
            borderColor: colors.acentGrey200,
            borderTopLeftRadius: paymentBeforeWithin24Hrs ? 0 : 10,
            borderTopRightRadius: paymentBeforeWithin24Hrs ? 0 : 10,
            borderBottomLeftRadius: paymentAfterWithin24Hrs ? 0 : 10,
            borderBottomRightRadius: paymentAfterWithin24Hrs ? 0 : 10,
          },
        ]}
      >
        <View style={[styles.flexRow, { gap: 10 }]}>
          <Image source={item.image} style={styles.image} />
          <View style={{ gap: 7 }}>
            <Text
              style={[
                generalStyles.poppins500_fs16,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {item.clientName}
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.acentGrey400 },
              ]}
            >
              {displayString}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: 7 }}>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.primaryRed400 },
            ]}
          >
            {item.amount}GH₵
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.acentGrey500 },
            ]}
          >
            {item.paymentMethod == "cash" ? "Cash" : "Mobile Money"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export const PaymentHistory = () => {
  const [data, setData] = useState<Array<ArtisanPaymentDataProps>>([]);
  const modifiedData = ArtisanPaymentHistory.sort(
    (a, b) => b.paymentTime - a.paymentTime
  );
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // fetch the payment history here.

    setData(modifiedData);
    setDataLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={styles.headerCont}>
        <BackIconTitle title={"Payments"} />
        <PaymentTimeFilter
          setData={setData}
          data={modifiedData}
          timeTitle={"paymentTime"}
        />
      </View>
      {dataLoading && (
        <View style={[generalStyles.allCenter, generalStyles.flex1]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }: any) => (
              <RenderPayments
                item={item}
                paymentBefore={data[index - 1]}
                paymentAfter={data[index + 1]}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 15,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerCont: {
    marginTop: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentBox: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 0,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
});
