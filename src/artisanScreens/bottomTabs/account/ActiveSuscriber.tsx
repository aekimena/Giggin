import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles, month_1 } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ArtisanSubscriptionHistory } from "../../../utils/dummyData";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import { PaymentTimeFilter } from "../../../components/PaymentTimeFilter";

interface RenderProps {
  item: ArtisanPaymentHistoryProps;
  itemBefore: ArtisanPaymentHistoryProps;
}

const RenderItems = ({ item, itemBefore }: RenderProps) => {
  const user: UserDataProps = useSelector(selectUserData);
  const isToday = Math.abs(item.time - Date.now()) < 24 * 60 * 60 * 1000;
  const timestampString = item.time;
  const dateObject = new Date(timestampString);
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  // check if time of  item and item before is less than 24 hrs
  const isLess24hrs =
    Math.abs(item.time - itemBefore?.time) / (1000 * 60 * 60) < 24;

  return (
    <>
      {!isLess24hrs && (
        <View style={{ marginBottom: 5 }}>
          {isToday && (
            <Text
              style={styles.timeString}
            >{`Today, ${day} ${month_1[month]}`}</Text>
          )}
          {!isToday && (
            <Text
              style={styles.timeString}
            >{`${day} ${month_1[month]}, ${year}`}</Text>
          )}
        </View>
      )}
      <View style={styles.infoCont}>
        <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
          <Image
            source={
              user.image == null
                ? require("../../../../assets/images/signUp/2.png")
                : { uri: user.image }
            }
            style={styles.image}
          />
          <View style={{ gap: 3, flex: 1 }}>
            <Text
              style={[generalStyles.poppins500_fs14, { color: colors.black }]}
            >
              {user.firstName} {user.lastName}
            </Text>
            <Text
              style={[generalStyles.poppins500_fs12, { color: colors.black }]}
            >
              Premium Subscription
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: colors.acentGrey400 },
              ]}
            >
              Due 31/03/24
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: 10 }}>
          <Text
            style={[generalStyles.poppins500_fs14, { color: colors.black }]}
          >
            GHC {item.price}
          </Text>
          <View style={[generalStyles.allCenter, styles.outerStatus]}>
            <View
              style={[
                generalStyles.allCenter,
                styles.innerStatus,
                {
                  backgroundColor:
                    item.status == "active"
                      ? "rgba(0, 193, 19, 0.16)"
                      : colors.primaryRed100,
                },
              ]}
            >
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  {
                    color:
                      item.status == "active"
                        ? colors.forestGreen600
                        : colors.primaryRed400,
                  },
                ]}
              >
                {item.status == "active" ? "Active" : "Expired"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export const ActiveSuscriber = () => {
  const [data, setData] = useState<Array<ArtisanPaymentHistoryProps>>([]);
  const modifiedData = ArtisanSubscriptionHistory.sort(
    (a, b) => b.time - a.time
  );
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setData(modifiedData);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <OverviewPagesHeader title="Premium Subscription" hideRightComp />
      </View>
      <View
        style={[generalStyles.flexRowBtw, { marginTop: 10, paddingBottom: 15 }]}
      >
        <Text style={[generalStyles.poppins500_fs14, { color: colors.black }]}>
          Payment History
        </Text>
        <PaymentTimeFilter
          setData={setData}
          data={modifiedData}
          timeTitle={"time"}
        />
      </View>
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RenderItems item={item} itemBefore={data[index - 1]} />
          )}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 15, gap: 15 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  infoCont: {
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeString: {
    color: colors.acentGrey400,
    ...generalStyles.poppins400_fs12,
  },
  image: {
    height: 70,
    width: 90,
    borderRadius: 10,
  },
  outerStatus: {
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryRed100,
  },
  innerStatus: {
    height: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
