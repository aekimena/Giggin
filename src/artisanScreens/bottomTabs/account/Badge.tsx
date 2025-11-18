import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const Badge = () => {
  const [selected, setSelected] = useState(1);
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <OverviewPagesHeader title="Premium Subscription" hideRightComp />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={{ alignItems: "center", gap: 5, marginTop: 20 }}>
          <Text
            style={[
              generalStyles.poppins600_fs16,
              { color: colors.secondaryBlue100 },
            ]}
          >
            Get Premium
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { textAlign: "center", color: colors.black },
            ]}
          >
            Unlock all the power of this mobile tool and enjoy being listed as a
            featured artisan!
          </Text>
        </View>
        <Image
          source={require("../../../../assets/images/dashboard/7.png")}
          style={styles.image}
        />
        <View style={{ marginTop: 30, gap: 25 }}>
          <Pressable
            onPress={() => setSelected(1)}
            style={[
              generalStyles.flexRowBtw,
              styles.box,
              {
                borderWidth: selected == 1 ? 2 : 0,
                borderColor: colors.primaryRed400,
              },
            ]}
          >
            <View style={{ gap: 10 }}>
              <Text
                style={[
                  generalStyles.poppins600_fs16,
                  { color: colors.secondaryBlue100 },
                ]}
              >
                Annual
              </Text>
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.secondaryBlue100 },
                ]}
              >
                GHC 350/Year
              </Text>
            </View>
            <View style={styles.greenBox}>
              <Text style={[generalStyles.poppins400_fs14, { color: "#fff" }]}>
                Save 20%
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setSelected(2)}
            style={[
              generalStyles.flexRowBtw,
              styles.box,
              {
                borderWidth: selected == 2 ? 2 : 0,
                borderColor: colors.primaryRed400,
              },
            ]}
          >
            <View style={{ gap: 10 }}>
              <Text
                style={[
                  generalStyles.poppins600_fs16,
                  { color: colors.secondaryBlue100 },
                ]}
              >
                Montly
              </Text>
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.secondaryBlue100 },
                ]}
              >
                GHC 35/Year
              </Text>
            </View>
            <View style={styles.greenBox}>
              <Text style={[generalStyles.poppins400_fs14, { color: "#fff" }]}>
                Popular
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={{ marginTop: 30, gap: 15 }}>
          <Btn100
            text="Proceed to Payment"
            bg={colors.primaryRed400}
            pressFunc={() =>
              navigation.navigate("BadgePayment", { data: selected })
            }
            rounded
          />
          <Text
            style={[generalStyles.poppins400_fs14, { textAlign: "center" }]}
          >
            By placing this order, you agree to the Terms of Service and Privacy
            Policy. Subscription automatically renews unless auto-renew is
            turned off at least 24-hours before the end of the current period.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  greenBox: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "rgba(38, 203, 99, 1)",
  },
  box: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.primaryRed50,
    alignItems: "flex-start",
  },
  image: {
    height: 140,
    width: 140,
    alignSelf: "center",
    marginTop: 20,
  },
});
