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
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import { artisanRatings } from "../../../utils/dummyData";
import IonIcons from "@expo/vector-icons/Ionicons";

interface RenderProps {
  item: ArtisanRatingsProps;
}

const RenderReviews = ({ item }: RenderProps) => {
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
        <Image
          source={item.image}
          style={{ height: 80, width: 80, borderRadius: 10 }}
        />
        <View style={{ gap: 10, flex: 1 }}>
          <Text
            style={[
              generalStyles.poppins500_fs16,
              { color: colors.secondaryBlue200 },
            ]}
          >
            {item.firstName + " " + item.lastName}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey500 },
            ]}
          >
            {item.review}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <IonIcons
          name="star"
          color={colors.primaryRed400}
          size={10}
          style={{ marginBottom: 3 }}
        />
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.primaryRed400 },
          ]}
        >
          {item.rating.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export const RatingsAndReviews = () => {
  const [data, setData] = useState<Array<ArtisanRatingsProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setData(artisanRatings);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
    setDataLoading(false);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Ratings and Reviews"} />
      </View>
      {dataLoading && (
        <View style={[generalStyles.flex1, generalStyles.allCenter]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 15, gap: 15 }}
          renderItem={({ item }) => <RenderReviews item={item} />}
        />
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
  box: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    width: "100%",
  },
});
