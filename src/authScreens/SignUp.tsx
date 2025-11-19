import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RadioBtns from "../components/RadioBtns";
import ClientSignUp from "../components/auth/ClientSignUp";
import ArtisanSignUp from "../components/auth/ArtisanSignUp";
import { BackBtn } from "../components/auth/BackBtn";
import { useDispatch } from "react-redux";
import { updateRegisterData } from "../redux/features/RegistrationData";
import * as ImagePicker from "expo-image-picker";
import { ScreenLayout } from "../components/layouts/ScreenLayout";
import { Vspacer } from "../components/Vspacer";

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [image, setImage] = useState(null);
  const [accountType, setAccountType] = useState("client");
  const [clientType, setClientType] = useState("individual");
  const [artisanType, setArtisanType] = useState("individual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [service, setService] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const [streetErr, setStreetErr] = useState(false);
  const [regionErr, setRegionErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [townErr, setTownErr] = useState(false);
  const [phoneErr, setPhoneErrErr] = useState(false);
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [companyIndustryErr, setCompanyIndustryErr] = useState(false);
  const [serviceErr, setServiceErr] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const FakeClientData: UserDataProps = {
    id: "98754",
    firstName: firstName.replace(/\s/g, ""),
    lastName: lastName.replace(/\s/g, ""),
    phoneNo,
    email,
    street,
    town,
    city,
    clientType,
    artisanType,
    service,
    region,
    image: image || null,
    companyIndustry,
    companyName,
    password,
    accountType,
  };

  function signUp(phoneErr: boolean) {
    setPhoneErrErr(phoneErr);
    setCityErr(false);
    setEmailErr(false);
    setTownErr(false);
    setStreetErr(false);
    setConfirmErr(false);
    setFirstNameErr(false);
    setLastNameErr(false);
    setpasswordErr(false);
    setRegionErr(false);
    setCompanyNameErr(false);
    setCompanyIndustryErr(false);
    setServiceErr(false);

    const notValid =
      city == "" ||
      town == "" ||
      region == "" ||
      street == "" ||
      phoneErr ||
      !passwordRegex.test(password) ||
      password !== confirmPassword ||
      !emailRegex.test(email) ||
      (clientType == "company" && companyName == "") ||
      (clientType == "individual" && (firstName == "" || lastName == "")) ||
      (accountType == "artisan" &&
        artisanType == "company" &&
        companyIndustry == "") ||
      (accountType == "artisan" && service == "") ||
      (accountType == "artisan" &&
        artisanType == "company" &&
        companyName == "");

    if (notValid) {
      if (
        (clientType == "company" ||
          (accountType == "artisan" && artisanType == "company")) &&
        companyName == ""
      ) {
        setCompanyNameErr(true);
      }

      if (clientType == "individual" || accountType == "artisan") {
        if (firstName == "") {
          setFirstNameErr(true);
        }
        if (lastName == "") {
          setLastNameErr(true);
        }
      }

      if (accountType == "artisan" && service == "") {
        setServiceErr(true);
      }

      if (
        (clientType == "company" ||
          (accountType == "artisan" && artisanType == "company")) &&
        companyIndustry == ""
      ) {
        setCompanyIndustryErr(true);
      }

      if (!emailRegex.test(email)) {
        setEmailErr(true);
      }
      if (!passwordRegex.test(password)) {
        setpasswordErr(true);
      }
      if (password !== confirmPassword) {
        setConfirmErr(true);
      }
      if (phoneErr == true) {
        setPhoneErrErr(true);
      }
      if (street == "") {
        setStreetErr(true);
      }
      if (region == "") {
        setRegionErr(true);
      }
      if (city == "") {
        setCityErr(true);
      }
      if (town == "") {
        setTownErr(true);
      }
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // registration details will be stored in redux state. you can also register
      // user here with the details, which ever works.
      dispatch(updateRegisterData(FakeClientData));
      setLoading(false);
      navigation.navigate("PhoneVerification");
    }, 1500);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScreenLayout>
      <View style={[]}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <BackBtn />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <Text
            style={[
              generalStyles.poppins500_fs22,
              { color: colors.secondaryBlue200, marginTop: 20, fontSize: 32 },
            ]}
          >
            {accountType == "client" &&
              clientType == "individual" &&
              "Fill in Your Details"}
            {accountType == "client" &&
              clientType == "company" &&
              "Fill in Company Details"}
            {accountType == "artisan" &&
              artisanType == "individual" &&
              "Fill in Your Details"}
            {accountType == "artisan" &&
              artisanType == "company" &&
              "Fill in Company Details"}
          </Text>
          <Pressable style={styles.imageCont} onPress={pickImage}>
            {image == null && (
              <Image
                source={require("../../assets/images/signUp/2.png")}
                style={styles.placeholderImg}
              />
            )}
            {image !== null && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
            <View style={{ position: "absolute", bottom: 10, right: 20 }}>
              <Image
                source={require("../../assets/images/signUp/3.png")}
                style={{ height: 20, width: 20 }}
              />
            </View>
          </Pressable>
          <View style={{ marginTop: 40, alignItems: "center", gap: 15 }}>
            <Text
              style={[generalStyles.poppins400_fs16, { color: colors.black }]}
            >
              Which are you?
            </Text>
            <RadioBtns
              defaultValue="client"
              collection={[
                { name: "Client", value: "client" },
                { name: "Artisan", value: "artisan" },
              ]}
              onSelect={setAccountType}
            />
          </View>
          {accountType == "client" && (
            <ClientSignUp
              password={password}
              setCity={setCity}
              setClientType={setClientType}
              setConfirmPassword={setConfirmPassword}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setRegion={setRegion}
              setStreet={setStreet}
              setTown={setTown}
              setPhone={setPhoneNo}
              phoneErr={phoneErr}
              firstNameErr={firstNameErr}
              lastNameErr={lastNameErr}
              cityErr={cityErr}
              townErr={townErr}
              phoneNo={phoneNo}
              passwordErr={passwordErr}
              confirmErr={confirmErr}
              streetErr={streetErr}
              emailErr={emailErr}
              clientType={clientType}
              setCompanyIndustry={setCompanyIndustry}
              regionErr={regionErr}
              signUp={signUp}
              loading={loading}
              setCompanyName={setCompanyName}
              companyNameErr={companyNameErr}
            />
          )}
          {accountType == "artisan" && (
            <ArtisanSignUp
              password={password}
              setCity={setCity}
              setArtisanType={setArtisanType}
              setConfirmPassword={setConfirmPassword}
              setEmail={setEmail}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setRegion={setRegion}
              setStreet={setStreet}
              setTown={setTown}
              setPhone={setPhoneNo}
              phoneErr={phoneErr}
              firstNameErr={firstNameErr}
              lastNameErr={lastNameErr}
              cityErr={cityErr}
              townErr={townErr}
              phoneNo={phoneNo}
              passwordErr={passwordErr}
              confirmErr={confirmErr}
              streetErr={streetErr}
              emailErr={emailErr}
              serviceErr={serviceErr}
              companyIndustryErr={companyIndustryErr}
              setService={setService}
              artisanType={artisanType}
              setCompanyIndustry={setCompanyIndustry}
              regionErr={regionErr}
              signUp={signUp}
              loading={loading}
              setCompanyName={setCompanyName}
              companyNameErr={companyNameErr}
            />
          )}
          <Vspacer size={100} />
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primaryRed400,
  },
  placeholderImg: {
    height: 100,
    width: 100,
  },
  imageCont: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    backgroundColor: colors.acentGrey50,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
});
