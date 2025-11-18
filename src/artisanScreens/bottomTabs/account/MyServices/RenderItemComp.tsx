import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, generalStyles } from "../../../../utils";
interface RenderProps {
  item: ArtisanServicesProps;
  status: "pending" | "approved" | "rejected";
}

export const RenderItemComp = ({ item, status }: RenderProps) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() => navigation.navigate("ServiceInView", { data: item })}
      style={styles.box}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
                backgroundColor:
                  status == "pending"
                    ? "rgba(239, 132, 71, 0.75)"
                    : status == "approved"
                    ? "rgba(65, 191, 45, 0.75)"
                    : "rgba(208, 53, 49, 0.75)",
              },
            ]}
          >
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: "#fff", lineHeight: 18 },
              ]}
            >
              {status == "pending"
                ? "Pending"
                : status == "approved"
                ? "Approved"
                : "Rejected"}
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
      {status == "rejected" && (
        <View
          style={[
            generalStyles.flexRow,
            { marginTop: 7, alignItems: "flex-start" },
          ]}
        >
          <Text style={[styles.rejectedTxt, { color: colors.primaryRed400 }]}>
            Rejcted Reason:{" "}
          </Text>
          <Text style={[styles.rejectedTxt, { color: colors.black, flex: 1 }]}>
            Please choose the correct category
          </Text>
        </View>
      )}
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

  rejectedTxt: {
    fontFamily: "Poppins500",
    fontSize: 8,
    lineHeight: 12,
  },
});
