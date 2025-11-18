import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles, month_1 } from "../../../utils";
import { artisanDebts, artisanEarnings } from "../../../utils/dummyData";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function getYesterdayDate(timestamp) {
  const yeaterday = new Date(timestamp);
  const Yday = yeaterday.getDate();
  const Ymonth = month_1[yeaterday.getMonth()];
  return `Yesterday, ${Yday} ${Ymonth}`;
}

export function getDate(timestamp) {
  const unknownDate = new Date(timestamp);
  const Yday = unknownDate.getDate();
  const Ymonth = month_1[unknownDate.getMonth()];
  const year = unknownDate.getFullYear();
  return `${Yday}/${Ymonth}/${year}`;
}

export function getTime(timeStamp) {
  const date = new Date(timeStamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }${hour < 12 ? "am" : "pm"}`;
}

export const Wallet = () => {
  const navigation = useNavigation<any>();
  const [earnings, setEarnings] = useState<Array<ArtisanEarnings>>([]);
  const [debts, setDebts] = useState<Array<ArtisanDebts>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const dateString = new Date();
  const day = dateString.getDate();
  const month = month_1[dateString.getMonth()];
  const _24hrs = 24 * 60 * 60 * 1000;
  const _48hrs = 48 * 60 * 60 * 1000;

  useEffect(() => {
    setEarnings(artisanEarnings.sort((a, b) => b.date - a.date));
    setDebts(artisanDebts.sort((a, b) => b.date - a.date));
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 25,
        flex: 1,
      }}
    >
      <OverviewPagesHeader title="Wallet" hideRightComp />
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}

      {!dataLoading && (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <View
              style={[generalStyles.flexRowCenter, { marginTop: 20, gap: 20 }]}
            >
              <View style={styles.box}>
                <View style={{ alignItems: "center", gap: 15 }}>
                  <Text
                    style={[
                      generalStyles.poppins500_fs16,
                      { color: "rgba(0, 155, 15, 1)" },
                    ]}
                  >
                    Debt Balance
                  </Text>
                  <Text
                    style={[
                      generalStyles.poppins400_fs12,
                      { color: "rgba(0, 155, 15, 1)" },
                    ]}
                  >
                    GHC -2500
                  </Text>
                </View>
              </View>
              <View style={styles.box}>
                <View style={{ alignItems: "center", gap: 15 }}>
                  <Text
                    style={[
                      generalStyles.poppins500_fs16,
                      { color: colors.secondaryBlue100 },
                    ]}
                  >
                    Total Earning
                  </Text>
                  <Text
                    style={[
                      generalStyles.poppins400_fs12,
                      { color: colors.secondaryBlue100 },
                    ]}
                  >
                    GHC 2500
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30, gap: 15 }}>
              <View style={[generalStyles.flexRowBtw]}>
                <Text style={styles.heading}>Earning History</Text>
                <TouchableOpacity
                  style={[generalStyles.flexRow, { gap: 3 }]}
                  onPress={() => navigation.navigate("SeeAllEarnings")}
                >
                  <Text style={styles.seeAll}>See All</Text>
                  <IonIcons
                    name="chevron-forward"
                    size={20}
                    color={colors.primaryRed400}
                  />
                </TouchableOpacity>
              </View>
              {earnings.slice(0, 2).map((item, index) => (
                <Pressable
                  key={index}
                  style={{ gap: 15 }}
                  onPress={() =>
                    navigation.navigate("PaymentInvoice", { data: item })
                  }
                >
                  {Math.abs(item.date - earnings[index - 1]?.date) < _24hrs ||
                    (earnings[index - 1] == null && (
                      <Text
                        style={[
                          generalStyles.poppins400_fs14,
                          { color: colors.acentGrey400 },
                        ]}
                      >
                        {Math.abs(item.date - Date.now()) < _24hrs &&
                          `Today, ${day} ${month}`}
                        {Math.abs(item.date - Date.now()) > _24hrs &&
                          Math.abs(item.date - Date.now()) < _48hrs &&
                          getYesterdayDate(item.date)}
                        {Math.abs(item.date - Date.now()) > _48hrs &&
                          getDate(item.date)}
                      </Text>
                    ))}
                  <View style={styles.renderBox}>
                    <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
                      <Image
                        source={item.image}
                        style={{ height: 70, width: 90, borderRadius: 10 }}
                      />
                      <View style={{ flex: 1, gap: 5 }}>
                        <Text style={styles.name}>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.service}>{item.service}</Text>
                        <Text style={styles.time}>{getTime(item.date)}</Text>
                      </View>
                    </View>
                    <View style={{ gap: 10, alignItems: "flex-end" }}>
                      <Text style={styles.price}>GHC {item.price}</Text>
                      <View
                        style={[
                          styles.statusCont,
                          {
                            backgroundColor:
                              item.status == "awaiting"
                                ? colors.primaryRed100
                                : colors.forestGreen100,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            generalStyles.poppins400_fs12,
                            {
                              color:
                                item.status == "awaiting"
                                  ? "rgba(239, 132, 71, 1)"
                                  : colors.forestGreen600,
                            },
                          ]}
                        >
                          {item.status == "awaiting" ? "Awaiting" : "Settled"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
            <View style={{ marginTop: 30, gap: 15 }}>
              <View style={[generalStyles.flexRowBtw]}>
                <Text style={styles.heading}>Debt Settlement History</Text>
                <TouchableOpacity
                  style={[generalStyles.flexRow, { gap: 3 }]}
                  onPress={() => navigation.navigate("SeeAllDebts")}
                >
                  <Text style={styles.seeAll}>See All</Text>
                  <IonIcons
                    name="chevron-forward"
                    size={20}
                    color={colors.primaryRed400}
                  />
                </TouchableOpacity>
              </View>
              {debts.slice(0, 3).map((item, index) => (
                <Pressable
                  key={index}
                  style={{ gap: 15 }}
                  onPress={() =>
                    navigation.navigate("DebtInvoice", { data: item })
                  }
                >
                  {Math.abs(item.date - earnings[index - 1]?.date) < _24hrs ||
                    (earnings[index - 1] == null && (
                      <Text
                        style={[
                          generalStyles.poppins400_fs14,
                          { color: colors.acentGrey400 },
                        ]}
                      >
                        {Math.abs(item.date - Date.now()) < _24hrs &&
                          `Today, ${day} ${month}`}
                        {Math.abs(item.date - Date.now()) > _24hrs &&
                          Math.abs(item.date - Date.now()) < _48hrs &&
                          getYesterdayDate(item.date)}
                        {Math.abs(item.date - Date.now()) > _48hrs &&
                          getDate(item.date)}
                      </Text>
                    ))}
                  <View style={styles.renderBox}>
                    <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
                      <Image
                        source={item.image}
                        style={{ height: 70, width: 90, borderRadius: 10 }}
                      />
                      <View style={{ flex: 1, gap: 5 }}>
                        <Text style={styles.name}>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.service}>{item.service}</Text>
                        <Text style={styles.time}>{getTime(item.date)}</Text>
                      </View>
                    </View>
                    <View style={{ gap: 10, alignItems: "flex-end" }}>
                      <Text style={styles.price}>-GHC {item.price}</Text>
                      <View
                        style={[
                          styles.statusCont,
                          {
                            backgroundColor:
                              item.status == "pending"
                                ? colors.primaryRed100
                                : colors.forestGreen100,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            generalStyles.poppins400_fs12,
                            {
                              color:
                                item.status == "pending"
                                  ? "rgba(239, 132, 71, 1)"
                                  : colors.forestGreen600,
                            },
                          ]}
                        >
                          {item.status == "pending" ? "Pending" : "Paid"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 7,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: colors.whiteBg,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.acentGrey800,
    elevation: 9,
  },
  renderBox: {
    padding: 15,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusCont: {
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
  },
  heading: {
    ...generalStyles.poppins500_fs14,
    color: colors.acentGrey600,
  },
  seeAll: {
    ...generalStyles.poppins500_fs14,
    color: colors.primaryRed400,
  },
  name: {
    ...generalStyles.poppins500_fs14,
    color: colors.black,
  },
  service: {
    ...generalStyles.poppins500_fs12,
    color: colors.black,
  },
  time: {
    ...generalStyles.poppins500_fs12,
    color: "rgba(104, 104, 104, 0.6)",
  },
  price: {
    ...generalStyles.poppins500_fs14,
    color: colors.black,
  },
});
