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
import { ScreenLayout } from "../../components/layouts/ScreenLayout";
import { LeftIconTitleHeader } from "../../components/headers/LeftIconTitleHeader";
import { RenderMessages } from "../../components/messages/RenderMessages";

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

  return (
    <ScreenLayout>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <LeftIconTitleHeader title={"Messages"} />
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
                    {
                      color: colors.acentGrey300,
                      fontSize: 30,
                      lineHeight: 48,
                    },
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
      </View>
    </ScreenLayout>
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
