import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { colors } from "../../constants/colors";
import { LabelText } from "../LabelText";
import { globalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../navigation/routes";

export const HomeSearchInput = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate(screenNames.client, {
          screen: screenNames.seeArtisanCategory,
          params: { autoFocus: true },
        })
      }
    >
      <IonIcons name="search" color={colors.acentGrey300} size={20} />

      <LabelText
        title="Find Artisan"
        style={{ color: colors.acentGrey400, ...globalStyles.poppins400_fs14 }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.whiteBg,
    height: 45,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    // zIndex: 5,
  },
});
