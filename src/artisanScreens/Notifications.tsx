import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../utils";
import { OverviewPagesHeader } from "../components/OverviewPagesHeader";
import { ArtisanJobs, ArtisanNewOrders } from "../utils/dummyData";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";

interface RenderProps {
  item: AllNotificationProps;
}

// so here's what happened here: all notifications are joined here, if it's a job notification
// or an order notification.
// the data structure i used combined both data structures, so they can be displayed together.

const RenderItems = ({ item }: RenderProps) => {
  const navigation = useNavigation<any>();
  const isJobNotif = item.status !== null && item.status !== undefined; // if it's a job notification
  if (isJobNotif) {
    return (
      <View style={styles.jobsNotifCont}>
        <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
          <Image
            source={item.image}
            style={{ height: 70, width: 90, borderRadius: 10 }}
          />
          <View style={{ gap: 2, flex: 1 }}>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.black, flex: 1 },
              ]}
            >
              {item.firstName} {item.lastName}
            </Text>

            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: "rgba(104, 104, 104, 0.6)" },
              ]}
            >
              {item.date}, {item.time}
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: colors.black, maxWidth: 100, lineHeight: 21 },
              ]}
            >
              GHC {item.startingPrice} - {item.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            gap: 15,
            alignItems: "flex-end",
          }}
        >
          <View
            style={[
              styles.statusCont,
              {
                backgroundColor:
                  item.status == "pending"
                    ? "rgba(65, 191, 45, 0.75)"
                    : colors.primaryRed400,
              },
            ]}
          >
            <Text style={[generalStyles.poppins500_fs12, { color: "#fff" }]}>
              {item.status == "pending" ? "Accepted" : "Completed"}
            </Text>
          </View>
          {item.status == "completed" && (
            <View style={[generalStyles.flexRow, { gap: 3 }]}>
              <IonIcons
                name="star"
                color={colors.primaryRed400}
                size={10}
                style={{ marginBottom: 2 }}
              />
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  {
                    color: colors.primaryRed400,
                    lineHeight: 18,
                  },
                ]}
              >
                {item.clientRating.toFixed(1)}
              </Text>
            </View>
          )}
          {item.status == "pending" && (
            <View style={[generalStyles.flexRow, { gap: 15 }]}>
              {/* <View style={styles.boxIconCont}>
                <IonIcons
                  name="chatbubble"
                  size={15}
                  color={colors.primaryRed400}
                />
              </View>
              <View style={styles.boxIconCont}>
                <IonIcons name="call" size={15} color={colors.primaryRed400} />
              </View> */}
              <TouchableOpacity
                style={styles.boxIconCont}
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate("Chats", { client: item.clientData })
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
                activeOpacity={0.6}
                onPress={() =>
                  Linking.openURL(`tel:${item.clientData.phoneNo}`)
                }
              >
                <IonIcons name="call" size={15} color={colors.primaryRed400} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
  return (
    <Pressable
      style={[styles.itemCont]}
      onPress={() => navigation.navigate("OrderDetails", { data: item })}
    >
      <View style={[generalStyles.flexRowCenter, { gap: 10, flex: 1 }]}>
        <Image
          source={item.image}
          style={{ height: 70, width: 90, borderRadius: 10 }}
        />
        <View style={{ flex: 1, gap: 5 }}>
          <Text
            style={[generalStyles.poppins500_fs14, { color: colors.black }]}
          >
            {item.firstName} {item.lastName}
          </Text>
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: "rgba(104, 104, 104, 0.6)" },
            ]}
          >
            {item.date}, {item.time}
          </Text>
          <Text
            style={[
              generalStyles.poppins500_fs14,
              { color: colors.black, maxWidth: 100, lineHeight: 21 },
            ]}
          >
            {item.service}
          </Text>
        </View>
      </View>
      <Text
        style={[
          generalStyles.poppins500_fs12,
          { color: colors.primaryRed400, lineHeight: 18 },
        ]}
      >
        GHC {item.startingPrice} - {item.price}
      </Text>
    </Pressable>
  );
};

export const Notifications = () => {
  const [data, setData] = useState<Array<AllNotificationProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // fetch all notifications here. the shuffling is just for development mode. remove it in prod.
    setData(
      [...ArtisanNewOrders, ...ArtisanJobs].sort(() => Math.random() - 0.5)
    );

    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader title="General Notifications" />
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <RenderItems {...item} />}
          contentContainerStyle={{ gap: 15, paddingTop: 20, paddingBottom: 50 }}
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
  itemCont: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  jobsNotifCont: {
    padding: 15,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-start",
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
    backgroundColor: colors.primaryRed100,
    justifyContent: "center",
    alignItems: "center",
  },
});
