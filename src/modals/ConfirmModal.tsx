import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { globalStyles } from "../constants/styles";
import { Btn100 } from "../components/Btn100";
import IonIcons from "@expo/vector-icons/Ionicons";

export const ConfirmModal = ({
  visible,
  setVisible,
  setOtherVisible,
  onPressConfirm,
  title,
  subtitle,
}: {
  onPressConfirm: () => void;
}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalCont}>
        <View style={[styles.section, styles.modalBox]}>
          <Image
            source={require("../../assets/images/artisanBookings/2.png")}
            style={{ alignSelf: "center", top: -0.57 }}
          />
          <View style={styles.modalHeaderTxtCont}>
            <Text
              style={[
                globalStyles.poppins500_fs16,
                { color: colors.acentGrey800 },
              ]}
            >
              {/* Confirm Booking */}
              {title}
            </Text>
            <Text
              style={[globalStyles.poppins400_fs14, { color: colors.black }]}
            >
              {/* Do you want to confirm this booking? */}
              {subtitle}
            </Text>
          </View>
          <View style={[styles.modalTerms]}>
            <Pressable onPress={() => setChecked(!checked)}>
              <IonIcons
                name={checked ? "checkbox" : "square"}
                color={colors.primaryRed400}
                size={20}
              />
            </Pressable>

            <Text
              style={[
                globalStyles.poppins400_fs12,
                { color: colors.black, lineHeight: 16 },
              ]}
            >
              Using our platforms implies you agree to our terms and conditions
            </Text>
          </View>
          <View
            style={[, { ...globalStyles.flexRowBtw, marginTop: 50, gap: 15 }]}
          >
            <View style={{ flex: 1 }}>
              <Btn100
                text="Cancel"
                textCol={colors.primaryRed400}
                pressFunc={() => setVisible(false)}
                outlined
              />
            </View>
            <View style={{ flex: 1 }}>
              <Btn100
                text="Confirm"
                bg={colors.primaryRed400}
                pressFunc={() => {
                  onPressConfirm();
                }}
                disabled={checked == false}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: colors.acentGrey50,
    paddingTop: 0,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  modalTerms: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
    flexDirection: "row",
    marginTop: 60,
  },
  modalHeaderTxtCont: { alignItems: "center", marginTop: 20, gap: 7 },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
  },
});
