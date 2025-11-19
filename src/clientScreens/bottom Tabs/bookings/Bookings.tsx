import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BookingsData } from "../../../utils/dummyData";
import { BookingInfo } from "../../../components/BookingInfo";
import { TopLeftMenuModal } from "../../../components/TopLeftMenuModal";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "../../../components/layouts/ScreenLayout";
import { Vspacer } from "../../../components/Vspacer";

interface Props {
  item: BookingsDataProps;
}

const RenderList = ({ item }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BookingsInView", { passedData: item })
      }
    >
      <BookingInfo
        service={item.service}
        status={item.status}
        address={item.address}
        dateTime={item.dateTime}
        image={item.image}
        clientProduct={item.clientProduct}
        provider={item.provider}
      />
    </Pressable>
  );
};
const { height } = Dimensions.get("window");
export const Bookings = () => {
  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState<Array<BookingsDataProps>>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const filteredData = data.filter(
    (item) => item.status.toLowerCase() == selected
  );

  useEffect(() => {
    setData(BookingsData);
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  function filter(item) {
    if (selected == item.value) {
      setSelected(null);
      setMenuVisible(false);
    } else {
      setSelected(item.value);
      setMenuVisible(false);
    }
  }
  return (
    <ScreenLayout>
      <Vspacer />
      <View style={styles.headers}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcons
            name="chevron-back-outline"
            color={colors.black}
            size={25}
          />
        </Pressable>
        <Text style={[generalStyles.poppins500_fs16, { color: colors.black }]}>
          Bookings
        </Text>
        <Pressable
          style={[generalStyles.allCenter, styles.sliderCont]}
          onPress={() => setMenuVisible(true)}
        >
          <FontAwesome name="sliders" color={colors.black} size={20} />
        </Pressable>
      </View>
      {dataLoading ? (
        <View style={[generalStyles.allCenter, generalStyles.flex1]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      ) : (
        <FlatList
          data={selected == null ? data : filteredData}
          keyExtractor={(item) => item.id}
          renderItem={(item: any) => <RenderList {...item} />}
          contentContainerStyle={{
            gap: 15,
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 50,
          }}
        />
      )}
      <TopLeftMenuModal
        optionsArray={[
          { option: "Pending", id: "987", value: "pending" },
          {
            option: "Completed",
            id: "097",
            value: "confirmed",
          },
          {
            option: "Cancelled",
            id: "000",
            value: "cancelled",
          },
        ]}
        visible={menuVisible}
        setVisible={setMenuVisible}
        top={height * 0.125}
        enableSelected
        onSelect={filter}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  sliderCont: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: colors.whiteBg,
  },
});
