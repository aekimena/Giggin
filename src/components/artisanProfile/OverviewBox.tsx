import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import IonIcons from "@expo/vector-icons/Ionicons";
const { height } = Dimensions.get("window");

export const ArtisanOverviewBox = ({
  data,
  showAvailability = true,
}: {
  data: ArtisansDataObjProps;
  showAvailability?: boolean;
}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={{}}>
      <View style={styles.section}>
        <View style={styles.mainInfo}>
          <Image
            source={data.image}
            style={{ height: 80, width: 80, borderRadius: 5 }}
          />
          <View style={{ flex: 1, gap: 3 }}>
            <View style={[styles.flexRow, { gap: 5 }]}>
              <Text
                style={[
                  globalStyles.poppins500_fs16,
                  { color: colors.secondaryBlue200 },
                ]}
              >
                {data.name}
              </Text>
              {data.verified && (
                <MaterialIcons
                  name="verified"
                  size={15}
                  color={colors.secondaryBlue400}
                />
              )}
            </View>
            <Text
              style={[
                globalStyles.poppins400_fs14,
                { color: colors.acentGrey500 },
              ]}
            >
              {data.profession}
            </Text>
            <View style={[styles.flexRow, { gap: 10 }]}>
              <View style={styles.flexRow}>
                <IonIcons name="star" color={colors.primaryRed400} size={10} />
                <Text
                  style={[
                    globalStyles.poppins400_fs14,
                    { color: colors.acentGrey400 },
                  ]}
                >
                  {data.rating.toFixed(1)}
                </Text>
              </View>
              <IonIcons
                name="ellipse"
                color={colors.secondaryBlue200}
                size={2}
              />
              <Text
                style={[
                  globalStyles.poppins400_fs12,
                  {
                    color: colors.secondaryBlue100,
                    textDecorationLine: "underline",
                  },
                ]}
                onPress={() => navigation.navigate("RatingsAndReviews")}
              >
                {data.reviews} reviews
              </Text>
            </View>
          </View>
        </View>
        {showAvailability && (
          <>
            <View style={styles.seperator}></View>
            <View style={styles.availableCont}>
              <Text
                style={[
                  globalStyles.poppins500_fs14,
                  { color: colors.forestGreen600 },
                ]}
              >
                Available
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  flexRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 2,
    width: "100%",
    marginVertical: 15,
  },
  availableCont: {
    height: 35,
    width: "100%",
    backgroundColor: colors.forestGreen100,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  section: {
    width: "100%",
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    height: "auto",
    borderRadius: 10,
    padding: 15,
  },
  servicesBox: {
    borderRadius: 3,
    backgroundColor: "rgba(208, 53, 49, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  servicesCont: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 10,
  },
  previousWorkImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
    resizeMode: "contain",
  },
  btnCont: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 15,
  },
  menuBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    marginTop: height * 0.11,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  menuList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
});
