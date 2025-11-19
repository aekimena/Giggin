import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { BackIconTitle } from "../../components/BackIconTitle";
import { colors, generalStyles } from "../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { LeftIconTitleHeader } from "../../components/headers/LeftIconTitleHeader";

export const ConfirmCashPayment2 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.data; // use this to handle confirmation
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RateArtisan", { data: passedData });
    }, 3000);
  }, []);
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <LeftIconTitleHeader title={"Cash"} />
        <View style={styles.progressCont}>
          <View style={{ alignItems: "center", gap: 4 }}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}></View>
            </View>
            <Image
              source={require("../../../assets/images/payment/2.png")}
              style={{ height: 170, resizeMode: "contain" }}
            />
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}></View>
            </View>
          </View>
          <View style={{ gap: 120, flex: 1 }}>
            <View style={[generalStyles.allCenter, styles.box]}>
              <Text
                style={[generalStyles.poppins400_fs14, { color: colors.black }]}
              >
                Confirm you have made a cash payment of 100,000
              </Text>
            </View>
            <View style={[generalStyles.allCenter, styles.box]}>
              <Text
                style={[generalStyles.poppins400_fs14, { color: colors.black }]}
              >
                Confirm you have made a cash payment of 100,000
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoBoxCont}>
          <View style={styles.infoBox}>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.forestGreen600 },
              ]}
            >
              Professional has confirmed cash receipt
            </Text>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  box: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    borderRadius: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryRed100,
    borderWidth: 0.4,
    borderColor: colors.primaryRed400,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryRed400,
  },
  infoBox: {
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.forestGreen100,
    borderRadius: 5,
  },
  infoBoxCont: {
    bottom: 20,
    position: "absolute",
    alignSelf: "center",
    width: "100%",
  },
  progressCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
});
