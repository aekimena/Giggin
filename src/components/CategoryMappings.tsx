import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

interface CategoryObj {
  id: string;
  profession: string;
}

interface Props {
  data: Array<CategoryObj>;
}

const RenderList = ({ item }) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={[styles.categoryBox2]}
      key={item.id}
      onPress={() => navigation.navigate("SeeArtisanCategory", { item })}
    >
      <View style={[generalStyles.allCenter, styles.wrenchCont]}>
        <FontAwesome name="wrench" color={"#fff"} size={15} />
      </View>
      <View>
        <Text
          style={[
            generalStyles.poppins400_fs14,
            { color: colors.black, lineHeight: 20 },
          ]}
        >
          {item.profession}
        </Text>
        <Text
          style={[
            generalStyles.poppins400_fs12,
            { color: colors.acentGrey400 },
          ]}
        >
          {item.profession}
        </Text>
      </View>
    </Pressable>
  );
};

export const CategoryMappingsFlatList = ({ data }: Props) => {
  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={3}
      renderItem={(item) => <RenderList {...item} />}
      contentContainerStyle={{
        gap: 15,
        paddingVertical: 15,
        paddingLeft: 7.5,
      }}
    />
  );
};

export const CategoryMappings = ({ data }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.mapContainer1}>
      {data.map((item) => (
        <Pressable
          style={styles.categoryBox1}
          key={item.id}
          onPress={() => navigation.navigate("SeeArtisanCategory", { item })}
        >
          <View style={[generalStyles.allCenter, styles.wrenchCont]}>
            <FontAwesome name="wrench" color={"#fff"} size={15} />
          </View>
          <View>
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.black, lineHeight: 20 },
              ]}
            >
              {item.profession}
            </Text>
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: colors.acentGrey400 },
              ]}
            >
              {item.profession}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer1: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "space-between",
  },
  categoryBox1: {
    width: (width - 40) / 3 - 10,
    height: 110,
    backgroundColor: colors.whiteBg,
    borderRadius: 10,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    justifyContent: "space-between",
    padding: 7,
  },
  categoryBox2: {
    // flex: 1,
    width: (width - 40) / 3 - 10,
    height: 110,
    backgroundColor: colors.whiteBg,
    borderRadius: 10,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    justifyContent: "space-between",
    padding: 7,
    marginHorizontal: 7.5,
  },
  wrenchCont: {
    marginTop: 2,
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: colors.primaryRed400,
    alignSelf: "flex-end",
  },
});
