import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/features/UserData";
import { globalStyles } from "../../constants/styles";
import { colors } from "../../constants/colors";
import { PLACEHOLDER_AVATAR } from "../../constants/data";

export const HomeHeader = ({ name }) => {
  const userData: UserDataProps = useSelector(selectUserData);

  return (
    <View style={{ ...globalStyles.flexRow, gap: 15 }}>
      <Image
        source={{ uri: !userData?.image ? PLACEHOLDER_AVATAR : userData.image }}
        style={styles.avatarImage}
      />
      <View>
        <Text
          style={[
            globalStyles.poppins400_fs14,
            { color: colors.acentGrey400, lineHeight: 24 },
          ]}
        >
          Welcome!
        </Text>
        <Text
          style={[
            globalStyles.poppins500_fs16,
            { color: colors.black, lineHeight: 24 },
          ]}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
});
