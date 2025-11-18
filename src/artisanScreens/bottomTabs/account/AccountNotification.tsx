import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { SliderBtn } from "../../../components/SliderBtn";

export const AccountNotification = () => {
  const [general, setGeneral] = useState(true);
  const [sound, setSound] = useState(false);
  const [updates, setUpdates] = useState(true);
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Notification Settings" hideRightComp />
      <View style={{ marginTop: 20, gap: 30 }}>
        <View style={[generalStyles.flexRowBtw]}>
          <View style={[generalStyles.flexRow, { gap: 10 }]}>
            <View style={styles.leftIconCont}>
              <IonIcons name="notifications" size={16} color={colors.black} />
            </View>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              General Notifications
            </Text>
          </View>
          <SliderBtn
            defaultState={general}
            activeBg={colors.primaryRed400}
            inActiveBg={colors.acentGrey300}
            innerBg="#fff"
            onChangeState={setGeneral}
          />
        </View>
        <View style={[generalStyles.flexRowBtw]}>
          <View style={[generalStyles.flexRow, { gap: 10 }]}>
            <View style={styles.leftIconCont}>
              <IonIcons name="volume-high" size={16} color={colors.black} />
            </View>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              Sound
            </Text>
          </View>
          <SliderBtn
            defaultState={sound}
            activeBg={colors.primaryRed400}
            inActiveBg={colors.acentGrey300}
            innerBg="#fff"
            onChangeState={setSound}
          />
        </View>
        <View style={[generalStyles.flexRowBtw]}>
          <View style={[generalStyles.flexRow, { gap: 10 }]}>
            <View style={styles.leftIconCont}>
              <FontAwesome
                name="cloud-arrow-down"
                size={15}
                color={colors.black}
              />
            </View>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              App Updates
            </Text>
          </View>
          <SliderBtn
            defaultState={updates}
            activeBg={colors.primaryRed400}
            inActiveBg={colors.acentGrey300}
            innerBg="#fff"
            onChangeState={setUpdates}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  leftIconCont: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.acentGrey300,
    justifyContent: "center",
    alignItems: "center",
  },
});
