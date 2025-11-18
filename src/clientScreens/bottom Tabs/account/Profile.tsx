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
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { TextInput6 } from "../../../components/TextInput6";
import { AddImageModal } from "../../../components/AddImageModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  updateUserData,
} from "../../../redux/features/UserData";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";

export const Profile = () => {
  const navigation = useNavigation<any>();
  const data: UserDataProps = useSelector(selectUserData);
  const [fullName, setFullName] = useState(
    data.clientType == "individual"
      ? `${data.firstName} ${data.lastName}`
      : data.companyName
  );
  const [email, setEmail] = useState(data.email);
  const [phoneNo, setPhoneNo] = useState(data.phoneNo);
  const [city, setCity] = useState(data.city);
  const [town, setTown] = useState(data.town);
  const [region, setRegion] = useState(data.region);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(data.image);
  const dispatch = useDispatch();

  function updateProfile() {
    dispatch(
      updateUserData({ ...data, image, email, phoneNo, city, region, town })
    );
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Profile"} />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20, alignItems: "center", gap: 7 }}>
          <Pressable
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => setModalVisible(true)}
          >
            <View>
              {image == null && (
                <Image
                  source={require("../../../../assets/images/signUp/2.png")}
                  style={{ height: 90, width: 90, borderRadius: 45 }}
                />
              )}
              {image !== null && (
                <Image
                  source={{ uri: image }}
                  style={{ height: 90, width: 90, borderRadius: 45 }}
                />
              )}
            </View>

            <View style={styles.layer}></View>
            <View style={{ position: "absolute" }}>
              <IonIcons name="camera" color={"#fff"} size={20} />
            </View>
          </Pressable>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.primaryRed400 },
            ]}
          >
            Edit
          </Text>
        </View>
        <View style={{ marginTop: 20, gap: 15 }}>
          <TextInput6
            label={data.clientType == "company" ? "Company Name" : "Full Name"}
            placeholder={
              data.clientType == "company"
                ? "Enter Company Name"
                : "Enter Full Name"
            }
            defaultValue={fullName}
            onChangeText={(txt) => setFullName(txt)}
          />
          <TextInput6
            label="Email"
            placeholder="Enter Email"
            defaultValue={email}
            onChangeText={(txt) => setEmail(txt)}
          />
          <TextInput6
            label="Phone"
            placeholder="Enter Phone No."
            defaultValue={phoneNo}
            onChangeText={(txt) => setPhoneNo(txt)}
          />
          <TextInput6
            label="City"
            placeholder="Enter City"
            defaultValue={city}
            onChangeText={(txt) => setCity(txt)}
          />
          <TextInput6
            label="Region"
            placeholder="Enter Region"
            defaultValue={region}
            onChangeText={(txt) => setRegion(txt)}
          />
          <TextInput6
            label="Town"
            placeholder="Enter Town"
            defaultValue={town}
            onChangeText={(txt) => setTown(txt)}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Btn100
            text="Edit Profile"
            bg={colors.primaryRed400}
            pressFunc={updateProfile}
            rounded
          />
        </View>
      </ScrollView>
      <AddImageModal
        visible={modalVisible}
        setVisible={setModalVisible}
        onSelect={setImage}
        onDelete={setImage}
        aspect={[3, 3]}
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
  layer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: 90,
    width: 90,
    borderRadius: 45,
    position: "absolute",
  },
});
