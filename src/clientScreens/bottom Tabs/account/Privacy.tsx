import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import { SliderBtn } from "../../../components/SliderBtn";

export const Privacy = () => {
  const [locationServiceOn, setLocationServiceOn] = useState(true);
  const [connectContacts, setConnectContacts] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Privacy"} />
      </View>
      <View style={{ marginTop: 20, gap: 20 }}>
        <View style={{ gap: 10 }}>
          <View style={styles.box}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              Location Services
            </Text>
            <SliderBtn
              innerBg="#fff"
              defaultState={locationServiceOn}
              activeBg={colors.primaryRed400}
              onChangeState={(val) => setLocationServiceOn(val)}
              inActiveBg={colors.acentGrey300}
            />
          </View>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey600 },
            ]}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
            voluptate quos laudantium quaerat saepe, itaque quibusdam numquam
            mollitia impedit reprehenderit!
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <View style={styles.box}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              Connect Contacts
            </Text>
            <SliderBtn
              innerBg="#fff"
              defaultState={connectContacts}
              activeBg={colors.primaryRed400}
              onChangeState={(val) => setConnectContacts(val)}
              inActiveBg={colors.acentGrey300}
            />
          </View>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey600 },
            ]}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non
            voluptate quos laudantium quaerat saepe, itaque quibusdam numquam
            mollitia impedit reprehenderit!
          </Text>
        </View>
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
  box: {
    backgroundColor: colors.whiteBg,
    padding: 15,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
