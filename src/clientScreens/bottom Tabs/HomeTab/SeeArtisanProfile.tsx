import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Btn100 } from "../../../components/Btn100";
import { TopLeftMenuModal } from "../../../components/TopLeftMenuModal";
import { RenderArtisanServices } from "./RenderArtisanServices";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const { height } = Dimensions.get("window");

const SectionHeader = ({ left, right, onRightPress }) => (
  <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
    <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
      {left}
    </Text>
    <Text
      style={[generalStyles.poppins400_fs12, { color: colors.primaryRed400 }]}
      onPress={onRightPress}
    >
      {right}
    </Text>
  </View>
);

export const SeeArtisanProfile = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const artisanData: ArtisansDataObjProps = route.params.item;
  const [TopMenuVisible, setTopMenu] = useState(false);

  function menuPress(item) {
    if (item.value == "1") {
      navigation.navigate("Chats", { artisan: artisanData });
    } else if (item.value == "2") {
      navigation.navigate("ReportArtisan", { artisanData });
    }
    setTopMenu(false);
  }

  useEffect(() => {
    // the best practice would be to fetch artisan's data here, but i'm just
    // passing the data from the previous screen for now
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <StatusBar
        backgroundColor={colors.acentGrey50}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={styles.headers}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons name="chevron-back" color={colors.black} size={20} />
        </Pressable>

        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Artisan Profile
        </Text>
        <Pressable onPress={() => setTopMenu(true)}>
          <IonIcons
            name="alert-circle"
            color={colors.primaryRed400}
            size={25}
          />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 15, marginTop: 20 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.section}>
              <View style={styles.mainInfo}>
                <Image
                  source={artisanData.image}
                  style={{ height: 80, width: 80, borderRadius: 5 }}
                />
                <View style={{ flex: 1, gap: 3 }}>
                  <View style={[styles.flexRow, { gap: 5 }]}>
                    <Text
                      style={[
                        generalStyles.poppins500_fs16,
                        { color: colors.secondaryBlue200 },
                      ]}
                    >
                      {artisanData.name}
                    </Text>
                    {artisanData.verified && (
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
                    {artisanData.profession}
                  </Text>
                  <View style={[styles.flexRow, { gap: 10 }]}>
                    <View style={styles.flexRow}>
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
                        {artisanData.rating.toFixed(1)}
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
                      {artisanData.reviews} reviews
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.availableCont}>
                <Text
                  style={[
                    generalStyles.poppins500_fs14,
                    { color: colors.forestGreen600 },
                  ]}
                >
                  Available
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.section, { paddingHorizontal: 0 }]}>
            <View style={{ paddingHorizontal: 15 }}>
              <SectionHeader
                left={"Gallery"}
                right={"Visit"}
                onRightPress={() =>
                  navigation.navigate("SeeArtisanGallery", { artisanData })
                }
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 10 }}
            >
              <View
                style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
              >
                {artisanData.gallery.map((img, index) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("PhotoInView", { artisanData, index })
                    }
                    key={index}
                  >
                    <Image
                      source={img}
                      style={{ height: 80, width: 80, borderRadius: 10 }}
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{ paddingHorizontal: 15, gap: 10 }}>
            <SectionHeader
              left={"Services"}
              right={"See All"}
              onRightPress={() =>
                navigation.navigate("SeeArtisanServices", { data: artisanData })
              }
            />
            <View style={{ gap: 15 }}>
              {artisanData.completedServices.slice(0, 2).map((item, index) => (
                <RenderArtisanServices item={item} key={item.id} />
              ))}
            </View>
          </View>
          <View style={{ paddingHorizontal: 15, marginBottom: 80 }}>
            <SectionHeader left={"Previous Works"} right={"See All"} />
            <View style={{ gap: 15, marginTop: 10 }}>
              {artisanData.previousWorks.map((work, index) => (
                <View style={styles.section} key={index}>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.flexRow,
                        { alignItems: "flex-start", gap: 10 },
                      ]}
                    >
                      <Image
                        source={work.image}
                        style={styles.previousWorkImage}
                      />
                      <View style={{ gap: 8 }}>
                        <Text
                          style={[
                            generalStyles.poppins500_fs14,
                            { color: colors.secondaryBlue200 },
                          ]}
                        >
                          {work.service}
                        </Text>
                        <Text
                          style={[
                            generalStyles.poppins400_fs14,
                            { color: colors.acentGrey400 },
                          ]}
                        >
                          {work.clientPrdouct}
                        </Text>
                        <View style={styles.flexRow}>
                          <IonIcons
                            name="calendar-clear"
                            color={colors.primaryRed400}
                            size={15}
                          />
                          <Text
                            style={[
                              generalStyles.poppins400_fs14,
                              { color: colors.acentGrey400 },
                            ]}
                          >
                            {work.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text
                        style={[
                          generalStyles.poppins500_fs14,
                          { color: colors.acentGrey600 },
                        ]}
                      >
                        {work.price}GH₵
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnCont}>
        <Btn100
          text="Book"
          bg={colors.primaryRed400}
          pressFunc={() =>
            navigation.navigate("BookingScreens", {
              screen: "BookService",
              params: { artisanData },
            })
          }
        />
      </View>
      <TopLeftMenuModal
        top={height * 0.125}
        optionsArray={[
          { option: "Message Artisan", value: "1", id: "1" },
          {
            option: "Report Artisan",
            value: "2",
            id: "2",
          },
          { option: "Block Artisan", value: "3", id: "3" },
        ]}
        visible={TopMenuVisible}
        setVisible={setTopMenu}
        onSelect={menuPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
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
