import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../navigation/routes";

interface Props {
  data: Array<ArtisansDataObjProps>;
}
const { width } = Dimensions.get("window");

export const FeaturedArtisans = ({ data }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 15 }}
    >
      {data.map((item) => (
        <Pressable
          style={styles.itemCont}
          key={item.id}
          onPress={() =>
            navigation.navigate(screenNames.SeeArtisanProfile, { item })
          }
        >
          <Image source={item.image} style={{ width: "100%", height: 110 }} />
          <View style={styles.infoCont}>
            <View style={{ gap: 10, flex: 1 }}>
              <Text
                style={[generalStyles.poppins500_fs14, { color: colors.black }]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.acentGrey400 },
                ]}
              >
                {item.profession}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <IonIcons
                name="star"
                color={colors.primaryRed400}
                size={10}
                style={{ marginBottom: 3 }}
              />
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.primaryRed400 },
                ]}
              >
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemCont: {
    width: width * 0.5,
    height: "auto",
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    borderRadius: 10,
    overflow: "hidden",
  },
  infoCont: {
    padding: 10,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
