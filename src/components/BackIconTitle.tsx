import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { colors, generalStyles } from "../utils";
import { useNavigation } from "@react-navigation/native";

export const BackIconTitle = ({ title }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Pressable onPress={() => navigation.goBack()}>
        <IonIcons name="chevron-back" color={colors.black} size={20} />
      </Pressable>

      <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
