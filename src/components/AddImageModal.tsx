import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onSelect?: (value: string) => void;
  onDelete?: (value: null) => void;
  aspect?: [number, number];
}

export const AddImageModal = ({
  visible,
  setVisible,
  onSelect,
  onDelete,
  aspect,
}: Props) => {
  const pickImage = async (nothing) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect || null,
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspect || null,
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };
  const Option = ({ option, icon, lastIndex, onPress }) => (
    <Pressable
      style={({ pressed }) => [
        styles.flexRowBtw,
        styles.optionIconCont,
        {
          backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "transparent",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          generalStyles.poppins400_fs14,
          { color: lastIndex ? colors.primaryRed400 : colors.black },
        ]}
      >
        {option}
      </Text>
      <IonIcons
        name={icon}
        color={lastIndex ? colors.primaryRed400 : colors.black}
        size={17}
      />
    </Pressable>
  );

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <Pressable onPress={() => setVisible(false)} style={styles.modalCont}>
        <Pressable onPress={null} style={styles.modalBox}>
          <Text
            style={[
              generalStyles.poppins700_fs12,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            Add Image
          </Text>
          <View style={[styles.section, { paddingHorizontal: 0 }]}>
            <Option
              option={"Take Picture"}
              icon={"camera"}
              onPress={() => {
                setVisible(false);
                openCamera();
              }}
            />
            <View style={styles.seperator}></View>
            <Option
              option={"Upload Picture"}
              icon={"image"}
              onPress={() => {
                setVisible(false);
                pickImage(null);
              }}
            />
            <View style={styles.seperator}></View>
            <Option
              option={"Delete Picture"}
              icon={"trash-bin"}
              lastIndex={true}
              onPress={() => {
                onDelete(null);
                setVisible(false);
              }}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flexRowBtw: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  optionIconCont: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  seperator: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.acentGrey200,
  },
  modalBox: {
    padding: 15,
    minHeight: 200,
    backgroundColor: colors.acentGrey200,
    borderRadius: 10,
    width: "100%",
    gap: 10,
  },
  section: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 7,
  },
});
