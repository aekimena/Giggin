import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../../utils";
import { Btn100 } from "../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const Successful = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView
      style={[
        generalStyles.flex1,
        generalStyles.bgWhite,
        generalStyles.allCenter,
        { paddingHorizontal: 30 },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/images/successful/1.png")}
          style={styles.image}
        />
        <Text
          style={[
            generalStyles.poppins500_fs20,
            { color: colors.secondaryBlue200, fontSize: 25 },
          ]}
        >
          Successful
        </Text>
        <View style={{ width: "70%", marginTop: 7 }}>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            Your password has been reset successfully
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 40, width: "100%" }}>
        <Btn100
          text="Done"
          bg={colors.primaryRed400}
          pressFunc={() => navigation.replace("Login")}
          rounded
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 90,
    marginBottom: 10,
  },
});
