import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { colors, generalStyles } from "../../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RenderArtisanServices } from "./RenderArtisanServices";

export const SeeArtisanServices = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisansDataObjProps = route.params.data;

  useEffect(() => {
    // please fetch the services here, and then save the array in usestate. i'm passing the data for now.
  }, []);

  const ListHeader = () => {
    return (
      <>
        <View style={styles.section}>
          <View style={styles.mainInfo}>
            <Image
              source={passedData.image}
              style={{ height: 80, width: 80, borderRadius: 5 }}
            />
            <View style={{ flex: 1, gap: 3 }}>
              <View style={[generalStyles.flexRow, { gap: 5 }]}>
                <Text
                  style={[
                    generalStyles.poppins500_fs16,
                    { color: colors.secondaryBlue200 },
                  ]}
                >
                  {passedData.name}
                </Text>
                {passedData.verified && (
                  <MaterialIcons
                    name="verified"
                    size={15}
                    color={colors.secondaryBlue400}
                  />
                )}
              </View>
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.acentGrey500 },
                ]}
              >
                {passedData.profession}
              </Text>
              <View style={[generalStyles.flexRow, { gap: 10 }]}>
                <View style={[generalStyles.flexRow, { gap: 3 }]}>
                  <IonIcons
                    name="star"
                    color={colors.primaryRed400}
                    size={10}
                  />
                  <Text
                    style={[
                      generalStyles.poppins400_fs14,
                      { color: colors.acentGrey400 },
                    ]}
                  >
                    {passedData.rating.toFixed(1)}
                  </Text>
                </View>
                <IonIcons
                  name="ellipse"
                  color={colors.secondaryBlue200}
                  size={2}
                />
                <Text
                  style={[
                    generalStyles.poppins400_fs12,
                    {
                      color: colors.secondaryBlue100,
                      textDecorationLine: "underline",
                    },
                  ]}
                  onPress={() => navigation.navigate("RatingsAndReviews")}
                >
                  {passedData.reviews} reviews
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </View>
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.black, marginTop: 20 },
          ]}
        >
          Services
        </Text>
      </>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 15,
      }}
    >
      <View style={styles.headers}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
        >
          <IonIcons name="chevron-back" color={colors.black} size={20} />
        </Pressable>

        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Artisan Profile
        </Text>
      </View>

      <FlatList
        data={passedData.completedServices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <RenderArtisanServices {...item} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 50, gap: 15 }}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 2,
    width: "100%",
    marginVertical: 15,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
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
});
