import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  selectClientConvos,
  sendNewMessage,
} from "../redux/features/client/Messages";
import { ClientMessages } from "../utils/dummyData";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

interface RenderProps {
  item: ClientMessageObjProps;
  messageBefore: ClientMessageObjProps;
}

const RenderChat = ({ item, messageBefore }: RenderProps) => {
  // like i said ealier, the time should be in milliseconds since epoch
  const timestampString = item.time;
  const timestamp = parseInt(timestampString);
  const dateObject = new Date(timestamp);

  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  const timeString = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }${hour < 12 ? "am" : "pm"}`;

  // check if the diff btw the message and message before is less than 24 hrs
  const messageWithin24Hrs =
    Math.abs(item.time - messageBefore?.time) < 24 * 60 * 60 * 1000;
  // check if time of message is less than 24 hrs
  const isToday = Math.abs(item.time - Date.now()) < 24 * 60 * 60 * 1000;
  // check if time of message is less than 48 hrs
  const isYesterDay =
    Math.abs(item.time - Date.now()) > 24 * 60 * 60 * 1000 &&
    Math.abs(item.time - Date.now()) < 48 * 60 * 60 * 1000;

  return (
    <View style={{ alignItems: "center" }}>
      {!messageWithin24Hrs && (
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { color: colors.acentGrey500, marginBottom: 15 },
          ]}
        >
          {isToday ? "Today" : isYesterDay ? "Yesterday" : dateString}
        </Text>
      )}
      {item.type == "text" && (
        <Pressable
          style={[
            styles.chatBox,
            {
              borderBottomLeftRadius: item.sender == "artisan" ? 0 : 10,
              borderBottomRightRadius: item.sender == "client" ? 0 : 10,
              alignSelf: item.sender == "artisan" ? "flex-start" : "flex-end",
              backgroundColor:
                item.sender == "artisan"
                  ? colors.primaryRed400
                  : colors.primaryRed100,
            },
          ]}
        >
          <Text
            style={[
              generalStyles.poppins500_fs12,
              {
                color:
                  item.sender == "artisan"
                    ? colors.whiteBg
                    : colors.acentGrey800,
              },
            ]}
          >
            {item.text}
          </Text>
        </Pressable>
      )}
      {item.type == "media" && (
        <View style={styles.imageMsgCont}>
          <Image
            source={require("../../assets/images/dashboard/2.png")}
            style={{ height: 20, width: 20 }}
          />
          <Pressable>
            <Image
              source={{ uri: item.image }}
              style={{ height: 150, width: width * 0.6, borderRadius: 20 }}
            />
          </Pressable>
        </View>
      )}
      <Text
        style={[
          generalStyles.poppins400_fs12,
          styles.timeString,
          {
            alignSelf: item.sender == "artisan" ? "flex-start" : "flex-end",
          },
        ]}
      >
        {timeString}
      </Text>
    </View>
  );
};

export const Chats = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute<any>();
  const { artisan } = route.params;
  const convos = useSelector(selectClientConvos);
  const data: Array<ClientMessagesProps> = useSelector(selectClientConvos);
  const convoExists = data.find((obj) => obj.artisan.id == artisan.id);
  const chats = data.find((obj) => obj.artisan.id == artisan.id)?.messages;
  const [dataLoading, setDataLoading] = useState(true);
  const [input, setInput] = useState("");
  const scrollRef = useRef<any>();
  const [fakeId, setFakeId] = useState(null); // this is just a fake id for conversation
  useEffect(() => {
    if (!dataLoading) {
      scrollRef.current.scrollToEnd({ animated: false });
    }
  }, []);

  useEffect(() => {
    // this is just for development.
    setFakeId(`${Date.now()}`);
    // do this to fetch the conversations first if they're not stored in redux state
    if (convos.length == 0) {
      ClientMessages.map((item) => {
        dispatch(addConversation(item));
      });

      setTimeout(() => {
        setDataLoading(false);
      }, 500);
    } else {
      setDataLoading(false);
    }
  }, []);
  function sendMessage() {
    // you need to first generate a unique id, assign it to a new conversation
    // if it doesn't exist, and then assign that same id to the new message parentId
    // that's about to be created. just like i did.
    const newMessage: ClientMessageObjProps = {
      id: `${Date.now()}`,
      text: input,
      time: Date.now(),
      sender: "client",
      parentId: convoExists ? chats[0].parentId : fakeId,
      type: "text",
    };

    // first check if a conversation exists and create one if it doesn't
    if (convoExists) {
      dispatch(sendNewMessage(newMessage));
    } else {
      (async () => {
        dispatch(
          addConversation({
            artisan: artisan,
            id: fakeId,
            messages: [newMessage],
          })
        );
      })();
    }

    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 300);
    setInput("");
  }

  function sendMedia(image) {
    const newMessage: ClientMessageObjProps = {
      id: `${Date.now()}`,
      time: Date.now(),
      type: "media",
      sender: "client",
      parentId: convoExists ? chats[0].parentId : fakeId,
      image: image,
      text: null,
    };
    if (convoExists) {
      dispatch(sendNewMessage(newMessage));
    } else {
      (async () => {
        dispatch(
          addConversation({
            artisan: artisan,
            id: fakeId,
            messages: [newMessage],
          })
        );
      })();
    }

    setTimeout(() => {
      scrollRef.current.scrollToEnd({ animated: false });
    }, 300);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      sendMedia(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />

      <View style={styles.headers}>
        <View style={[styles.flexRow, { gap: 5, flex: 1 }]}>
          <Pressable onPress={() => navigation.goBack()}>
            <IonIcons name="chevron-back" color={colors.black} size={20} />
          </Pressable>
          <Image
            source={artisan.image}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
          <View>
            <Text
              style={[generalStyles.poppins500_fs14, { color: colors.black }]}
            >
              {artisan.name}
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.acentGrey400 },
              ]}
            >
              Active
            </Text>
          </View>
        </View>
        <Pressable>
          <IonIcons
            name="ellipsis-vertical"
            size={20}
            color={colors.primaryRed400}
          />
        </Pressable>
      </View>
      {dataLoading && (
        <View style={[generalStyles.flex1, generalStyles.allCenter]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={scrollRef}
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }: any) => (
                <RenderChat item={item} messageBefore={chats[index - 1]} />
              )}
              style={{ paddingHorizontal: 25 }}
              contentContainerStyle={{ gap: 10 }}
              onLayout={() =>
                setTimeout(() => {
                  scrollRef.current.scrollToEnd({ animated: false });
                }, 100)
              }
            />
          </View>
          <View style={styles.textInputCont}>
            <Pressable onPress={pickImage}>
              <IonIcons name="camera" size={25} color={colors.acentGrey600} />
            </Pressable>
            <TextInput
              placeholder="Enter Message"
              style={[generalStyles.poppins400_fs14, styles.textInput]}
              placeholderTextColor={colors.acentGrey500}
              multiline
              defaultValue={input}
              onChangeText={setInput}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={input == "" ? null : sendMessage}
              style={styles.sendBtn}
            >
              <IonIcons name="send-outline" color={"#fff"} size={18} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headers: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatBox: {
    minHeight: 20,
    minWidth: 100,
    maxWidth: width * 0.6,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
  },
  timeString: { color: colors.acentGrey500, marginTop: 3, fontSize: 10 },
  textInput: {
    minHeight: 40,
    maxHeight: 150,
    flex: 1,
    backgroundColor: colors.acentGrey200,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    color: colors.black,
  },
  textInputCont: {
    height: "auto",
    width: width,
    padding: 15,
    backgroundColor: colors.whiteBg,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  sendBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryRed400,
  },
  imageMsgCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
