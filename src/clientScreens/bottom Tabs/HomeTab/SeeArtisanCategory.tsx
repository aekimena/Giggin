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
import React, { useContext, useEffect, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FeaturedArtisansData } from "../../../utils/dummyData";
import { Btn100 } from "../../../components/Btn100";
import { RenderArtisans } from "../../../components/RenderArtisans";
import { FeesBottomSheet } from "../../../components/bottomSheets/FeesBottomSheet";
import { AppContext } from "../../../context/AppContext";
import { RegionBottomSheet } from "../../../components/bottomSheets/RegionBottomSheet";
import { CityBottomSheet } from "../../../components/bottomSheets/CityBottomSheet";

interface CategoryObj {
  id: string;
  profession: string;
}

const FilterBtn = ({ text, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[generalStyles.allCenter, styles.filterBtn]}
  >
    <Text
      style={[generalStyles.poppins500_fs14, { color: colors.primaryRed400 }]}
    >
      {text}
    </Text>
    <IonIcons name="caret-down" color={colors.primaryRed400} size={15} />
  </TouchableOpacity>
);
export const SeeArtisanCategory = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [minFee, setMinFee] = useState(null);
  const [maxFee, setMaxFee] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const category: CategoryObj = route.params.item;
  const [data, setData] = useState<Array<ArtisansDataObjProps>>([]);

  const filterData: Array<ArtisansDataObjProps> = data.filter(
    (item) =>
      item.price >= parseInt(minFee) &&
      item.price <= parseInt(maxFee) &&
      (selectedRegion == "" ? item : item.region == selectedRegion) &&
      (selectedCity == "" ? item : item.city == selectedCity)
  );

  const [feeFiltered, setFeeFiltered] = useState(false);
  const [regionFiltered, setRegionFiltered] = useState(false);
  const [cityFiltered, setCityFiltered] = useState(false);

  const filterMode = feeFiltered || regionFiltered || cityFiltered; // checks if any filter state is active

  const [dataLoading, setDataLoading] = useState(true);
  // bottom sheet refs
  const { ArtisanFeesRef, ArtisanCityRef, ArtisanRegionRef } =
    useContext(AppContext);

  // check if bottom sheet is active to change the status bar color
  const [BsActive, setBsActive] = useState(false);

  useEffect(() => {
    // get the data here using the passed category data and save it in useState
    const data = FeaturedArtisansData.filter(
      (item) => item.profession === category.profession
    );
    setData(data);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!feeFiltered) {
      setMaxFee(null);
      setMinFee(null);
    }
  }, [feeFiltered]);
  return (
    <SafeAreaView
      style={[generalStyles.flex1, { backgroundColor: colors.acentGrey50 }]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={BsActive ? "rgba(0,0,0,0.3)" : colors.acentGrey50}
      />
      <View style={styles.headers}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons
            name="chevron-back-outline"
            color={colors.black}
            size={25}
          />
        </Pressable>
        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          {category.profession}
        </Text>
        <View style={[generalStyles.allCenter, styles.sliderCont]}>
          <FontAwesome name="sliders" color={colors.black} size={20} />
        </View>
      </View>
      <View style={styles.filterBtnsCont}>
        <FilterBtn text={"Fee"} onPress={() => ArtisanFeesRef.current.open()} />
        <FilterBtn
          text={"Region"}
          onPress={() => ArtisanRegionRef.current.open()}
        />
        <FilterBtn
          text={"City"}
          onPress={() => ArtisanCityRef.current.open()}
        />
      </View>
      {dataLoading ? (
        <View style={[generalStyles.flex1, generalStyles.allCenter]}>
          <ActivityIndicator color={colors.primaryRed400} size={"large"} />
        </View>
      ) : (
        <FlatList
          data={filterMode ? filterData : data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <RenderArtisans {...item} />}
          style={{ marginTop: 20, paddingHorizontal: 15 }}
        />
      )}
      <FeesBottomSheet
        onOpen={() => setBsActive(true)}
        onClose={() => setBsActive(false)}
        setMaxFee={setMaxFee}
        setMinFee={setMinFee}
        setFeeFiltered={setFeeFiltered}
        maxFee={maxFee}
        minFee={minFee}
      />
      <RegionBottomSheet
        onOpen={() => setBsActive(true)}
        onClose={() => setBsActive(false)}
        setFiltered={setRegionFiltered}
        setRegion={setSelectedRegion}
        region={selectedRegion}
      />
      <CityBottomSheet
        onOpen={() => setBsActive(true)}
        onClose={() => setBsActive(false)}
        setFiltered={setCityFiltered}
        setCity={setSelectedCity}
        city={selectedCity}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
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
    paddingVertical: 5,
    flex: 1,
    backgroundColor: colors.whiteBg,
    borderColor: colors.primaryRed400,
    borderWidth: 0.7,
    flexDirection: "row",
    borderRadius: 3,
    gap: 10,
  },
});
