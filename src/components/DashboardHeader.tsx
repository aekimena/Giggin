import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/features/UserData";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors, generalStyles } from "../utils";

interface Props {
  title: string;
}

export const DashboardHeader = ({ title }: Props) => {
  const navigation = useNavigation<any>();
  const userData = useSelector(selectUserData);
  return (
    <View style={[styles.headers, styles.flexRowBtw]}>
      <Text
        style={[
          generalStyles.poppins600_fs22,
          { color: colors.secondaryBlue200 },
        ]}
      >
        {title}
      </Text>

      <View style={[styles.flexRow, { gap: 10 }]}>
        <Pressable
          onPress={() => navigation.navigate("Notifications")}
          style={styles.notifiCont}
        >
          <IonIcons
            name="notifications-outline"
            size={22}
            color={colors.primaryRed400}
          />
        </Pressable>

        <Image
          source={
            userData.image == null
              ? require("../../assets/images/signUp/2.png")
              : { uri: userData.image }
          }
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headers: {
    marginTop: 20,
    paddingBottom: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: colors.acentGrey200,
  },
  notifiCont: {
    height: 27,
    width: 27,
    backgroundColor: colors.primaryRed100,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
