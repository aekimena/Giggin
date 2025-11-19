import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { Btn100 } from "../../../components/Btn100";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";

export const BookingInView = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.passedData;
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Vspacer />
        <View style={{}}>
          <BackIconTitle title={"Bookings"} />
        </View>
        <View
          style={[
            generalStyles.allCenter,
            {
              marginTop: 20,
              height: 35,
              width: "100%",
              borderRadius: 5,
              backgroundColor:
                passedData.status == "Pending"
                  ? colors.primaryRed100
                  : passedData.status == "Confirmed"
                  ? colors.forestGreen100
                  : colors.acentGrey300,
            },
          ]}
        >
          <Text
            style={[
              generalStyles.poppins400_fs14,
              {
                color:
                  passedData.status == "Pending"
                    ? colors.primaryRed400
                    : passedData.status == "Confirmed"
                    ? colors.forestGreen600
                    : colors.acentGrey600,
              },
            ]}
          >
            {passedData.status}
          </Text>
        </View>
        <Image
          source={require("../../../../assets/images/artisanBookings/4.png")}
          style={{
            width: 232.34,
            height: 79, // the image should be a perfect square, but since i'm working with the designs, i'll hava to use the designer's width & height for now

            alignSelf: "center",
            marginTop: 40,
          }}
        />
        <View style={{ marginTop: 30, gap: 7 }}>
          <Text
            style={[
              generalStyles.poppins500_fs16,
              { color: colors.secondaryBlue200 },
            ]}
          >
            {passedData.service}
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey500 },
            ]}
          >
            {passedData.clientProduct}
          </Text>
        </View>
        <View style={{ marginTop: 30, gap: 10 }}>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt]}>Date & Time</Text>
            <Text style={[styles.innerRightTxt]}>{passedData.dateTime}</Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt]}>Provider</Text>
            <Text style={[styles.innerRightTxt]}>
              {passedData.provider.name}
            </Text>
          </View>
          <View style={styles.flexRowBtw}>
            <Text style={[styles.innerLeftTxt]}>Address</Text>
            <Text style={[styles.innerRightTxt]}>{passedData.address}</Text>
          </View>
          <View style={[styles.flexRowBtw, { marginTop: 15 }]}>
            <Text style={[styles.innerLeftTxt, generalStyles.poppins400_fs12]}>
              Artisan Price range
            </Text>
            <Text style={[styles.innerRightTxt, generalStyles.poppins500_fs14]}>
              500GH₵
            </Text>
          </View>
        </View>
        <View style={styles.btnCont}>
          <Btn100
            text="Track Status"
            bg={colors.primaryRed400}
            pressFunc={() => navigation.navigate("StatusOrder", { passedData })}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerLeftTxt: {
    color: colors.acentGrey600,
    ...generalStyles.poppins400_fs12,
  },
  innerRightTxt: {
    color: colors.secondaryBlue300,
    ...generalStyles.poppins400_fs12,
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    alignSelf: "center",
  },
});
