import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BackIconTitle } from "../../components/BackIconTitle";
import { colors, generalStyles } from "../../utils";
import { TextInput5 } from "../../components/TextInput5";
import IonIcons from "@expo/vector-icons/Ionicons";
import { ClientMessages } from "../../utils/dummyData";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  selectClientConvos,
} from "../../redux/features/client/Messages";

interface RenderProps {
  item: ClientMessagesProps;
}

export const Messaging = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [dataLoading, setDataLoading] = useState(true);
  const dispatch = useDispatch();
  const data: Array<ClientMessagesProps> = useSelector(selectClientConvos);
  const [inputTxt, setInputTxt] = useState("");
  const filteredData: Array<ClientMessagesProps> = data.filter((item) =>
    item.messages.some(
      (message) =>
        message.text.toLowerCase().includes(inputTxt.toLowerCase()) ||
        item.artisan.name.toLowerCase().includes(inputTxt.toLowerCase())
    )
  );

  useEffect(() => {
    // first fetch all conversations of the client and artisans.
    // store them in redux state.
    ClientMessages.map((item) => {
      dispatch(addConversation(item));
    });

    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  const RenderMessages = ({ item }: RenderProps) => {
    // pleaseee, for the time display to work, the time has to be in milliseconds
    // since epoch just like i did in the dummy data.
    const latestMsg = item.messages[item.messages.length - 1];
    const latestMsgTxt = item.messages[item.messages.length - 1].text;
    const timestampString = item.messages[item.messages.length - 1].time;
    const timestamp = parseInt(timestampString);
    const dateObject = new Date(timestamp);
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const latestTimeString = `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }${hour < 12 ? "am" : "pm"}`;
    const unreadMessages = item.messages.filter(
      (msg) => msg.unread == true && msg.sender == "artisan"
    );
    return (
      <Pressable
        style={({ pressed }) => [
          styles.box,
          { backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "#fff" },
        ]}
        onPress={() =>
          navigation.navigate("Chats", {
            artisan: item.artisan,
          })
        }
      >
        <View style={[styles.flexRow, { gap: 10, flex: 1 }]}>
          <Image
            source={item.artisan.image}
            style={{ height: 80, width: 80, borderRadius: 40 }}
          />
          <View style={{ gap: 10, flex: 1 }}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              {item.artisan.name}
            </Text>
            {latestMsg.type == "text" && (
              <Text
                style={[
                  generalStyles.poppins400_fs14,
                  { color: colors.acentGrey600 },
                ]}
                numberOfLines={1}
              >
                {latestMsgTxt}
              </Text>
            )}
            {latestMsg.type == "media" && (
              <IonIcons name="images" size={15} color={colors.black} />
            )}
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.acentGrey400 },
            ]}
          >
            {latestTimeString}
          </Text>
          {unreadMessages.length > 0 && latestMsg.sender == "artisan" && (
            <View style={styles.unread}>
              <Text style={[{ color: "#fff", fontSize: 12 }]}>
                {unreadMessages.length}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.acentGrey50}
        barStyle="dark-content"
        translucent={false}
      />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Messages"} />
      </View>
      {dataLoading && (
        <View style={[generalStyles.flex1, generalStyles.allCenter]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <>
          <View style={styles.searchMsgCont}>
            <View style={{ flex: 1 }}>
              <TextInput5
                placeholder="Search Messages"
                leftIcon="search"
                onChangeText={setInputTxt}
              />
            </View>

            <Pressable>
              <IonIcons
                name="filter-outline"
                size={30}
                color={colors.primaryRed400}
              />
            </Pressable>
          </View>
          {data.length == 0 && (
            <View style={[generalStyles.allCenter, generalStyles.flex1]}>
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: colors.acentGrey300, fontSize: 30, lineHeight: 48 },
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
                paddingTop: 10,
                paddingBottom: 15,
              }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
  box: {
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  },
  searchMsgCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 15,
  },
});
