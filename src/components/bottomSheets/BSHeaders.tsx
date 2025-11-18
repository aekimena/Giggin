import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { colors, generalStyles } from "../../utils";

interface Props {
  headerText: string;
  onPress?: any;
}

// this components accepts headerTxt and onPress function for the close icon
export const BSHeaders = ({ headerText, onPress }: Props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[generalStyles.poppins400_fs16, { color: colors.black }]}>
          {headerText}
        </Text>
        <Pressable
          onPress={onPress}
          style={[
            generalStyles.allCenter,
            {
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "rgba(208, 53, 49, 0.08)",
            },
          ]}
        >
          <IonIcons name="close" color={colors.primaryRed400} size={25} />
        </Pressable>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({});
