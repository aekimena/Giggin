import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";
import { PreviousWorkItem } from "../../../components/artisanProfile/PreviousWorkItem";
import { ArtisanOverviewBox } from "../../../components/artisanProfile/OverviewBox";
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

  return (
    <ScreenLayout>
      <Vspacer size={20} />
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
            <ArtisanOverviewBox data={artisanData} />
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
                  <Pressable onPress={() => {}} key={index}>
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
                <PreviousWorkItem work={work} key={index} />
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
    </ScreenLayout>
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
