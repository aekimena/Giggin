import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors, generalStyles } from "../../utils";

export const BackBtn = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{ paddingBottom: 10, marginTop: 30 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        style={[generalStyles.allCenter, styles.backBtn]}
      >
        <Ionicons name="arrow-back" color={colors.primaryRed400} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primaryRed400,
  },
});
