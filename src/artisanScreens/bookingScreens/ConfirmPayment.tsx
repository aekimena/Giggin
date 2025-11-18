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
import { colors, generalStyles } from "../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { Btn100 } from "../../components/Btn100";
import { AddImageModal } from "../../components/AddImageModal";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export const ConfirmPayment = () => {
  const [image, setImage] = useState(null);
  const [showAddImageModal, setAddImageModal] = useState(false);
  const navigation = useNavigation<any>();

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
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 20,
      }}
    >
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader title="Offline Payment Verification" hideRightComp />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <Text
            style={[generalStyles.poppins500_fs16, { color: colors.black }]}
          >
            Upload a photo of the payment receipt
          </Text>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, marginTop: 5 },
            ]}
          >
            Regulations require you to upload an image of the payment receipt to
            complete the verification process
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
                    source={require("../../../assets/images/payment/1.png")}
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
                  Open camera and take photo
                </Text>
              </Pressable>
            </>
          )}

          {image !== null && (
            <Pressable
              style={{ width: "100%" }}
              onPress={() => setAddImageModal(true)}
            >
              <Image
                source={{ uri: image }}
                style={{
                  height: 300,
                  width: "100%",
                  marginTop: 20,
                  resizeMode: "contain",
                }}
              />
            </Pressable>
          )}

          <View style={{ marginTop: 80 }}>
            <Btn100
              text="Payment Confirmed"
              bg={colors.primaryRed400}
              rounded
              pressFunc={() => navigation.navigate("Successful")}
            />
          </View>
        </View>
      </ScrollView>

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
  selectFileBox: {
    marginTop: 30,
    padding: 15,
    height: 200,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: colors.acentGrey300,
  },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 0.8,
    flex: 1,
  },
});
