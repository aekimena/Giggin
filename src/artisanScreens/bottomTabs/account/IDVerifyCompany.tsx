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
import IonIcons from "@expo/vector-icons/Ionicons";
import LabelInputIcon from "../../../components/LabelInputIcon";
import { Btn100 } from "../../../components/Btn100";
import { AddImageModal } from "../../../components/AddImageModal";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export const IDVerifyCompany = () => {
  const navigation = useNavigation<any>();
  const [imageModal, setImageModal] = useState(false);
  const [tinNo, setTinNo] = useState("");
  const [image, setImage] = useState(null);

  function verifyFunc() {
    navigation.replace("VerifySuccess", {
      data: {
        info: "Your National ID Card has been successfully uploaded. You will be directed to the verification page shortly.",
      },
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Identity Verification" hideRightComp />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Text
            style={[
              generalStyles.poppins500_fs16,
              { color: colors.black, marginTop: 20 },
            ]}
          >
            Upload a Photo of Your Company Registration Document
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, marginTop: 5 },
            ]}
          >
            Regulations requires you to upload a Photo of Your Company
            Registration Certificate and Input TIN Number to complete the
            verification process
          </Text>

          {image == null && (
            <>
              <Pressable
                style={[
                  generalStyles.allCenter,
                  styles.selectFileBox,
                  { height: 150 },
                ]}
                onPress={pickImage}
              >
                <View
                  style={{ alignItems: "center", gap: 3, marginVertical: 30 }}
                >
                  <Image
                    source={require("../../../../assets/images/payment/1.png")}
                  />
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

              <View style={[generalStyles.flexRow, { marginTop: 20, gap: 3 }]}>
                <View style={styles.seperator}></View>
                <Text
                  style={[
                    generalStyles.poppins400_fs16,
                    { color: colors.black },
                  ]}
                >
                  or
                </Text>
                <View style={styles.seperator}></View>
              </View>
              <Pressable
                onPress={openCamera}
                style={[
                  generalStyles.flexRow,
                  { justifyContent: "center", marginTop: 50, gap: 5 },
                ]}
              >
                <IonIcons
                  name="camera"
                  color={colors.primaryRed400}
                  size={20}
                />
                <Text
                  style={[
                    generalStyles.poppins500_fs14,
                    { color: colors.primaryRed400 },
                  ]}
                >
                  Open camera & take photo
                </Text>
              </Pressable>
            </>
          )}
          {image !== null && (
            <Pressable onPress={() => setImageModal(true)}>
              <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
          )}
          <View style={{ marginTop: 30, gap: 15 }}>
            <LabelInputIcon
              label="TIN Number"
              onChangeText={setTinNo}
              placeholder="Enter TIN Number"
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.btnCont}>
        <Btn100
          text="Done"
          bg={colors.primaryRed400}
          pressFunc={verifyFunc}
          rounded
        />
      </View>
      <AddImageModal
        visible={imageModal}
        setVisible={setImageModal}
        onSelect={setImage}
        onDelete={setImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 0.8,
    flex: 1,
  },
  selectFileBox: {
    marginTop: 20,
    padding: 15,
    height: 200,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: colors.acentGrey300,
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
  image: {
    height: 220,
    width: "100%",
    resizeMode: "contain",
    marginTop: 20,
  },
});
