import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import IonIcons from "@expo/vector-icons/Ionicons";

interface RenderProps {
  item: ArtisanRatingsProps;
}

export const RenderReviews = ({ item }: RenderProps) => {
  return (
    <View style={styles.box}>
      <View style={{ flexDirection: "row", gap: 15, flex: 1 }}>
        <Image
          source={item.image}
          style={{ height: 80, width: 80, borderRadius: 10 }}
        />
        <View style={{ gap: 10, flex: 1 }}>
          <Text
            style={[
              globalStyles.poppins500_fs16,
              { color: colors.secondaryBlue200 },
            ]}
          >
            {item.firstName + " " + item.lastName}
          </Text>
          <Text
            style={[
              globalStyles.poppins400_fs14,
              { color: colors.acentGrey500 },
            ]}
          >
            {item.review}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <IonIcons
          name="star"
          color={colors.primaryRed400}
          size={10}
          style={{ marginBottom: 3 }}
        />
        <Text
          style={[
            globalStyles.poppins400_fs14,
            { color: colors.primaryRed400 },
          ]}
        >
          {item.rating.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  box: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    width: "100%",
  },
});
