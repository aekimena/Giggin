import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { colors, generalStyles } from "../../../utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RenderArtisanServices } from "./RenderArtisanServices";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";
import { ArtisanOverviewBox } from "../../../components/artisanProfile/OverviewBox";

export const SeeArtisanServices = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const passedData: ArtisansDataObjProps = route.params.data;

  return (
    <ScreenLayout>
      <Vspacer />
      <View style={styles.headers}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 20 }}
        >
          <IonIcons name="chevron-back" color={colors.black} size={20} />
        </Pressable>

        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Artisan Profile
        </Text>
      </View>

      <FlatList
        data={passedData.completedServices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <RenderArtisanServices {...item} />}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 50,
          gap: 15,
          paddingHorizontal: 15,
        }}
        ListHeaderComponent={
          <ArtisanOverviewBox data={passedData} showAvailability={false} />
        }
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  seperator: {
    backgroundColor: colors.acentGrey200,
    height: 2,
    width: "100%",
    marginVertical: 15,
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 15,
  },
  section: {
    width: "100%",
    backgroundColor: colors.whiteBg,
    borderColor: colors.acentGrey200,
    borderWidth: 0.8,
    height: "auto",
    borderRadius: 10,
    padding: 15,
  },
});
