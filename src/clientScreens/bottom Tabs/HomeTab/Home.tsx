import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

interface HomeProps {
  noOfSlides: number;
  sliderIndex: number;
}

const HomeSliderIndicators = ({ noOfSlides, sliderIndex }: HomeProps) => {
  const indicatorsArray = Array.from(
    { length: noOfSlides },
    (_, index) => index
  );
  return (
    <View style={[generalStyles.allCenter, { flexDirection: "row", gap: 5 }]}>
      {indicatorsArray.map((_, index) => (
        <IonIcons
          name="ellipse"
          size={7}
          color={
            sliderIndex == index ? colors.primaryRed400 : colors.acentGrey200
          }
          key={index}
        />
      ))}
    </View>
  );
};

const Header = ({ name }) => {
  const userData: UserDataProps = useSelector(
    (state: any) => state.UserData.userData
  );

  return (
    <View style={styles.leftFlex}>
      <Image
        source={
          userData.image == null
            ? require("../../../../assets/images/signUp/2.png")
            : { uri: userData.image }
        }
        style={styles.avatarImage}
      />
      <View>
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.acentGrey400, lineHeight: 24 },
          ]}
        >
          Welcome!
        </Text>
        <Text
          style={[
            generalStyles.poppins500_fs16,
            { color: colors.black, lineHeight: 24 },
          ]}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const Home = () => {
  const navigation = useNavigation<any>();
  const userData: UserDataProps = useSelector(
    (state: any) => state.UserData.userData
  );
  const [sliderIndex, setSliderIndex] = useState(0);

  // this is the banner data that contains the component used by the carousel. you can add as many as you'd like, but make sure the number of data equals the noOfSlides prop
  const sliderData = [
    {
      id: "9876",
      component: (
        <Pressable
          onPress={() => console.log("pressed")}
          key={"8765"}
          style={[
            styles.discountBox,
            {
              backgroundColor: colors.primaryRed200,
            },
          ]}
        >
          <View style={{ gap: 10 }}>
            <Text
              style={[
                generalStyles.poppins400_fs16,
                { color: colors.primaryRed400 },
              ]}
            >
              Mechanical Services
            </Text>
            <Text
              style={[
                generalStyles.poppins700_fs12,
                { color: colors.black, fontSize: 24 },
              ]}
            >
              {"UP TO\n25% OFF"}
            </Text>
          </View>
          <View
            style={[
              styles.bannerCircle,
              {
                top: -30,
                right: -20,
                height: 130,
                width: 130,
                borderRadius: 130 / 2,
              },
            ]}
          ></View>
          <View
            style={{
              height: 140,
              width: 100,
              position: "absolute",
              right: 40,
              bottom: 0,
            }}
          >
            <Image
              source={require("../../../../assets/images/home/5.png")}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
        </Pressable>
      ),
    },
    {
      id: "56754",
      component: (
        <View
          key={"008765"}
          style={[
            styles.discountBox,
            {
              backgroundColor: colors.secondaryBlue100,
            },
          ]}
        >
          <View style={{ gap: 10 }}>
            <Text
              style={[generalStyles.poppins400_fs16, { color: colors.whiteBg }]}
            >
              Cleaning Services
            </Text>
            <Text
              style={[generalStyles.poppins700_fs16, { color: colors.whiteBg }]}
            >
              {"ENJOY AMAIZING\nDISCOUNTS"}
            </Text>
            <Text
              style={[generalStyles.poppins700_fs16, { color: colors.whiteBg }]}
            >
              {"30% OFF"}
            </Text>
          </View>
          <View
            style={[
              styles.bannerCircle,
              {
                bottom: -30,
                left: -30,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            ]}
          ></View>
        </View>
      ),
    },
  ];
  return (
    <ScreenLayout backgroundColor={colors.acentGrey50}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <Vspacer size={20} />
        <View style={styles.headers}>
          {userData.clientType == "company" && (
            <Header name={userData.companyName} />
          )}
          {userData.clientType == "individual" && (
            <Header name={userData.firstName + " " + userData.lastName} />
          )}
          <View>
            <IonIcons
              name="notifications"
              color={colors.primaryRed400}
              size={20}
            />
          </View>
        </View>

        {/* <View style={{ marginTop: 20 }}>
            <Carousel
              loop
              width={windowWidth}
              autoPlay={true}
              height={150}
              onSnapToItem={setSliderIndex}
              scrollAnimationDuration={3000}
              data={sliderData}
              renderItem={({ item, index }) => item.component}
            />
          </View> */}
        {/* <View style={{ marginTop: 10 }}>
            <HomeSliderIndicators noOfSlides={2} sliderIndex={sliderIndex} />
          </View> */}
        <View
          style={{
            // width: windowWidth * 0.9,
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          <FindClientArtisan
            placeholder="Find Artisan"
            disabled
            onPress={() =>
              navigation.navigate("SeeAllArtisansCategory", {
                autoFocus: true,
              })
            }
          />
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
              onPress={() => navigation.navigate("SeeAllFeaturedArtisans")}
            >
              See All
            </Text>
          </View>
          <FeaturedArtisans data={FeaturedArtisansData.slice(0, 3)} />
        </View>
        <Vspacer />
      </ScrollView>
      <View style={{ position: "absolute", top: 0, right: 0 }}>
        <Image source={require("../../../../assets/images/home/4.png")} />
      </View>
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
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
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
