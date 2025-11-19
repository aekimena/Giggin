import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../utils";
import { Btn100 } from "../../../components/Btn100";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ButtonContainer } from "../../../components/ButtonContainer";

export const HelpCenter = () => {
  const navigation = useNavigation<any>();

  const [data, setData] = useState([
    {
      id: "1",
      title: "Lorem Ipsum",
      body: "At Quick Artisan everything we expect at a days’ start is you,better and happier than yesterday. We have got you covered.",
      expanded: false,
    },
    {
      id: "2",
      title: "Lorem Ipsum",
      body: "At Quick Artisan everything we expect at a days’ start is you,better and happier than yesterday. We have got you covered.",
      expanded: false,
    },
    {
      id: "3",
      title: "Lorem Ipsum",
      body: "At Quick Artisan everything we expect at a days’ start is you,better and happier than yesterday. We have got you covered.",
      expanded: false,
    },
  ]);

  function expandBox(id) {
    setData((prev) =>
      prev.map((item) => {
        return {
          ...item,
          expanded: item.id == id ? !item.expanded : item.expanded,
        };
      })
    );
  }
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 25,
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <OverviewPagesHeader title="Help Center" hideRightComp />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 20, gap: 10 }}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              We’re here to help you with anything and everything on Quick
              Artisan
            </Text>
            <Text
              style={[generalStyles.poppins400_fs16, { color: colors.black }]}
            >
              At Quick Artisan everything we expect at a days’ start is you,
              better and happier than yesterday. We have got you covered. Share
              your concern or check our frequently asked questions listed below.
            </Text>
          </View>
          <View style={{ marginTop: 20, gap: 15 }}>
            <Text
              style={[generalStyles.poppins500_fs16, { color: colors.black }]}
            >
              FAQ
            </Text>
            {data.map((item, index) => (
              <View style={styles.box} key={item.id}>
                <View style={[generalStyles.flexRowBtw]}>
                  <Text
                    style={[
                      generalStyles.poppins500_fs14,
                      { color: colors.black },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.addIconCont,
                      {
                        backgroundColor: pressed
                          ? "rgba(0,0,0,0.03)"
                          : "transparent",
                      },
                    ]}
                    onPress={() => {
                      expandBox(item.id);
                    }}
                  >
                    <IonIcons
                      name={item.expanded ? "close" : "add"}
                      color={colors.acentGrey800}
                      size={20}
                    />
                  </Pressable>
                </View>
                <View style={{ height: item.expanded ? 80 : 0 }}>
                  <Text
                    style={[
                      generalStyles.poppins400_fs14,
                      { color: colors.black },
                    ]}
                  >
                    {item.body}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <ButtonContainer>
        <View style={styles.btnCont}>
          <Text
            style={[
              generalStyles.poppins400_fs14,
              { color: colors.black, textAlign: "center" },
            ]}
          >
            Still stuck? Help is a mail away
          </Text>
          <Btn100
            text="Send a message"
            bg={colors.primaryRed400}
            pressFunc={() => navigation.navigate("HelpCenter2")}
            rounded
          />
        </View>
      </ButtonContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
    gap: 7,
  },
  box: {
    padding: 15,
    backgroundColor: colors.primaryRed50,
    borderRadius: 10,
    gap: 10,
    justifyContent: "center",
  },
  addIconCont: {
    height: 30,
    width: 30,
    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",
  },
});
