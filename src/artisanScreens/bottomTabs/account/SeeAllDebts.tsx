import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles, month_1 } from "../../../utils";
import { artisanDebts } from "../../../utils/dummyData";
import { getDate, getTime, getYesterdayDate } from "./Wallet";
import { useNavigation } from "@react-navigation/native";
import { PaymentTimeFilter } from "../../../components/PaymentTimeFilter";

const dateString = new Date();
const day = dateString.getDate();
const month = month_1[dateString.getMonth()];
const _24hrs = 24 * 60 * 60 * 1000;
const _48hrs = 48 * 60 * 60 * 1000;

const RenderItem = ({ item, debts, index }) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      key={index}
      style={{ gap: 15 }}
      onPress={() => navigation.navigate("DebtInvoice", { data: item })}
    >
      {Math.abs(item.date - debts[index - 1]?.date) < _24hrs ||
        (debts[index - 1] == null && (
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
            {Math.abs(item.date - Date.now()) > _48hrs && getDate(item.date)}
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
  );
};

export const SeeAllDebts = () => {
  const [debts, setDebts] = useState<Array<ArtisanDebts>>([]);
  const modifiedData = artisanDebts.sort((a, b) => b.date - a.date);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    setDebts(modifiedData);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 25,
      }}
    >
      <OverviewPagesHeader title="Debt Settlement" hideRightComp />
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <>
          <View style={[generalStyles.flexRowBtw, { paddingBottom: 15 }]}>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.acentGrey600 },
              ]}
            >
              Earning History
            </Text>
            <PaymentTimeFilter
              data={modifiedData}
              setData={setDebts}
              timeTitle={"date"}
            />
          </View>
          <FlatList
            data={debts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RenderItem item={item} index={index} debts={debts} />
            )}
            contentContainerStyle={{ paddingBottom: 50, gap: 15 }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
