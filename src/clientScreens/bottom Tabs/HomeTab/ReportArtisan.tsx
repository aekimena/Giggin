import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ModalView = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../assets/images/artisanBookings/8.png")}
            style={styles.tickImage}
          />
          <Text style={styles.modalTxt}>{"Your report has been\nsent"}</Text>
        </View>
      </View>
    </Modal>
  );
};
const FailureModalView = ({ visible }) => {
  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <Image
            source={require("../../../../assets/images/artisanBookings/9.png")}
            style={styles.tickImage}
          />
          <Text style={styles.modalTxt}>{"Your report wan not\nsent"}</Text>
        </View>
      </View>
    </Modal>
  );
};

const ReportReasons = ({ selected, heading, body, setSelected, number }) => {
  return (
    <View style={styles.reportReasonsCont}>
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={[generalStyles.poppins700_fs16, { color: colors.black }]}>
          {heading}
        </Text>
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.acentGrey400 },
          ]}
        >
          {body}
        </Text>
      </View>
      <Pressable onPress={() => setSelected(number)}>
        <View style={styles.outerCircle}>
          {selected == number && <View style={styles.innerCircle}></View>}
        </View>
      </Pressable>
    </View>
  );
};

export const ReportArtisan = () => {
  const [selected, setSelected] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation<any>();
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  function sendReport() {
    // send report here. show success modal or failure modal, depending on the outcome.
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.goBack();
    }, 2000);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.acentGrey50 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.acentGrey50} />
      <View style={styles.headers}>
        <IonIcons name="chevron-back" color={colors.black} size={20} />
        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Report Artisan
        </Text>
        <Pressable onPress={null}>
          <IonIcons
            name="alert-circle"
            color={colors.primaryRed400}
            size={25}
          />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 20,
          paddingBottom: 50,
        }}
      >
        <View style={{ width: "80%" }}>
          <Text style={[generalStyles.poppins700_fs20]}>
            What Type Of Issue Are You Reporting?
          </Text>
        </View>
        <View style={{ gap: 20, marginTop: 15 }}>
          <ReportReasons
            heading={"Heading"}
            body={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnamnesciunt veniam hic facere perferendis asperiosimilique modi laudantium provident voluptas."
            }
            selected={selected}
            setSelected={setSelected}
            number={1}
          />
          <ReportReasons
            heading={"Heading"}
            body={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnamnesciunt veniam hic facere perferendis asperiosimilique modi laudantium provident voluptas."
            }
            selected={selected}
            setSelected={setSelected}
            number={2}
          />
          <ReportReasons
            heading={"Heading"}
            body={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnamnesciunt veniam hic facere perferendis asperiosimilique modi laudantium provident voluptas."
            }
            selected={selected}
            setSelected={setSelected}
            number={3}
          />
        </View>
        <View style={{ marginTop: 20, gap: 15 }}>
          <Text
            style={[generalStyles.poppins700_fs16, { color: colors.black }]}
          >
            Upload Substantial Evidence:
          </Text>

          <Pressable
            style={{ alignItems: "center", gap: 5 }}
            onPress={pickImage}
          >
            <View style={[generalStyles.allCenter, styles.cameraCont]}>
              <IonIcons name="camera" color={colors.primaryRed400} size={30} />
            </View>
            {image !== null && (
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.primaryRed400 },
                ]}
              >
                {image.fileName == null
                  ? image.uri.slice(image.uri.lastIndexOf("/") + 1)
                  : image.fileName}
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
      <View style={{ bottom: 20, paddingHorizontal: 15, paddingTop: 15 }}>
        <Btn100
          text="Report"
          bg={colors.primaryRed400}
          pressFunc={sendReport}
          disabled={selected == null}
        />
      </View>
      <ModalView visible={successModal} />
      <FailureModalView visible={failureModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  reportReasonsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
  },
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.primaryRed200,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 14,
    width: 14,
    borderRadius: 14 / 2,
    backgroundColor: colors.primaryRed400,
  },
  cameraCont: {
    height: 70,
    width: 100,
    borderRadius: 10,
    backgroundColor: colors.primaryRed100,
    // alignSelf: "center",
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  modalBox: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(244, 244, 246, 1)",
    alignItems: "center",
    gap: 15,
  },
  tickImage: { height: 60, width: 60 },
  modalTxt: {
    ...generalStyles.poppins400_fs16,
    color: colors.acentGrey800,
    textAlign: "center",
  },
});
