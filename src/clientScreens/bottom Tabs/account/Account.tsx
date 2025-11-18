import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import { SliderBtn } from "../../../components/SliderBtn";
import { LogOutModal } from "../../../components/LogOutModal";

const Option = ({ icon, text, onPress, leftComponent }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        {
          backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {icon}
        <Text style={[generalStyles.poppins400_fs14, { color: "#2F2F2F" }]}>
          {text}
        </Text>
      </View>
      {leftComponent || (
        <IonIcons
          name={"chevron-forward"}
          color={colors.acentGrey500}
          size={20}
        />
      )}
    </Pressable>
  );
};

export const Account = () => {
  const navigation = useNavigation<any>();
  const data: UserDataProps = useSelector(selectUserData);
  const [showModal, setModal] = useState(false);

  function handleNotification(bool) {
    // handle notification settings here using the boolean; true or false
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Account"} />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20, alignItems: "center", gap: 12 }}>
          <View>
            {data.image == null && (
              <Image
                source={require("../../../../assets/images/signUp/2.png")}
                style={styles.image}
              />
            )}
            {data.image !== null && (
              <Image source={{ uri: data.image }} style={styles.image} />
            )}
          </View>
          {data.clientType == "individual" && (
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              {data.firstName + " " + data.lastName}
            </Text>
          )}
          {data.clientType == "company" && (
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              {data.companyName}
            </Text>
          )}
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey500 },
            ]}
          >
            {data.email}
          </Text>
        </View>
        <View style={{ marginTop: 20, gap: 10 }}>
          <View style={[styles.section, { gap: 10 }]}>
            <Option
              text={"Profile"}
              icon={<IonIcons name={"person"} color={colors.black} size={17} />}
              onPress={() => navigation.navigate("Profile")}
            />
            <Option
              text={"Payment history"}
              icon={
                <FontAwesome
                  name={"building-columns"}
                  color={colors.black}
                  size={17}
                />
              }
              onPress={() => navigation.navigate("PaymentHistory")}
            />
          </View>
          <View style={[styles.section, { gap: 15 }]}>
            <Text style={styles.headings}>Settings</Text>
            <Option
              text={"Notifications"}
              icon={
                <IonIcons
                  name={"notifications"}
                  color={colors.black}
                  size={17}
                />
              }
              leftComponent={
                <SliderBtn
                  defaultState={true}
                  activeBg={colors.primaryRed400}
                  inActiveBg={colors.acentGrey300}
                  innerBg="#fff"
                  onChangeState={handleNotification}
                />
              }
            />
            <Option
              text={"Privacy Settings"}
              icon={<IonIcons name={"shield"} color={colors.black} size={17} />}
              onPress={() => navigation.navigate("Privacy")}
            />
          </View>
          <View style={[styles.section, { gap: 15 }]}>
            <Text style={styles.headings}>Verifications</Text>
            <Option
              text={"KYC Verification"}
              icon={
                <Image
                  source={require("../../../../assets/images/account/1.png")}
                  style={{
                    width: 34,
                    height: 24,
                    resizeMode: "contain",
                  }}
                />
              }
              onPress={() => navigation.navigate("Verification")}
            />
          </View>
          <View style={[styles.section, { gap: 10 }]}>
            <Text style={styles.headings}>Support</Text>
            <Option
              onPress={() =>
                navigation.navigate("Webview", {
                  data: { title: "Help Center", uri: "https://google.com" },
                })
              }
              text={"Help Center"}
              icon={
                <IonIcons name={"help-circle"} color={colors.black} size={18} />
              }
            />
            <Option
              onPress={() =>
                navigation.navigate("Webview", {
                  data: { title: "Community Rules", uri: "https://google.com" },
                })
              }
              text={"Community Rules"}
              icon={<IonIcons name={"people"} color={colors.black} size={18} />}
            />
            <Option
              onPress={() =>
                navigation.navigate("Webview", {
                  data: { title: "About", uri: "https://google.com" },
                })
              }
              text={"About"}
              icon={
                <IonIcons
                  name={"alert-circle"}
                  color={colors.black}
                  size={18}
                />
              }
            />
            <View style={{ marginTop: 20 }}>
              <Option
                onPress={() => setModal(true)}
                text={"Log Out"}
                icon={
                  <IonIcons name={"log-out"} color={colors.black} size={18} />
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <LogOutModal visible={showModal} setVisible={setModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  section: {
    paddingVertical: 15,
    backgroundColor: colors.whiteBg,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    borderRadius: 10,
  },
  image: { height: 100, width: 100, borderRadius: 50 },
  headings: {
    ...generalStyles.poppins500_fs16,
    color: colors.black,
    paddingHorizontal: 15,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
