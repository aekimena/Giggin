import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";

interface Prop {
  info: string;
  heading?: string;
}

export const Successful = ({ info, heading }: Prop) => {
  return (
    <SafeAreaView
      style={[{ flex: 1 }, generalStyles.bgWhite, generalStyles.allCenter]}
    >
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <View style={{ alignItems: "center" }}>
        <View style={[generalStyles.allCenter]}>
          <Image
            source={require("../../assets/images/congratulations/2.png")}
            style={styles.outerImage}
          />
          <Image
            source={require("../../assets/images/congratulations/1.png")}
            style={styles.innerImage}
          />
        </View>
        <View style={{ width: "70%", marginTop: 10 }}>
          <Text
            style={[
              generalStyles.poppins500_fs22,
              styles.congrats,
              { fontSize: 25 },
            ]}
          >
            {heading || "Successful!"}
          </Text>

          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            {info}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerImage: {
    width: 140,
    height: 140,
  },
  innerImage: { width: 60, height: 60, position: "absolute" },
  congrats: {
    color: colors.secondaryBlue200,
    textAlign: "center",
    fontSize: 25,
  },
});
