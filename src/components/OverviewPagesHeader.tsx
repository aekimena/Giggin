import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  title: string;
  bookingStatus?: string;
  hideRightComp?: boolean;
}

export const OverviewPagesHeader = ({
  title,
  bookingStatus,
  hideRightComp,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={[generalStyles.flexRowBtw, { marginTop: 40, paddingBottom: 15 }]}
    >
      <View style={[generalStyles.flexRow, { gap: 20 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.6}
          style={[generalStyles.allCenter, styles.backBtn]}
        >
          <Ionicons name="arrow-back" color={colors.primaryRed400} size={25} />
        </TouchableOpacity>
        <Text
          style={[
            generalStyles.poppins600_fs16,
            { color: colors.black, lineHeight: 24 },
          ]}
        >
          {title}
        </Text>
      </View>
      {!bookingStatus && !hideRightComp && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          activeOpacity={0.8}
          style={styles.notifiCont}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.primaryRed400}
          />
        </TouchableOpacity>
      )}
      {bookingStatus && !hideRightComp && (
        <Text
          style={[
            generalStyles.poppins600_fs14,
            { color: colors.secondaryBlue200 },
          ]}
        >
          {bookingStatus}
        </Text>
      )}
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
  notifiCont: {
    height: 27,
    width: 27,
    backgroundColor: colors.primaryRed100,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
