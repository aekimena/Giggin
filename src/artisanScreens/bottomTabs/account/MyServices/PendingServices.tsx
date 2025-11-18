import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../../../utils";
import { AppContext } from "../../../../context/AppContext";
import { RenderItemComp } from "./RenderItemComp";

interface Props {
  services: Array<ArtisanServicesProps>;
}

export const PendingServices = () => {
  const { services }: Props = useContext(AppContext);
  const data = services.filter((item) => item.status == "pending");

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <RenderItemComp {...item} status="pending" />}
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
