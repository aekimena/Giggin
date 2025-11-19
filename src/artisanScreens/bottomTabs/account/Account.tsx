import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";
import { LogOutModal } from "../../../components/LogOutModal";
import { AddImageModal } from "../../../components/AddImageModal";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";

interface FlewRowProps {
  Icon: any;
  title?: string;
  hideRightIcon?: boolean;
  view?: any;
  onPress?: any;
}

const FlewRow = ({
  Icon,
  title,
  hideRightIcon,
  view,
  onPress,
}: FlewRowProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        generalStyles.flexRowBtw,
        {
          backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
          paddingVertical: 15,
          paddingHorizontal: 25,
        },
      ]}
      onPress={onPress}
    >
      <View style={[generalStyles.flexRow, { gap: 10 }]}>
        <View style={styles.leftIconCont}>{Icon}</View>
        {view || (
          <Text
            style={[generalStyles.poppins500_fs16, { color: colors.black }]}
          >
            {title}
          </Text>
        )}
      </View>
      {!hideRightIcon && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.acentGrey500}
        />
      )}
    </Pressable>
  );
};

export const Account = () => {
  const userData: UserDataProps = useSelector(selectUserData);
  const navigation = useNavigation<any>();
  const [image, setImage] = useState(userData.image);
  const [modalVisible, setModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const dispatch = useDispatch();

  const changeAvatar = (img) => {
    setImage(img);
    dispatch({
      type: "UPDATE_USER_DATA",
      payload: { ...userData, image: img },
    });
  };

  return (
    <ScreenLayout>
      <Vspacer />
      <View
        style={[
          generalStyles.flexRowBtw,
          { paddingBottom: 15, paddingHorizontal: 25 },
        ]}
      >
        <Text
          style={[
            generalStyles.poppins600_fs22,
            { color: colors.secondaryBlue200 },
          ]}
        >
          Account
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          activeOpacity={0.6}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={colors.primaryRed400}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.imageCont} onPress={() => setImageModal(true)}>
          {image == null && (
            <Image
              source={require("../../../../assets/images/signUp/2.png")}
              style={styles.image}
            />
          )}
          {image !== null && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <View style={{ position: "absolute", bottom: 8, right: 10 }}>
            <Image
              source={require("../../../../assets/images/signUp/3.png")}
              style={{ height: 20, width: 20 }}
            />
          </View>
        </Pressable>
        <View style={{ alignItems: "center", gap: 5, marginTop: 10 }}>
          <View style={[generalStyles.flexRow, { gap: 5 }]}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              {userData.firstName} {userData.lastName}
            </Text>
            <MaterialIcons
              name="verified"
              size={16}
              color={colors.secondaryBlue100}
            />
          </View>

          <Text
            style={[generalStyles.poppins400_fs14, { color: colors.black }]}
          >
            {userData.email}
          </Text>
          <View style={[generalStyles.flexRow, { gap: 15 }]}>
            <View style={[generalStyles.flexRow, { gap: 5 }]}>
              <Ionicons name="star" size={9} color={colors.primaryRed400} />
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.acentGrey500, lineHeight: 16 },
                ]}
              >
                4.8
              </Text>
            </View>
            <Ionicons name="ellipse" size={4} color={colors.acentGrey500} />
            <View style={[generalStyles.flexRow, { gap: 5 }]}>
              <FontAwesome
                name="thumbs-up"
                size={9}
                color={colors.primaryRed400}
                solid
              />
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.acentGrey500, lineHeight: 16 },
                ]}
              >
                58 reviews
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <FlewRow
            onPress={() => navigation.navigate("EditProfile")}
            title={"Edit Profile"}
            Icon={
              <FontAwesome name="user-pen" size={14} color={colors.black} />
            }
          />
          <FlewRow
            onPress={() => navigation.navigate("MyServices")}
            title={"My Services"}
            Icon={<FontAwesome name="gears" size={14} color={colors.black} />}
          />
          <FlewRow
            onPress={() => navigation.navigate("Gallery")}
            title={"Gallery"}
            Icon={<Ionicons name="images" size={15} color={colors.black} />}
          />
          <FlewRow
            onPress={() => navigation.navigate("Wallet")}
            title={"Wallet"}
            Icon={
              <FontAwesome name="sack-dollar" size={14} color={colors.black} />
            }
          />
          <FlewRow
            onPress={() => navigation.navigate("Verification")}
            title={"Verification"}
            Icon={
              <MaterialIcons name="verified" size={15} color={colors.black} />
            }
          />
          <FlewRow
            onPress={() => navigation.navigate("Suscription")}
            view={
              <View style={[generalStyles.flexRow, { gap: 5 }]}>
                <Text
                  style={[
                    generalStyles.poppins500_fs16,
                    { color: colors.black },
                  ]}
                >
                  {userData.artisanSuscribed ? "Premium Subscription" : "Badge"}
                </Text>
                <Image
                  source={
                    userData.artisanSuscribed
                      ? require("../../../../assets/images/dashboard/6.png")
                      : require("../../../../assets/images/dashboard/5.png")
                  }
                  style={{ height: 15, width: 15, resizeMode: "contain" }}
                />
              </View>
            }
            Icon={
              <Ionicons name="notifications" size={15} color={colors.black} />
            }
          />
          <FlewRow
            onPress={() => navigation.navigate("AccountNotification")}
            title="Notification Settings"
            Icon={
              <Ionicons name="notifications" size={15} color={colors.black} />
            }
          />
          <FlewRow
            onPress={() => navigation.navigate("HelpCenter")}
            title="Help Center"
            Icon={
              <Ionicons name="help-circle" size={18} color={colors.black} />
            }
          />
          <FlewRow
            title="Invite Friends"
            Icon={<Ionicons name="people" size={18} color={colors.black} />}
          />
          <FlewRow
            onPress={() => setModal(true)}
            Icon={
              <Ionicons name="log-out" size={18} color={colors.primaryRed400} />
            }
            view={
              <Text
                style={[
                  generalStyles.poppins500_fs16,
                  { color: colors.primaryRed400 },
                ]}
              >
                Log Out
              </Text>
            }
          />
        </View>
      </ScrollView>
      <LogOutModal visible={modalVisible} setVisible={setModal} />
      <AddImageModal
        visible={imageModal}
        setVisible={setImageModal}
        onDelete={changeAvatar}
        onSelect={changeAvatar}
        aspect={[3, 3]}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  imageCont: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    backgroundColor: colors.acentGrey50,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    // paddingHorizontal: 15,
  },
  leftIconCont: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors.acentGrey300,
    justifyContent: "center",
    alignItems: "center",
  },
});
