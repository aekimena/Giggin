import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { colors } from "../../../utils";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";

type Props = {
  uri: string;
  title: string;
};

export const SupportWebview = () => {
  const route = useRoute<RouteProp<any>>();
  const passedData = route.params.data;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.acentGrey50,
      }}
    >
      <View
        style={{
          marginTop: Constants.statusBarHeight - 10,
          paddingHorizontal: 15,
        }}
      >
        <BackIconTitle title={passedData.title} />
      </View>
      <WebView style={styles.container} source={{ uri: passedData.uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
