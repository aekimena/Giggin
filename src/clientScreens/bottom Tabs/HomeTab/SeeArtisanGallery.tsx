import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BackIconTitle } from "../../../components/BackIconTitle";
import { colors } from "../../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";

const RenderImage = () => <View></View>;

export const SeeArtisanGallery = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisansDataObjProps = route.params.artisanData;
  return (
    <ScreenLayout>
      <Vspacer />
      <View style={{ paddingHorizontal: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Gallery"} />
      </View>
      <FlatList
        numColumns={2}
        data={passedData.gallery}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {}}
            key={index}
            style={{
              flex: 1,
              marginLeft: index % 2 == 0 ? 0 : 15,
              height: 187,
            }}
          >
            <Image
              source={item}
              style={{ height: "100%", width: "100%", borderRadius: 10 }}
            />
          </Pressable>
        )}
        contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
        style={{ marginTop: 10 }}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
});
