import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import IonIcons from "@expo/vector-icons/Ionicons";

export const PreviousWorkItem = ({
  work,
}: {
  work: ArtisansDataObjProps["previousWorks"][0];
}) => {
  return (
    <View style={styles.section}>
      <View
        style={[
          {
            ...globalStyles.flexRowBtw,
            justifyContent: "space-between",
            alignItems: "flex-start",
          },
        ]}
      >
        <View
          style={[
            { ...globalStyles.flexRow, alignItems: "flex-start", gap: 10 },
          ]}
        >
          <Image source={work.image} style={styles.previousWorkImage} />
          <View style={{ gap: 8 }}>
            <Text
              style={[
                globalStyles.poppins500_fs14,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {work.service}
            </Text>
            <Text
              style={[
                globalStyles.poppins400_fs14,
                { color: colors.acentGrey400 },
              ]}
            >
              {work.clientPrdouct}
            </Text>
            <View style={{ ...globalStyles.flexRow }}>
              <IonIcons
                name="calendar-clear"
                color={colors.primaryRed400}
                size={15}
              />
              <Text
                style={[
                  globalStyles.poppins400_fs14,
                  { color: colors.acentGrey400 },
                ]}
              >
                {work.date}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              globalStyles.poppins500_fs14,
              { color: colors.acentGrey600 },
            ]}
          >
            {work.price}GH₵
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  previousWorkImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
    resizeMode: "contain",
  },
  section: {
    width: "100%",
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    height: "auto",
    borderRadius: 10,
    padding: 15,
  },
});
