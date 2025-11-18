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
import { colors, generalStyles } from "../../../../utils";
import { BackIconTitle } from "../../../../components/BackIconTitle";
import { AddImageModal } from "../../../../components/AddImageModal";
import { Btn100 } from "../../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

const UploadSuccessModal = ({ visible, setVisible }) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../../assets/images/artisanBookings/8.png")}
            style={{ marginTop: 30 }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey800, marginTop: 10 },
            ]}
          >
            ID Card Uploaded Successfully
          </Text>
          <View style={{ width: "100%", marginTop: 50 }}>
            <Btn100
              text="Done"
              bg={colors.primaryRed400}
              pressFunc={() => {
                setVisible(false);
                navigation.replace("Verification4");
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const UploadFailedModal = ({ visible, setVisible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../../assets/images/artisanBookings/9.png")}
            style={{ marginTop: 30 }}
          />
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.acentGrey800, marginTop: 10 },
            ]}
          >
            Uploading ID Card was Unsuccessful
          </Text>
          <View style={{ width: "100%", marginTop: 50 }}>
            <Btn100
              text="Try Again"
              bg={colors.primaryRed400}
              pressFunc={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const CVerify3 = () => {
  const [showAddImageModal, setAddImageModal] = useState(false);
  const [uploadedModal, setUploadedModal] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadFailed, setUploadFailed] = useState(false);

  function upload() {
    // upload id card here. show success of failure modal. it's up to the outcome.
    setUploadedModal(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Verify Identity"} />
      </View>
      <View style={{ marginTop: 30, gap: 10 }}>
        <Text
          style={[
            generalStyles.poppins500_fs16,
            { color: colors.acentGrey800 },
          ]}
        >
          Upload a Photo of Your National ID Card
        </Text>
        <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
          Regulations require you upload an image of your national ID card to
          complete the verification process
        </Text>
      </View>
      {image == null && (
        <Pressable
          style={[styles.box, generalStyles.allCenter]}
          onPress={() => setAddImageModal(true)}
        >
          <View>
            <Image
              source={require("../../../../../assets/images/artisanBookings/7.png")}
              style={styles.placeholderImage}
            />
          </View>
        </Pressable>
      )}
      {image !== null && (
        <Pressable
          onPress={() => setAddImageModal(true)}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </Pressable>
      )}
      <View style={styles.btnCont}>
        <Btn100
          text="Done"
          bg={image == null ? colors.acentGrey300 : colors.primaryRed400}
          pressFunc={upload}
        />
      </View>
      <AddImageModal
        visible={showAddImageModal}
        setVisible={setAddImageModal}
        onSelect={setImage}
        onDelete={setImage}
        aspect={[4, 4]}
      />
      <UploadSuccessModal
        visible={uploadedModal}
        setVisible={setUploadedModal}
      />
      <UploadFailedModal visible={uploadFailed} setVisible={setUploadFailed} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  box: {
    width: "100%",
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 7,
    height: 200,
    marginTop: 20,
  },
  placeholderImage: {
    height: 90,
    width: 90,
    borderWidth: 1,
    resizeMode: "contain",
  },
  btnCont: {
    bottom: 20,
    position: "absolute",
    alignSelf: "center",
    width: "100%",
  },
  modalBox: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
  },
  image: {
    height: 220,
    width: "90%",
    borderRadius: 20,
    marginTop: 20,
  },
});
