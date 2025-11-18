import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ArtisanJobs } from "../../utils/dummyData";

interface RenderProps {
  item: JobsProp;
}

const RenderItems = ({ item }: RenderProps) => {
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
              backgroundColor: "rgba(65, 191, 45, 0.75)",
            },
          ]}
        >
          <Text style={[generalStyles.poppins500_fs12, { color: "#fff" }]}>
            Accepted
          </Text>
        </View>
        <View style={[generalStyles.flexRow, { gap: 15 }]}>
          <View style={styles.boxIconCont}>
            <IonIcons
              name="chatbubble"
              size={15}
              color={colors.primaryRed400}
            />
          </View>
          <View style={styles.boxIconCont}>
            <IonIcons name="call" size={15} color={colors.primaryRed400} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const PendingJobs = () => {
  const [data, setData] = useState<Array<JobsProp>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setData(ArtisanJobs.filter((item) => item.status == "pending"));
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader title="Pending Orders" />
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
          contentContainerStyle={{ gap: 15, paddingTop: 20, paddingBottom: 20 }}
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
