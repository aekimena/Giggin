import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../constants/styles";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";

export const LeftIconTitleHeader = ({ title }) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingBottom: 15,
        marginTop: 40,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <IonIcons name="chevron-back" color={colors.black} size={20} />
      </Pressable>

      <Text style={[globalStyles.poppins500_fs16, { color: colors.black }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
