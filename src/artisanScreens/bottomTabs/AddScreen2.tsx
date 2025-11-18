import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import LabelInputIcon from "../../components/LabelInputIcon";
import LabelDropDownIcon from "../../components/LabelDropDownIcon";
import { Btn100 } from "../../components/Btn100";

export const AddScreen2 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData = route.params.data; // {selected: [{id: ..., option: ...}], image: imageUri}
  const [image, setImage] = useState(passedData.image);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState({ minimum: "", maximum: "" });
  const disabled =
    title == "" ||
    desc == "" ||
    category == "" ||
    price.maximum == "" ||
    price.minimum == "" ||
    parseInt(price.minimum) > parseInt(price.maximum);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Create New Service" hideRightComp />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {image !== null && (
            <Image
              source={{ uri: passedData.image }}
              style={{
                height: 250,
                width: "100%",
                borderRadius: 20,
                marginTop: 20,
              }}
            />
          )}
          <View style={{ marginTop: 20, gap: 15 }}>
            <LabelInputIcon
              label="Service Title"
              placeholder="Enter Service Title"
              onChangeText={setTitle}
            />
            <View style={{ gap: 5 }}>
              <Text
                style={[generalStyles.poppins400_fs14, { color: colors.black }]}
              >
                Service Description
              </Text>
              <TextInput
                multiline
                style={styles.textinput}
                placeholder="Enter Service Description"
                placeholderTextColor={"#999"}
                onChangeText={setDesc}
              />
            </View>
            <LabelDropDownIcon
              label="Service Categories"
              onSelect={setCategory}
              placeholder="Select Service Categories"
              collection={[
                { label: "Education", value: "education" },
                { label: "Technology", value: "technology" },
              ]}
            />
            <View
              style={[
                generalStyles.flexRow,
                { gap: 10, width: "100%", alignItems: "flex-end" },
              ]}
            >
              <View style={{ flex: 1 }}>
                <LabelInputIcon
                  label="Price Range"
                  placeholder="Minimum"
                  onChangeText={(txt) => setPrice({ ...price, minimum: txt })}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{ flex: 1 }}>
                <LabelInputIcon
                  placeholder="Maximum"
                  onChangeText={(txt) => setPrice({ ...price, maximum: txt })}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.btnCont}>
        <Btn100
          text="Continue"
          bg={disabled ? colors.acentGrey300 : colors.primaryRed400}
          pressFunc={() => navigation.navigate("AddScreen3")}
          rounded
          disabled={disabled}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinput: {
    minHeight: 150,
    maxHeight: 200,
    color: "#444",
    fontFamily: "Poppins400",
    padding: 10,
    borderRadius: 20,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    textAlignVertical: "top",
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
});
