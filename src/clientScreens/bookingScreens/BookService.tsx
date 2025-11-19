import {
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles, month_2 } from "../../utils";
import { BackIconTitle } from "../../components/BackIconTitle";
import IonIcons from "@expo/vector-icons/Ionicons";
import { TextInput5 } from "../../components/TextInput5";
import { Btn100 } from "../../components/Btn100";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { Vspacer } from "../../components/Vspacer";
import DateTimePicker from "@react-native-community/datetimepicker";

// here's what's happening: these is data for time selection. if the current hour is
// greater than the time, the button will be disabled.
const timeData = [
  { time: "7:00am", hour: 7 },
  { time: "8:00am", hour: 8 },
  { time: "9:00am", hour: 9 },
  { time: "10:00am", hour: 10 },
  { time: "11:00am", hour: 11 },
  { time: "12:00pm", hour: 12 },
  { time: "1:00pm", hour: 13 },
  { time: "2:00pm", hour: 14 },
  { time: "3:00pm", hour: 15 },
  { time: "4:00pm", hour: 16 },
  { time: "5:00pm", hour: 17 },
  { time: "6:00pm", hour: 18 },
];

const { width } = Dimensions.get("window");
export const BookService = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { artisanData } = route.params;
  const [selectedTime, setSelectedTime] = useState(null);
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const dateString = `${date?.getDate()} ${
    month_2[date?.getMonth()]
  }, ${date?.getFullYear()}`;

  function proceed() {
    if (
      date == null ||
      selectedTime == null ||
      address == null ||
      address == ""
    ) {
      if (date == null) {
        setDateErr(true);
      }
      if (selectedTime == null) {
        setTimeErr(true);
      }
      if (address == "" || address == null) {
        setAddressErr(true);
      }

      setTimeout(() => {
        setDateErr(false);
        setTimeErr(false);
        setAddressErr(false);
      }, 1000);
      return;
    }
    navigation.navigate("BookingDetails", {
      data: {
        date: dateString,
        time: selectedTime,
        address,
        artisanData,
        description,
      },
    });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  function getLocation() {
    // get user's current location using geocoding api here.
  }

  function isDateInValid(givenHour) {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const currentHour = currentDate.getHours();

    return (
      givenDate < currentDate ||
      (givenDate === currentDate && currentHour >= givenHour)
    );
  }

  return (
    <ScreenLayout>
      <Vspacer />
      <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
        <BackIconTitle title={"Book Service"} />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
        <ScrollView
          style={{ marginBottom: 20 }}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.stepsCont}>
            <View style={{ alignItems: "center" }}>
              <IonIcons name="ellipse" color={colors.primaryRed400} size={27} />
              <Text
                style={[generalStyles.poppins400_fs12, { color: colors.black }]}
              >
                Step 1
              </Text>
            </View>
            <View style={styles.dash}></View>
            <View style={{ alignItems: "center" }}>
              <IonIcons name="ellipse" color={colors.primaryRed200} size={27} />
              <Text
                style={[generalStyles.poppins400_fs12, { color: colors.black }]}
              >
                Step 2
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 30, paddingHorizontal: 17, gap: 7 }}>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.acentGrey600 },
              ]}
            >
              Select Date
            </Text>
            <Pressable
              onPress={() => showDatepicker()}
              style={[
                styles.enterDate,
                {
                  borderColor: dateErr
                    ? colors.primaryRed400
                    : colors.acentGrey200,
                },
              ]}
            >
              <IonIcons
                name="calendar-outline"
                size={17}
                color={colors.acentGrey500}
              />
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  {
                    color: date == null ? colors.acentGrey300 : colors.black,
                    lineHeight: 16,
                  },
                ]}
              >
                {date == null ? "Enter Date" : dateString}
              </Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              Working Time
            </Text>
            <View style={styles.timesCont}>
              {timeData.map((item, index) => (
                <Pressable
                  onPress={() => {
                    selectedTime == item.time
                      ? setSelectedTime(null)
                      : setSelectedTime(item.time);
                  }}
                  disabled={isDateInValid(item.hour) || date == null}
                  style={[
                    generalStyles.allCenter,
                    styles.timeBox,
                    {
                      backgroundColor:
                        selectedTime == item.time && !isDateInValid(item.hour)
                          ? colors.primaryRed400
                          : "transparent",
                      borderColor: timeErr
                        ? colors.primaryRed400
                        : colors.acentGrey200,
                    },
                  ]}
                  key={index}
                >
                  <Text
                    style={[
                      generalStyles.poppins400_fs14,
                      {
                        color:
                          selectedTime == item.time && !isDateInValid(item.hour)
                            ? "#fff"
                            : colors.secondaryBlue300,
                      },
                    ]}
                  >
                    {item.time}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 30, paddingHorizontal: 15, gap: 7 }}>
            <TextInput5
              placeholder="Enter Your Address"
              leftIcon="location"
              onChangeText={setAddress}
              textInputContstyle={{
                borderColor: addressErr
                  ? colors.primaryRed400
                  : colors.acentGrey200,
              }}
            />
            <Text
              style={[
                generalStyles.poppins500_fs12,
                { color: colors.primaryRed400, alignSelf: "flex-end" },
              ]}
              onPress={getLocation}
            >
              Use Current Location
            </Text>
          </View>
          <View
            style={{ paddingHorizontal: 15, marginTop: 20, marginBottom: 30 }}
          >
            <TextInput
              style={[generalStyles.poppins500_fs14, styles.textInput]}
              placeholder="Kindly Describe the task properly"
              placeholderTextColor={colors.acentGrey300}
              multiline
              onChangeText={setDescription}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={{
          paddingHorizontal: 15,
          paddingTop: 15,
          bottom: 20,
          backgroundColor: colors.acentGrey50,
        }}
      >
        <Btn100 text="Proceed" bg={colors.primaryRed400} pressFunc={proceed} />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  stepsCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 50,
    marginTop: 15,
  },
  dash: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1.2,
    borderColor: colors.black,
    borderStyle: "dashed",
    flex: 1,
  },
  timesCont: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "space-between",
    marginTop: 15,
  },
  timeBox: {
    paddingVertical: 8,
    width: width * 0.3 - 15,
    borderRadius: 3,
    // borderColor: colors.acentGrey200,
    borderWidth: 1.3,
  },
  textInput: {
    minHeight: 80,
    backgroundColor: colors.whiteBg,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    padding: 15,
    textAlignVertical: "top",
    color: colors.acentGrey600,
  },
  enterDate: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    backgroundColor: colors.whiteBg,
    borderWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
  },
});
