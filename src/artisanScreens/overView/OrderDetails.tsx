import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../utils";
import { useRoute } from "@react-navigation/native";

export const OrderDetails = () => {
  const route = useRoute<any>();
  const passedData: ArtisanNewOrdersProp = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader title="Order Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Image
          source={require("../../../assets/images/artisanProflie/2.png")}
          style={styles.image}
        />
        <View style={{ marginTop: 20, gap: 10 }}>
          <Text style={styles.heading}>{passedData.service}</Text>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, lineHeight: 28 },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            tenetur repellat dolor voluptates ducimus expedita, amet quas esse
            temporibus aliquid.
          </Text>
        </View>
        <View style={styles.infoCont}>
          <View>
            <Text style={styles.heading}>Requested Date and Time</Text>
            <Text
              style={[
                generalStyles.poppins400_fs16,
                { color: "rgba(65, 191, 45, 1)" },
              ]}
            >
              {passedData.date} - {passedData.time}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.heading}>Address</Text>
            <Text
              style={[
                generalStyles.poppins400_fs16,
                { color: colors.primaryRed400 },
              ]}
            >
              {passedData.address}
            </Text>
          </View>
          {(passedData.comment !== null || passedData.comment !== "") && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.heading}>Comment</Text>
              <Text
                style={[generalStyles.poppins400_fs16, { color: colors.black }]}
              >
                {passedData.comment}
              </Text>
            </View>
          )}
        </View>
        {/*  */}
        <View style={[styles.itemCont]}>
          <View style={[generalStyles.flexRowCenter, { gap: 10, flex: 1 }]}>
            <Image
              source={passedData.image}
              style={{ height: 70, width: 90, borderRadius: 10 }}
            />
            <View style={{ flex: 1, gap: 5 }}>
              <Text
                style={[generalStyles.poppins500_fs14, { color: colors.black }]}
              >
                {passedData.firstName} {passedData.lastName}
              </Text>
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: "rgba(104, 104, 104, 0.6)" },
                ]}
              >
                {passedData.date}, {passedData.time}
              </Text>
              <Text
                style={[
                  generalStyles.poppins500_fs14,
                  { color: colors.black, maxWidth: 100, lineHeight: 21 },
                ]}
              >
                {passedData.service}
              </Text>
            </View>
          </View>
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: colors.primaryRed400, lineHeight: 18 },
            ]}
          >
            GHC {passedData.startingPrice} - {passedData.price}
          </Text>
        </View>
        {/*  */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  image: {
    height: 250,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
  },
  itemCont: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
  heading: { ...generalStyles.poppins600_fs16, color: colors.black },
  infoCont: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 20,
    marginTop: 20,
  },
});
