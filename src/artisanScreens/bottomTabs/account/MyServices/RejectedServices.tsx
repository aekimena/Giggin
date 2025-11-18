import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../../../utils";
import { AppContext } from "../../../../context/AppContext";
import { RenderItemComp } from "./RenderItemComp";

interface Props {
  services: Array<ArtisanServicesProps>;
}

export const RejectedServices = () => {
  const { services }: Props = useContext(AppContext);
  const data = services.filter((item) => item.status == "rejected");

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <RenderItemComp {...item} status="rejected" />}
        contentContainerStyle={{ gap: 15, paddingBottom: 50, paddingTop: 15 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
});
