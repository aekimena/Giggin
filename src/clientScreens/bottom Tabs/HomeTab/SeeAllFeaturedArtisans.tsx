import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FeaturedArtisansData } from "../../../utils/dummyData";
import { Btn100 } from "../../../components/Btn100";
import { RenderArtisans } from "../../../components/RenderArtisans";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { LeftIconTitleHeader } from "../../../components/headers/LeftIconTitleHeader";
export const SeeAllFeaturedArtisans = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<Array<ArtisansDataObjProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // get the featured artisans data from database and keep it in useState
    const data = FeaturedArtisansData;
    setData(data);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <ScreenLayout>
      <View style={{ paddingHorizontal: 20 }}>
        <LeftIconTitleHeader title={"Featured Artisans"} />
      </View>

      {dataLoading ? (
        <View style={[generalStyles.flex1, generalStyles.allCenter]}>
          <ActivityIndicator color={colors.primaryRed400} size={"large"} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <RenderArtisans {...item} />}
          style={{ paddingHorizontal: 15 }}
          contentContainerStyle={{ gap: 15, paddingVertical: 15 }}
        />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headers: {
    gap: 5,

    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  sliderCont: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: colors.whiteBg,
  },
  filterBtnsCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 15,
  },
  filterBtn: {
    paddingVertical: 8,
    flex: 1,
    backgroundColor: colors.whiteBg,
    borderColor: colors.primaryRed400,
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 3,
    gap: 10,
  },
});
