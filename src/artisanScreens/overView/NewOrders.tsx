import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles, month_1 } from "../../utils";
import { BackBtn } from "../../components/auth/BackBtn";
import { OverviewPagesHeader } from "../../components/OverviewPagesHeader";
import { ArtisanNewOrders } from "../../utils/dummyData";
import { useNavigation } from "@react-navigation/native";

interface RenderProps {
  item: ArtisanNewOrdersProp;
}

const RenderItems = ({ item }: RenderProps) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      style={[styles.itemCont]}
      onPress={() => navigation.navigate("OrderDetails", { data: item })}
    >
      <View style={[generalStyles.flexRowCenter, { gap: 10, flex: 1 }]}>
        <Image
          source={item.image}
          style={{ height: 70, width: 90, borderRadius: 10 }}
        />
        <View style={{ flex: 1, gap: 5 }}>
          <Text
            style={[generalStyles.poppins500_fs14, { color: colors.black }]}
          >
            {item.firstName} {item.lastName}
          </Text>
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: "rgba(104, 104, 104, 0.6)" },
            ]}
          >
            {item.date}, {item.time}
          </Text>
          <Text
            style={[
              generalStyles.poppins500_fs14,
              { color: colors.black, maxWidth: 100, lineHeight: 21 },
            ]}
          >
            {item.service}
          </Text>
        </View>
      </View>
      <Text
        style={[
          generalStyles.poppins500_fs12,
          { color: colors.primaryRed400, lineHeight: 18 },
        ]}
      >
        GHC {item.startingPrice} - {item.price}
      </Text>
    </Pressable>
  );
};

export const NewOrders = () => {
  const [data, setData] = useState<Array<ArtisanNewOrdersProp>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setData(ArtisanNewOrders);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.acentGrey50} barStyle="dark-content" />
      <OverviewPagesHeader title="New Orders" />

      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <RenderItems {...item} />}
          contentContainerStyle={{ gap: 15, paddingTop: 20, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 25,
  },
  headers: {
    paddingBottom: 15,
    marginTop: 20,
  },
  itemCont: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryRed50,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
