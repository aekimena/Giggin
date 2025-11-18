import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Btn100 } from "./Btn100";
import { colors, generalStyles } from "../utils";
const { width } = Dimensions.get("window");
import IonIcons from "@expo/vector-icons/Ionicons";
import MatIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

interface RenderListProps {
  item: ArtisansDataObjProps;
}

export const RenderArtisans = ({ item }: RenderListProps) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.listCont}>
      <View style={styles.listHeaders}>
        <Image
          source={item.image}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        />
        <View style={styles.listInfoCont}>
          <View style={{ flex: 1, gap: 3 }}>
            <Text
              style={[generalStyles.poppins500_fs12, { color: colors.black }]}
            >
              {item.service}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text
                style={[
                  generalStyles.poppins500_fs16,
                  { color: colors.secondaryBlue200 },
                ]}
              >
                {item.name}
              </Text>
              {item.verified && (
                <MatIcons
                  name="verified"
                  color={colors.secondaryBlue200}
                  size={15}
                />
              )}
            </View>

            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {item.profession}
            </Text>
          </View>
          <View style={{ gap: 7 }}>
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.acentGrey500 },
              ]}
            >
              {item.price}GH₵
            </Text>
            <View
              style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
            >
              <IonIcons
                name="star"
                color={colors.primaryRed400}
                size={10}
                style={{ marginBottom: 3 }}
              />
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.acentGrey500 },
                ]}
              >
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.servicesCont}>
        {item.otherServices.map((service) => (
          <View
            style={[generalStyles.allCenter, styles.servicesBox]}
            key={service}
          >
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: colors.primaryRed400 },
              ]}
            >
              {service}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Btn100
          text="View Profile"
          bg={colors.primaryRed400}
          pressFunc={() => navigation.navigate("SeeArtisanProfile", { item })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listCont: {
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    width: "100%",
    height: "auto",
    padding: 15,
  },
  listHeaders: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  listInfoCont: {
    flexDirection: "row",
    alignItems: "flex-end",
    flex: 1,
    gap: 10,
  },
  servicesCont: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 20,
  },
  servicesBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "rgba(208, 53, 49, 0.08)",
  },
});
