import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../../../utils";
import { ArtisanBookings } from "../../../../utils/dummyData";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

//function to get time ago
export function getTimeAgoOrDate(givenTimeMillis) {
  const now = new Date();
  const givenTime = new Date(givenTimeMillis);

  const difference = now.getTime() - givenTime.getTime();
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  const weeksDifference = Math.floor(daysDifference / 7);
  const monthsDifference = Math.floor(daysDifference / 30);

  if (daysDifference >= 0 && daysDifference <= 6) {
    if (daysDifference == 0) {
      return "Today";
    }
    return `${daysDifference} days ago`;
  } else if (weeksDifference === 1) {
    return "1 week ago";
  } else if (weeksDifference === 2) {
    return "2 weeks ago";
  } else if (weeksDifference === 3) {
    return "3 weeks ago";
  } else if (monthsDifference === 1) {
    return "1 month ago";
  } else if (monthsDifference === 2) {
    return "2 months ago";
  } else if (monthsDifference === 3) {
    return "3 months ago";
  } else if (monthsDifference === 4) {
    return "4 months ago";
  } else if (monthsDifference === 5) {
    return "5 months ago";
  } else if (monthsDifference === 6) {
    return "6 months ago";
  } else {
    const day = givenTime.getDate();
    const month = givenTime.getMonth() + 1;
    const year = givenTime.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

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
        <View style={[generalStyles.flexRow, { gap: 15 }]}>
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
            onPress={() => Linking.openURL(`tel:${item.clientData.phoneNo}`)}
          >
            <IonIcons name="call" size={15} color={colors.primaryRed400} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
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

        <View
          style={[
            styles.statusCont,
            {
              backgroundColor: "rgba(65, 191, 45, 0.75)",
            },
          ]}
        >
          <Text style={[generalStyles.poppins500_fs12, { color: "#fff" }]}>
            Accepted
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export const Pending = () => {
  const [data, setData] = useState<Array<ArtisanBookingsProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    setData(ArtisanBookings.filter((item) => item.status == "pending"));
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
