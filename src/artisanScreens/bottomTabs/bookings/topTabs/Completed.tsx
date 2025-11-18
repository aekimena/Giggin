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
import { colors, generalStyles } from "../../../../utils";
import { ArtisanBookings } from "../../../../utils/dummyData";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getTimeAgoOrDate } from "./Pending";

interface RenderProps {
  item: ArtisanBookingsProps;
}

const RenderItems = ({ item }: RenderProps) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => navigation.navigate("BookingInView", { data: item })}
      style={{
        padding: 15,
        backgroundColor: colors.primaryRed50,
        borderRadius: 10,
      }}
    >
      <View style={[generalStyles.flexRow, { gap: 10 }]}>
        <View style={[generalStyles.flexRow, { flex: 1, gap: 10 }]}>
          <Image
            source={item.image}
            style={{ height: 40, width: 40, borderRadius: 5 }}
          />
          <View style={{ gap: 4 }}>
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
              {getTimeAgoOrDate(item.updatedTime)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.seperator}></View>
      <View
        style={[generalStyles.flexRow, { alignItems: "flex-end", gap: 10 }]}
      >
        <View style={[generalStyles.flexRow, { flex: 1, gap: 10 }]}>
          <Image
            source={require("../../../../../assets/images/artisanProflie/2.png")}
            style={{ height: 70, width: 90, borderRadius: 10 }}
          />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={[generalStyles.poppins500_fs14, { color: colors.black }]}
            >
              {item.service}
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: "rgba(104, 104, 104, 0.6)" },
              ]}
            >
              {item.bookDate}, {item.bookTime}
            </Text>
            <Text
              style={[generalStyles.poppins500_fs12, { color: colors.black }]}
            >
              GHC {item.startingPrice} - {item.price}
            </Text>
          </View>
        </View>
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
      </View>
    </Pressable>
  );
};

export const Completed = () => {
  const [data, setData] = useState<Array<ArtisanBookingsProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    setData(ArtisanBookings.filter((item) => item.status == "completed"));
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <View style={styles.container}>
      {dataLoading && (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 20, gap: 15, paddingBottom: 50 }}
          renderItem={(item) => <RenderItems {...item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  boxIconCont: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.primaryRed100,
    justifyContent: "center",
    alignItems: "center",
  },
  seperator: {
    marginVertical: 15,
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(133, 133, 133, 0.27)",
  },
  statusCont: {
    width: 80,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
