import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Btn100 } from "../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
export const AddScreen = () => {
  const navigation = useNavigation<any>();
  const [image, setImage] = useState(null);
  const [showAddImageModal, setAddImageModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const insets = useSafeAreaInsets();
  const options = [
    { id: "1", option: "24 x 7 Services" },
    { id: "2", option: "Eco-Friendly" },
    { id: "3", option: "Home Visits" },
    { id: "4", option: "Fast Service" },
    { id: "5", option: "Active" },
    { id: "6", option: "24 x 7 Services" },
    { id: "7", option: "Eco-Friendly" },
    { id: "8", option: "Home Visits" },
    { id: "9", option: "Fast Service" },
    { id: "10", option: "Fast Service" },
  ];

  function optionPress(option) {
    const optionSelected = selected.find((obj) => obj.id == option.id);
    if (optionSelected) {
      setSelected(selected.filter((item) => item.id !== option.id));
    } else {
      setSelected([...selected, option]);
    }
  }

  function optionSelected(option) {
    return selected.find((obj) => obj.id == option.id);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <OverviewPagesHeader title="Create New Service" />
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            {/*  */}
            <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
              {image == null && (
                <>
                  <Text
                    style={[
                      generalStyles.poppins500_fs16,
                      { color: colors.black, textAlign: "center" },
                    ]}
                  >
                    Upload a photo of Your New Service
                  </Text>

                  <Pressable
                    style={[
                      image == null && generalStyles.allCenter,
                      styles.selectFileBox,
                    ]}
                    onPress={pickImage}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        gap: 3,
                        marginVertical: 30,
                      }}
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

                  <View
                    style={[generalStyles.flexRow, { marginTop: 20, gap: 3 }]}
                  >
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
                  <Pressable style={styles.openCameraCont} onPress={openCamera}>
                    <View
                      style={[
                        generalStyles.flexRow,
                        { justifyContent: "center", gap: 5 },
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
                    </View>
                  </Pressable>
                </>
              )}
            </View>
            {image !== null && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ height: 250, width: "100%", borderRadius: 10 }}
                />
                <Pressable style={styles.trash} onPress={() => setImage(null)}>
                  <Ionicons
                    name="trash"
                    size={18}
                    color={colors.primaryRed400}
                  />
                </Pressable>
              </View>
            )}
            {/*  */}
            <View style={{ marginTop: 20, paddingLeft: 15 }}>
              <Text
                style={[generalStyles.poppins400_fs16, { color: colors.black }]}
              >
                Select your preferred options here
              </Text>
              <View
                style={[
                  generalStyles.flexRow,
                  {
                    flexWrap: "wrap",
                    marginTop: 15,
                    gap: 20,
                  },
                ]}
              >
                {options.map((item, index) => (
                  <Pressable
                    key={item.id}
                    style={[
                      generalStyles.flexRow,
                      {
                        gap: 3,
                        width: width * 0.5 - 40,
                      },
                    ]}
                    onPress={() => optionPress(item)}
                  >
                    <IonIcons
                      name={
                        optionSelected(item) ? "checkbox" : "square-outline"
                      }
                      size={25}
                      color={colors.primaryRed400}
                    />
                    <Text
                      style={[
                        generalStyles.poppins400_fs14,
                        { color: colors.primaryRed400, flex: 1 },
                      ]}
                    >
                      {item.option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ ...styles.btnCont, marginBottom: insets.bottom + 5 }}>
          <Btn100
            text="Next"
            bg={
              selected.length == 0 ? colors.acentGrey300 : colors.primaryRed400
            }
            pressFunc={() =>
              navigation.navigate("AddScreen2", {
                data: { options: selected, image: image },
              })
            }
            rounded
            disabled={selected.length == 0}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  selectFileBox: {
    marginTop: 15,
    padding: 15,
    height: 150,
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
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
  openCameraCont: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  trash: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
