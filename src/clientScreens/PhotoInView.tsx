import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generalStyles } from "../utils";

export const PhotoInView = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisansDataObjProps = route.params.artisanData;
  const startIndex = route.params.index;
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar backgroundColor={"#000"} barStyle="light-content" />
      <Pressable
        style={{ marginTop: 20, paddingHorizontal: 15 }}
        onPress={() => navigation.goBack()}
      >
        <IonIcons name="arrow-back-outline" color={"#fff"} size={25} />
      </Pressable>
      <View style={[generalStyles.allCenter, generalStyles.flex1]}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={startIndex}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          data={passedData.gallery}
          renderItem={({ item, index }) => (
            <Image
              source={item}
              key={index}
              style={{
                width: width,
                height: width,
                alignSelf: "center",
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
