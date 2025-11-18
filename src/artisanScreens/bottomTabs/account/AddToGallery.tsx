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
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export const AddToGallery = () => {
  const [images, setImages] = useState([]);
  const navigation = useNavigation<any>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  function addImages() {
    // handle add work here
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Gallery" hideRightComp />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text
            style={[
              generalStyles.poppins500_fs16,
              { color: colors.black, textAlign: "center", marginTop: 20 },
            ]}
          >
            Upload a photo of your previous work
          </Text>

          <Pressable
            style={[generalStyles.allCenter, styles.selectFileBox]}
            onPress={pickImage}
          >
            <View style={{ alignItems: "center", gap: 3, marginVertical: 30 }}>
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
              style={[generalStyles.poppins400_fs16, { color: colors.black }]}
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
            <IonIcons name="camera" color={colors.primaryRed400} size={20} />
            <Text
              style={[
                generalStyles.poppins500_fs14,
                { color: colors.primaryRed400 },
              ]}
            >
              Open camera & take photo
            </Text>
          </Pressable>

          <View style={{ marginTop: 30, gap: 10 }}>
            {images.map((item, index) => (
              <View
                style={[generalStyles.flexRowBtw, styles.imageNameCont]}
                key={index}
              >
                <Text
                  style={[
                    generalStyles.poppins400_fs14,
                    { color: colors.acentGrey500, flex: 1 },
                  ]}
                >
                  {item.fileName == null
                    ? item.uri.slice(item.uri.lastIndexOf("/") + 1)
                    : item.fileName}
                </Text>
                <Pressable
                  onPress={() => {
                    setImages(
                      images.filter((img) => images[index].uri !== img.uri)
                    );
                  }}
                >
                  <IonIcons
                    name="close"
                    size={22}
                    color={colors.primaryRed400}
                  />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {images.length !== 0 && (
        <View style={styles.btnCont}>
          <Btn100
            text="Done"
            bg={colors.primaryRed400}
            pressFunc={addImages}
            rounded
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 0.8,
    flex: 1,
  },
  selectFileBox: {
    marginTop: 20,
    padding: 15,
    height: 150,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: colors.acentGrey300,
  },
  imageNameCont: {
    borderRadius: 20,
    height: 50,
    width: "100%",
    borderColor: colors.acentGrey300,
    borderWidth: 0.8,
    paddingHorizontal: 15,
    gap: 10,
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
});
