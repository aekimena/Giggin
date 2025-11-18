import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../../../utils";

interface Prop {
  item: {
    id: string;
    minimumPrice: number;
    maximumPrice: number;
    image: any;
    service: string;
    category: string;
  };
}

export const RenderArtisanServices = ({ item }: Prop) => {
  return (
    <Pressable onPress={null} style={styles.box}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
          <Image
            source={item.image}
            style={{ height: 70, width: 90, borderRadius: 10 }}
          />
          <View style={{ gap: 5, flex: 1 }}>
            <Text
              style={[generalStyles.poppins500_fs12, { color: colors.black }]}
            >
              {item.service}
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: colors.acentGrey400 },
              ]}
            >
              {item.category}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end", gap: 10 }}>
          <View
            style={[
              styles.statusCont,
              {
                backgroundColor: "rgba(12, 140, 1, 0.75)",
              },
            ]}
          >
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: "#fff", lineHeight: 18 },
              ]}
            >
              Completed
            </Text>
          </View>
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: colors.primaryRed400 },
            ]}
          >
            GHC {item.minimumPrice} - {item.maximumPrice}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
  },
  statusCont: {
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
