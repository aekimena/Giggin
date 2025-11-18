import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { FindClientArtisan } from "../components/FindClient&Artisan";
import { CategoryMappingsFlatList } from "../components/CategoryMappings";
import { artisanCategories } from "../utils/dummyData";
import { useNavigation, useRoute } from "@react-navigation/native";
const { width } = Dimensions.get("window");

export const SeeAllArtisanCategory = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { autoFocus } = route.params;
  const [data, setData] = useState<Array<ArtisanCategoryObjProps>>([]);

  const [dataLoading, setDataLoading] = useState(true);
  const [inputTxt, setInputTxt] = useState("");
  const filterData = data.filter((item) =>
    item.profession.toLowerCase().includes(inputTxt.toLowerCase())
  );

  useEffect(() => {
    // if the categories will be gotten from database, then get them here, else save the data locally just like i did and then keep them in use state.
    setData(artisanCategories);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView
      style={[generalStyles.flex1, { backgroundColor: colors.acentGrey50 }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.acentGrey50} />
      <View style={styles.headers}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons
            name="chevron-back-outline"
            color={colors.acentGrey500}
            size={25}
          />
        </Pressable>

        <View style={{ width: "80%" }}>
          <FindClientArtisan
            placeholder="Find Artisan"
            autoFocus={autoFocus}
            onChangeText={setInputTxt}
          />
        </View>
      </View>
      {dataLoading ? (
        <View style={[generalStyles.allCenter, generalStyles.flex1]}>
          <ActivityIndicator color={colors.primaryRed400} size={"large"} />
        </View>
      ) : (
        <CategoryMappingsFlatList data={inputTxt == "" ? data : filterData} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
});
