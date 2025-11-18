import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import LabelDropDownIcon from "../LabelDropDownIcon";
import LabelInputIcon from "../LabelInputIcon";
import { Btn100 } from "../Btn100";
import { colors, generalStyles } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";

const ArtisanSignUp = ({
  password,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setStreet,
  setTown,
  setRegion,
  setCity,
  setPhone,
  phoneNo,
  setArtisanType,
  setCompanyIndustry,
  setCompanyName,
  setService,
  companyNameErr,
  companyIndustryErr,
  serviceErr,
  artisanType,
  firstNameErr,
  lastNameErr,
  emailErr,
  passwordErr,
  confirmErr,
  streetErr,
  townErr,
  cityErr,
  phoneErr,
  regionErr,
  signUp,
  loading,
}) => {
  const navigation = useNavigation<any>();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  return (
    <View style={{ marginTop: 30, gap: 15 }}>
      <LabelDropDownIcon
        label="Type of Account"
        placeholder="Select Account Type"
        collection={[
          { label: "Individual", value: "individual", default: true },
          { label: "Company", value: "company" },
        ]}
        onSelect={setArtisanType}
      />
      <LabelInputIcon
        placeholder="Enter First Name"
        label="First Name"
        onChangeText={setFirstName}
        showErrorText={firstNameErr}
        errorText="Please enter first name"
      />
      <LabelInputIcon
        placeholder="Enter Last Name"
        label="Last Name"
        onChangeText={setLastName}
        showErrorText={lastNameErr}
        errorText="Please enter last name"
      />
      {artisanType == "company" && (
        <LabelInputIcon
          placeholder="Enter Company Name"
          label="Company Name"
          onChangeText={setCompanyName}
          showErrorText={companyNameErr}
          errorText="Please enter company name"
        />
      )}
      {artisanType == "company" && (
        <LabelDropDownIcon
          label="Type of Company"
          placeholder="Enter Company Type"
          collection={[
            { label: "Education", value: "education" },
            { label: "Technology", value: "technology" },
            { label: "Fashion", value: "fashion" },
          ]}
          onSelect={setCompanyIndustry}
          showErrorText={companyIndustryErr}
          errorText="Please enter company type"
        />
      )}

      <LabelInputIcon
        placeholder="Enter Email"
        label={artisanType == "individual" ? "Email" : "Company Email"}
        keyboardType="email-address"
        onChangeText={setEmail}
        showErrorText={emailErr}
        errorText="Please enter a valid email address"
      />
      <LabelInputIcon
        placeholder="Enter Password"
        label="Password"
        showRightIcon
        rightIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={() => setHidePassword(!hidePassword)}
        secureTextEntry={hidePassword}
        onChangeText={setPassword}
        showErrorText={passwordErr}
        errorText="Password must be at least 8 characters long, must contain at least a number, an uppercase letter, and a special character"
      />
      <LabelInputIcon
        placeholder="Enter Password"
        label="Confirm Password"
        showRightIcon
        rightIcon={hideConfirmPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={() => setHideConfirmPassword(!hideConfirmPassword)}
        secureTextEntry={hideConfirmPassword}
        disabled={password == ""}
        onChangeText={setConfirmPassword}
        showErrorText={confirmErr}
        errorText="Passwords do not match!"
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
        <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
          Phone Number
        </Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNo}
          defaultCode="GH"
          layout="first"
          onChangeText={(text) => {
            setPhone(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
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
      />
      <LabelInputIcon
        placeholder="Enter Region"
        label="Region"
        onChangeText={setRegion}
        showErrorText={regionErr}
        errorText="Region cannot be empty!"
      />
      <LabelInputIcon
        placeholder="Enter City"
        label="City"
        onChangeText={setCity}
        showErrorText={cityErr}
        errorText="City cannot be empty!"
      />
      <LabelInputIcon
        placeholder="Enter Town"
        label="Town"
        onChangeText={setTown}
        showErrorText={townErr}
        errorText="Town cannot be empty!"
      />
      <View style={{ marginTop: 30 }}>
        <Btn100
          bg={colors.primaryRed400}
          text="Next"
          textCol="#fff"
          pressFunc={() => {
            const checkValid = phoneInput.current?.isValidNumber(phoneNo);
            signUp(!checkValid);
          }}
          rounded
          disabled={loading}
          leftComponent={
            loading && <ActivityIndicator size={20} color={"#fff"} />
          }
        />
      </View>
    </View>
  );
};

export default ArtisanSignUp;

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
