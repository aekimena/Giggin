import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../utils";
import { BackIconTitle } from "../../components/BackIconTitle";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Btn100 } from "../../components/Btn100";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { AddImageModal } from "../../components/AddImageModal";

const ConfirmModal = ({ visible, setVisible }) => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: BookingsDataProps = route.params.data; // use this to handle confirmation
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, textAlign: "center", marginTop: 30 },
            ]}
          >
            Are you sure you want to confirm payment?
          </Text>
          <View style={[styles.flexRow, { marginTop: 40, gap: 10 }]}>
            <View style={{ flex: 1 }}>
              <Btn100
                outlined
                textCol={colors.primaryRed400}
                pressFunc={() => setVisible(false)}
                text="No"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Btn100
                text="Yes"
                bg={colors.primaryRed400}
                pressFunc={() => {
                  setVisible(false);
                  navigation.navigate("ConfirmCashPayment2", {
                    data: passedData,
                  });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ConfirmCashPayment = () => {
  const [showModal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [showAddImageModal, setAddImageModal] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Cash"} />
      </View>
      {image == null && (
        <>
          <Pressable
            style={[generalStyles.allCenter, styles.selectFileBox]}
            onPress={pickImage}
          >
            <View style={{ alignItems: "center", gap: 3, marginVertical: 30 }}>
              <Image source={require("../../../assets/images/payment/1.png")} />
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.acentGrey800 },
                ]}
              >
                Select File
              </Text>
            </View>
          </Pressable>
          <View style={[styles.flexRow, { marginTop: 20 }]}>
            <View style={styles.seperator}></View>
            <Text
              style={[generalStyles.poppins400_fs16, { color: colors.black }]}
            >
              or
            </Text>
            <View style={styles.seperator}></View>
          </View>
          <Pressable
            onPress={openCamera}
            style={[
              styles.flexRow,
              { justifyContent: "center", marginTop: 50 },
            ]}
          >
            <IonIcons name="camera" color={colors.primaryRed400} size={20} />
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.primaryRed400 },
              ]}
            >
              Open camera and take photo
            </Text>
          </Pressable>
        </>
      )}
      {image !== null && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Pressable
            style={{ width: "100%" }}
            onPress={() => setAddImageModal(true)}
          >
            <Image
              source={{ uri: image }}
              style={{ height: 200, width: "100%", resizeMode: "contain" }}
            />
          </Pressable>
        </View>
      )}
      <View style={styles.btnCont}>
        <Btn100
          text="Confirm payment"
          bg={colors.primaryRed400}
          pressFunc={() => setModal(true)}
        />
      </View>
      <ConfirmModal visible={showModal} setVisible={setModal} />
      <AddImageModal
        visible={showAddImageModal}
        setVisible={setAddImageModal}
        onSelect={setImage}
        onDelete={() => setImage(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 0.8,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    width: "100%",
    alignSelf: "center",
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  modalBox: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectFileBox: {
    marginTop: 50,
    padding: 15,
    height: 150,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: colors.acentGrey300,
  },
});
