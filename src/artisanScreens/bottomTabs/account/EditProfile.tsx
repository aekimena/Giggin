import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import LabelDropDownIcon from "../../../components/LabelDropDownIcon";
import LabelInputIcon from "../../../components/LabelInputIcon";
import PhoneInput from "react-native-phone-number-input";
import { Btn100 } from "../../../components/Btn100";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../redux/features/UserData";

export const EditProfile = () => {
  const user: UserDataProps = useSelector(selectUserData);
  const navigation = useNavigation<any>();
  const phoneInput = useRef<PhoneInput>(null);
  const [loading, setLoading] = useState(false);
  const [artisanType, setArtisanType] = useState("individual");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState(user.street);
  const [region, setRegion] = useState(user.region);
  const [city, setCity] = useState(user.city);
  const [town, setTown] = useState(user.town);
  const [companyName, setCompanyName] = useState(user.companyName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [service, setService] = useState(user.service);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [streetErr, setStreetErr] = useState(false);
  const [regionErr, setRegionErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [townErr, setTownErr] = useState(false);
  const [phoneErr, setPhoneErrErr] = useState(false);
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [serviceErr, setServiceErr] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function editProfile(phoneErr) {
    setPhoneErrErr(phoneErr);
    setCityErr(false);
    setEmailErr(false);
    setTownErr(false);
    setStreetErr(false);
    setFirstNameErr(false);
    setLastNameErr(false);
    setRegionErr(false);
    setCompanyNameErr(false);
    setServiceErr(false);
    const notValid =
      city == "" ||
      town == "" ||
      region == "" ||
      street == "" ||
      phoneErr ||
      !emailRegex.test(email) ||
      firstName == "" ||
      lastName == "" ||
      (artisanType == "company" && companyName == "") ||
      service == "";
    if (notValid) {
      if (artisanType == "company" && companyName == "") {
        setCompanyNameErr(true);
      }

      if (firstName == "") {
        setFirstNameErr(true);
      }
      if (lastName == "") {
        setLastNameErr(true);
      }

      if (service == "") {
        setServiceErr(true);
      }

      if (!emailRegex.test(email)) {
        setEmailErr(true);
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
    navigation.goBack();
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 25,
      }}
    >
      <OverviewPagesHeader title="Edit Profile" hideRightComp />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 15 }}>
          <LabelInputIcon
            placeholder="Enter First Name"
            label="First Name"
            onChangeText={setFirstName}
            showErrorText={firstNameErr}
            errorText="Please enter first name"
            defaultValue={firstName}
          />
          <LabelInputIcon
            placeholder="Enter Last Name"
            label="Last Name"
            onChangeText={setLastName}
            showErrorText={lastNameErr}
            errorText="Please enter last name"
            defaultValue={lastName}
          />
          {artisanType == "company" && (
            <LabelInputIcon
              placeholder="Enter Company Name"
              label="Company Name"
              onChangeText={setCompanyName}
              showErrorText={companyNameErr}
              errorText="Please enter company name"
              defaultValue={companyName}
            />
          )}

          <LabelInputIcon
            placeholder="Enter Email"
            label={artisanType == "individual" ? "Email" : "Company Email"}
            keyboardType="email-address"
            onChangeText={setEmail}
            showErrorText={emailErr}
            errorText="Please enter a valid email address"
            defaultValue={email}
          />
          <LabelDropDownIcon
            label="Primary service you provide"
            placeholder="Select Service"
            collection={[
              { label: "Cleaning", value: "cleaning" },
              { label: "Ironing Cloths", value: "iorning" },
              { label: "Drawing and Painting", value: "art" },
            ]}
            onSelect={setService}
            showErrorText={serviceErr}
            errorText="Please enter primary service"
          />
          <View style={{ gap: 5 }}>
            <Text
              style={[generalStyles.poppins400_fs14, { color: colors.black }]}
            >
              Phone Number
            </Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={user.phoneNo}
              defaultCode="GH"
              layout="first"
              onChangeText={(text) => {
                setPhoneNo(text);
              }}
              containerStyle={styles.phoneCont}
              textContainerStyle={styles.phoneTxtCont}
            />
            {phoneErr == true && (
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.primaryRed400 },
                ]}
              >
                Please enter a valid phone number
              </Text>
            )}
          </View>

          <LabelInputIcon
            placeholder="Enter Street Address"
            label="Street Address"
            onChangeText={setStreet}
            showErrorText={streetErr}
            errorText="Street address cannot be empty!"
            defaultValue={street}
          />
          <LabelInputIcon
            placeholder="Enter Region"
            label="Region"
            onChangeText={setRegion}
            showErrorText={regionErr}
            errorText="Region cannot be empty!"
            defaultValue={region}
          />
          <LabelInputIcon
            placeholder="Enter City"
            label="City"
            onChangeText={setCity}
            showErrorText={cityErr}
            errorText="City cannot be empty!"
            defaultValue={city}
          />
          <LabelInputIcon
            placeholder="Enter Town"
            label="Town"
            onChangeText={setTown}
            showErrorText={townErr}
            errorText="Town cannot be empty!"
            defaultValue={town}
          />
          <View style={{ marginTop: 30 }}>
            <Btn100
              bg={colors.primaryRed400}
              text="Edit Profile"
              textCol="#fff"
              pressFunc={() => {
                const checkValid = phoneInput.current?.isValidNumber(phoneNo);
                setPhoneErrErr(!checkValid);
                editProfile(!checkValid);
              }}
              rounded
              disabled={loading}
              leftComponent={
                loading && <ActivityIndicator size={20} color={"#fff"} />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelTxt: {
    color: "#444",
    fontFamily: "Poppins400",
  },
  textinputCont: {
    height: 50,
    width: "100%",
    borderRadius: 50,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    paddingHorizontal: 15,
  },
  phoneCont: {
    height: 50,
    borderRadius: 50,
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
  },
  phoneTxtCont: {
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "rgba(0,0,0,0.3)",
    borderLeftWidth: 0.5,
    color: colors.black,
    fontFamily: generalStyles.poppins400_fs12.fontFamily,
  },
});
