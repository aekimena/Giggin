import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import { artisanRatings } from "../../../utils/dummyData";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";
import { RenderReviews } from "../../../components/artisanProfile/RenderReviews";

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
    <ScreenLayout>
      <Vspacer size={20} />
      <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
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
    </ScreenLayout>
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
