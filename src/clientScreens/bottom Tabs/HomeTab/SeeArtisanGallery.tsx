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

const RenderImage = () => <View></View>;

export const SeeArtisanGallery = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisansDataObjProps = route.params.artisanData;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <View style={{ marginTop: 20, paddingBottom: 15 }}>
        <BackIconTitle title={"Gallery"} />
      </View>
      <FlatList
        numColumns={2}
        data={passedData.gallery}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("PhotoInView", {
                artisanData: passedData,
                index,
              })
            }
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
        contentContainerStyle={{ gap: 15 }}
        style={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 15,
  },
});
