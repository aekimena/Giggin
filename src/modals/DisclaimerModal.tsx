import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "../constants/styles";
import { LabelText } from "../components/LabelText";
import { Vspacer } from "../components/Vspacer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../constants/colors";

const DisclaimerModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const email = "arinzemmanuel23@gmail.com";

  const onPressEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };
  return (
    <Modal
      backdropColor={"rgba(0,0,0,0.05)"}
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="fade"
      // statusBarTranslucent={false}
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <View
          style={{ backgroundColor: "#fff", padding: 20, borderRadius: 20 }}
        >
          <Vspacer size={10} />
          <Pressable style={{ alignSelf: "flex-end" }} onPress={onClose}>
            <AntDesign name="close" size={20} color={colors.acentGrey400} />
          </Pressable>
          <Vspacer size={5} />
          <LabelText
            title="Early Access Notice"
            style={{
              ...globalStyles.font20Semibold,
              fontSize: 22,
              color: colors.acentGrey600,
            }}
          />
          <Vspacer size={5} />
          <LabelText
            title="This app is currently an unreleased product and may still contain incomplete features."
            style={{ color: colors.acentGrey400 }}
          />
          <Vspacer size={10} />
          <Text style={{ color: colors.acentGrey400 }} onPress={onPressEmail}>
            Contact the Developer:{" "}
            <Text
              style={{
                color: colors.black,
                ...globalStyles.font14Semibold,
                lineHeight: 21,
              }}
            >
              {email}
            </Text>
          </Text>
          <Vspacer size={10} />
        </View>
      </View>
    </Modal>
  );
};

export default DisclaimerModal;

const styles = StyleSheet.create({});
