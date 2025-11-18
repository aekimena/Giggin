import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import { delUserData } from "../redux/features/UserData";
import { delRegisterData } from "../redux/features/RegistrationData";
import { delArtisanConversation } from "../redux/features/artisan/Messages";
import { delClientConversation } from "../redux/features/client/Messages";
import { useDispatch } from "react-redux";

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

export const LogOutModal = ({ visible, setVisible }: Props) => {
  const dispatch = useDispatch();
  function logOut() {
    // clear all data here; redux, async storage, everything!!
    setVisible(false);
    dispatch(delUserData());
    dispatch(delArtisanConversation());
    dispatch(delClientConversation());
    dispatch(delRegisterData(null));
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalView}>
        <View style={styles.modalBox}>
          <Text
            style={[
              generalStyles.poppins400_fs16,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            {"Are you sure you want to\nLog Out?"}
          </Text>
          <View style={[generalStyles.flexRowCenter, { gap: 10 }]}>
            <Pressable
              onPress={() => setVisible(false)}
              style={({ pressed }) => [
                generalStyles.allCenter,
                styles.logOutBtns,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.07)" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  generalStyles.poppins500_fs16,
                  { color: colors.primaryRed400, opacity: 0.7 },
                ]}
              >
                No
              </Text>
            </Pressable>
            <Pressable
              onPress={logOut}
              style={({ pressed }) => [
                generalStyles.allCenter,
                styles.logOutBtns,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.07)" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  generalStyles.poppins500_fs16,
                  { color: colors.primaryRed400 },
                ]}
              >
                Yes
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logOutBtns: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  modalView: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
