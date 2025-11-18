import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const Verification = () => {
  const [selected, setSelected] = useState(1);
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Verify Identity"} />
      </View>
      <View style={{ marginTop: 30 }}>
        <Text
          style={[
            generalStyles.poppins400_fs16,
            { color: colors.acentGrey800 },
          ]}
        >
          Select any of these documents for your verification process
        </Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable style={styles.outerCircle} onPress={() => setSelected(1)}>
            {selected == 1 && <View style={styles.innerCircle}></View>}
          </Pressable>
          <View style={styles.box}>
            <Image
              source={require("../../../../assets/images/account/4.png")}
              style={styles.image}
            />
            <View style={{ flex: 1, gap: 5 }}>
              <Text
                style={[generalStyles.poppins500_fs16, { color: colors.black }]}
              >
                KYC Verification
              </Text>
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.acentGrey500 },
                ]}
              >
                (Know your customer Identity Verification)
              </Text>
            </View>
            <IonIcons
              name="chevron-forward"
              size={20}
              color={colors.acentGrey400}
            />
          </View>
        </View>
      </View>
      <View style={styles.btnCont}>
        <Btn100
          text="Continue"
          bg={colors.primaryRed400}
          pressFunc={() => navigation.navigate("Verification2")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryRed200,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    backgroundColor: colors.primaryRed400,
    borderRadius: 5,
  },
  box: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    alignSelf: "center",
    width: "100%",
  },
});
