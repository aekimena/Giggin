import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../constants/styles";
import { colors } from "../../constants/colors";
import IonIcons from "@expo/vector-icons/Ionicons";

interface RenderProps {
  item: ClientMessagesProps;
}

export const RenderMessages = ({ item }: RenderProps) => {
  const navigation = useNavigation();
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
          <Text style={[globalStyles.poppins500_fs16, { color: colors.black }]}>
            {item.artisan.name}
          </Text>
          {latestMsg.type == "text" && (
            <Text
              style={[
                globalStyles.poppins400_fs14,
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
          style={[globalStyles.poppins400_fs12, { color: colors.acentGrey400 }]}
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

const styles = StyleSheet.create({
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
});
