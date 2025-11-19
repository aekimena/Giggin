import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import LabelInputIcon from "../../../components/LabelInputIcon";
import { FindClientArtisan } from "../../../components/FindClient&Artisan";
import { CategoryMappings } from "../../../components/CategoryMappings";
import {
  FeaturedArtisansData,
  artisanCategories,
} from "../../../utils/dummyData";
import { FeaturedArtisans } from "../../../components/FeaturedArtisans";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";
import { screenNames } from "../../../navigation/routes";
import { HomeSearchInput } from "../../../components/home/SearchInput";
import { HomeHeader } from "../../../components/home/HomeHeader";
import DisclaimerModal from "../../../modals/DisclaimerModal";

interface HomeProps {
  noOfSlides: number;
  sliderIndex: number;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const Home = () => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const userData: UserDataProps = useSelector(
    (state: any) => state.UserData.userData
  );

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <ScreenLayout backgroundColor={colors.acentGrey50}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Vspacer size={20} />
        <View style={styles.headers}>
          {userData.clientType == "company" && (
            <HomeHeader name={userData.companyName} />
          )}
          {userData.clientType == "individual" && (
            <HomeHeader name={userData.firstName + " " + userData.lastName} />
          )}
          <View>
            <IonIcons
              name="notifications"
              color={colors.primaryRed400}
              size={20}
            />
          </View>
        </View>

        <View
          style={{
            // width: windowWidth * 0.9,
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <HomeSearchInput />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20, gap: 10 }}>
          <View style={[styles.rowBtwCenter]}>
            <Text
              style={[generalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Category
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.primaryRed400 },
              ]}
              onPress={() =>
                navigation.navigate("SeeAllArtisansCategory", {
                  autoFocus: false,
                })
              }
            >
              See All
            </Text>
          </View>
          <CategoryMappings data={artisanCategories.slice(0, 6)} />
        </View>
        <Vspacer size={15} />
        <View style={{ gap: 10 }}>
          <View style={[styles.rowBtwCenter, { paddingHorizontal: 20 }]}>
            <Text
              style={[generalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Featured Artisans
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.primaryRed400 },
              ]}
              onPress={() =>
                navigation.navigate(screenNames.SeeAllFeaturedArtisans)
              }
            >
              See All
            </Text>
          </View>
          <FeaturedArtisans data={FeaturedArtisansData.slice(0, 3)} />
        </View>
        <Vspacer />
      </ScrollView>
      {/* <View style={{ position: "absolute", top: 0, right: 0 }}>
        <Image source={require("../../../../assets/images/home/4.png")} />
      </View> */}
      <DisclaimerModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  leftFlex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  discountBox: {
    width: windowWidth - 30,
    height: 150,
    padding: 15,
    borderRadius: 15,
    overflow: "hidden",
    marginLeft: 15,
  },
  rowBtwCenter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerCircle: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    backgroundColor: colors.primaryRed400,
    position: "absolute",
  },
});
