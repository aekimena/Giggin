import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../../utils";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/features/UserData";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { DashboardHeader } from "../../components/DashboardHeader";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { Vspacer } from "../../components/Vspacer";

const { width } = Dimensions.get("window");
export const Dashboard = () => {
  const userData: UserDataProps = useSelector(selectUserData);
  const navigation = useNavigation<any>();
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Vspacer />
        <DashboardHeader title={`Hi ${userData.firstName}`} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View style={[styles.flexRow, styles.congratulationsBox]}>
            <IonIcons
              name="eye-outline"
              size={25}
              color={colors.primaryRed400}
              style={{ opacity: 0.7 }}
            />
            <View style={{ gap: 5 }}>
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: colors.primaryRed400 },
                ]}
              >
                Congratulations!
              </Text>
              <Text
                style={[
                  generalStyles.poppins500_fs12,
                  { color: colors.black, fontSize: 10 },
                ]}
              >
                You have gotten 5 bookings on Giggin'.
              </Text>
            </View>
          </View>
          <View style={styles.earningBox}>
            <Text style={[generalStyles.poppins500_fs14, { color: "#fff" }]}>
              Total Earnings
            </Text>
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: "#fff", fontSize: 30, opacity: 0.7, lineHeight: 46 },
              ]}
            >
              GHC2,700
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={[
                generalStyles.poppins600_fs14,
                { color: "#000", opacity: 0.75 },
              ]}
            >
              Overview
            </Text>
            <View style={{ flexDirection: "row", gap: 15, marginTop: 15 }}>
              <Pressable
                style={styles.overViewBoxCont}
                onPress={() => navigation.navigate("NewOrders")}
              >
                <View style={styles.overviewCircle}>
                  <Image
                    source={require("../../../assets/images/dashboard/1.png")}
                    style={styles.overviewCircleImg}
                  />
                </View>
                <Text style={[styles.overviewTxt]}>New Orders</Text>
                <Image
                  source={require("../../../assets/images/dashboard/8.jpg")}
                  style={{ height: "100%", width: "100%", borderRadius: 20 }}
                />
                <View style={styles.layer}></View>
              </Pressable>
              <Pressable
                style={styles.overViewBoxCont}
                onPress={() => navigation.navigate("Messages")}
              >
                <View style={styles.overviewCircle}>
                  <Image
                    source={require("../../../assets/images/dashboard/2.png")}
                    style={styles.overviewCircleImg}
                  />
                </View>
                <Text style={[styles.overviewTxt]}>Messages</Text>
                <Image
                  source={require("../../../assets/images/dashboard/9.jpg")}
                  style={{ height: "100%", width: "100%", borderRadius: 20 }}
                />
                <View style={styles.layer}></View>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", gap: 15, marginTop: 15 }}>
              <Pressable
                style={styles.overViewBoxCont}
                onPress={() => navigation.navigate("CompletedJobs")}
              >
                <View style={styles.overviewCircle}>
                  <Image
                    source={require("../../../assets/images/dashboard/3.png")}
                    style={styles.overviewCircleImg}
                  />
                </View>
                <Text style={[styles.overviewTxt]}>Completed Jobs</Text>
                <Image
                  source={require("../../../assets/images/dashboard/10.jpg")}
                  style={{ height: "100%", width: "100%", borderRadius: 20 }}
                />
                <View style={styles.layer}></View>
              </Pressable>
              <Pressable
                style={styles.overViewBoxCont}
                onPress={() => navigation.navigate("PendingJobs")}
              >
                <View style={styles.overviewCircle}>
                  <Image
                    source={require("../../../assets/images/dashboard/4.png")}
                    style={styles.overviewCircleImg}
                  />
                </View>
                <Text style={[styles.overviewTxt]}>Pending Jobs</Text>
                <Image
                  source={require("../../../assets/images/dashboard/11.jpg")}
                  style={{ height: "100%", width: "100%", borderRadius: 20 }}
                />
                <View style={styles.layer}></View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  congratulationsBox: {
    padding: 15,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    marginTop: 20,
    gap: 20,
  },
  earningBox: {
    padding: 15,
    paddingVertical: 25,
    borderRadius: 10,
    backgroundColor: colors.primaryRed400,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  overViewBoxCont: {
    height: 160,
    flex: 1,
  },
  overviewCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.acentGrey50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 3,
  },
  overviewCircleImg: { height: 15, width: 15 },
  overviewTxt: {
    color: "#fff",
    position: "absolute",
    left: 15,
    bottom: 25,
    ...generalStyles.poppins500_fs14,
    zIndex: 3,
  },
  layer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 2,
    borderRadius: 20,
  },
});
