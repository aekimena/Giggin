import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../utils";
import { DashboardHeader } from "../../components/DashboardHeader";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ArtisanMessages } from "../../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  selectArtisanConvos,
} from "../../redux/features/artisan/Messages";
import { useNavigation } from "@react-navigation/native";

interface RenderProps {
  item: ArtisanMessagesProps;
}

const RenderMessages = ({ item }: RenderProps) => {
  const navigation = useNavigation<any>();
  // pleaseee, for the time display to work, the time has to be in milliseconds
  // since epoch just like i did in the dummy data.
  const latestMsg = item.messages[item.messages.length - 1];
  const latestMsgTxt = item.messages[item.messages.length - 1].text;
  const timestampString = item.messages[item.messages.length - 1].time;
  const dateObject = new Date(timestampString);
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const latestTimeString = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }${hour < 12 ? "am" : "pm"}`;
  const unreadMessages = item.messages.filter(
    (msg) => msg.unread == true && msg.sender == "client"
  );
  return (
    <Pressable
      style={styles.box}
      onPress={() =>
        navigation.navigate("Chats", {
          client: item.client,
        })
      }
    >
      <View style={[generalStyles.flexRow, { gap: 10, flex: 1 }]}>
        <Image
          source={item.client.image}
          style={{ height: 70, width: 90, borderRadius: 10 }}
        />
        <View style={{ gap: 5, flex: 1 }}>
          <Text
            style={[generalStyles.poppins500_fs14, { color: colors.black }]}
          >
            {item.client.firstName} {item.client.lastName}
          </Text>
          {latestMsg.type == "text" && (
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.acentGrey600 },
              ]}
              numberOfLines={2}
            >
              {latestMsgTxt}
            </Text>
          )}
          {latestMsg.type == "media" && (
            <IonIcons name="images" size={15} color={colors.black} />
          )}
        </View>
      </View>
      <View style={{ height: "100%", justifyContent: "space-between" }}>
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { color: colors.acentGrey400 },
          ]}
        >
          {latestTimeString}
        </Text>
        {unreadMessages.length > 0 && latestMsg.sender == "client" && (
          <View style={styles.unread}>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: "#fff", lineHeight: 16 },
              ]}
            >
              {unreadMessages.length}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export const Messages = () => {
  const [inputTxt, setInputTxt] = useState("");
  const data: Array<ArtisanMessagesProps> = useSelector(selectArtisanConvos);
  const [dataLoading, setDataLoading] = useState(true);
  const dispatch = useDispatch();
  const filteredData: Array<ArtisanMessagesProps> = data.filter((item) =>
    item.messages.some(
      (message) =>
        message.text?.toLowerCase().includes(inputTxt.toLowerCase()) ||
        item.client.firstName.toLowerCase().includes(inputTxt.toLowerCase()) ||
        item.client.lastName.toLowerCase().includes(inputTxt.toLowerCase())
    )
  );

  useEffect(() => {
    // first fetch all conversations of the client and artisans.
    // store them in redux state.
    ArtisanMessages.map((item) => {
      dispatch(addConversation(item));
    });

    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
        paddingHorizontal: 25,
      }}
    >
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <DashboardHeader title="Messages" />
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}

      {!dataLoading && (
        <>
          <View style={{ paddingBottom: 15 }}>
            <View style={styles.textinputCont}>
              <IonIcons name="search" color={colors.primaryRed400} size={20} />
              <TextInput
                style={styles.textinput}
                placeholder="Search for recent messages"
                placeholderTextColor="rgba(104, 104, 104, 1)"
                onChangeText={setInputTxt}
              />
            </View>
          </View>

          {data.length == 0 && (
            <View style={[generalStyles.allCenter, generalStyles.flex1]}>
              <Text
                style={[
                  generalStyles.poppins500_fs22,
                  { color: colors.acentGrey400 },
                ]}
              >
                No Messages
              </Text>
            </View>
          )}
          {data.length !== 0 && (
            <FlatList
              data={inputTxt == "" ? data : filteredData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={(item: any) => <RenderMessages {...item} />}
              contentContainerStyle={{
                gap: 15,
                paddingTop: 20,
                paddingBottom: 50,
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinputCont: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    height: 50,
    width: "100%",
    backgroundColor: colors.whiteBg,
    paddingHorizontal: 15,
    shadowColor: "#000",
    elevation: 5,
    gap: 15,
  },
  textinput: {
    flex: 1,
    height: "100%",
    color: colors.black,
    ...generalStyles.poppins400_fs16,
  },
  box: {
    padding: 15,
    height: 100,
    backgroundColor: colors.primaryRed50,
    borderColor: colors.acentGrey200,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  unread: {
    height: 20,
    minWidth: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryRed400,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 2,
    marginBottom: 5,
  },
});
