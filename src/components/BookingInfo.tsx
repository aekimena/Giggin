import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";

export const BookingInfo = ({
  image,
  dateTime,
  status,
  provider,
  address,
  service,
  clientProduct,
}: BookingsDataProps) => {
  return (
    <View style={styles.section}>
      <View style={[styles.container]}>
        <View style={styles.headers}>
          <Image source={image} style={styles.image} />
          <View style={{ gap: 7, flex: 1 }}>
            <Text
              style={[
                generalStyles.poppins500_fs16,
                { color: colors.secondaryBlue200 },
              ]}
            >
              {service}
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.acentGrey500 },
              ]}
            >
              {clientProduct}
            </Text>
          </View>
        </View>
        {status && (
          <View
            style={[
              generalStyles.allCenter,
              styles.status,
              {
                backgroundColor:
                  status == "Pending"
                    ? colors.primaryRed100
                    : status == "Confirmed"
                    ? colors.forestGreen100
                    : colors.acentGrey300,
              },
            ]}
          >
            <Text
              style={[
                generalStyles.poppins400_fs12,
                {
                  color:
                    status == "Pending"
                      ? colors.primaryRed400
                      : status == "Confirmed"
                      ? colors.forestGreen600
                      : colors.acentGrey800,
                },
              ]}
            >
              {status}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.innerSection}>
        <View style={styles.flexRowBtw}>
          <Text style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}>
            Date & Time
          </Text>
          <Text style={[generalStyles.poppins400_fs12, styles.innerRightTxt]}>
            {dateTime}
          </Text>
        </View>
        <View style={styles.flexRowBtw}>
          <Text style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}>
            Provider
          </Text>
          <Text style={[generalStyles.poppins400_fs12, styles.innerRightTxt]}>
            {provider.name}
          </Text>
        </View>
        <View style={styles.flexRowBtw}>
          <Text style={[generalStyles.poppins400_fs12, styles.innerLeftTxt]}>
            Address
          </Text>
          <Text style={[generalStyles.poppins400_fs12, styles.innerRightTxt]}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  status: { paddingVertical: 4, width: 80, borderRadius: 5 },
  headers: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    flex: 1,
  },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 7,
  },
  innerSection: {
    padding: 15,
    backgroundColor: colors.acentGrey50,
    borderRadius: 5,
    gap: 5,
    marginTop: 15,
    borderColor: colors.acentGrey200,
    borderWidth: 0.5,
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  innerLeftTxt: {
    color: colors.acentGrey600,
  },
  innerRightTxt: {
    color: colors.secondaryBlue200,
    flex: 1,
    textAlign: "right",
  },
});
