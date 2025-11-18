import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors, generalStyles } from "../../utils";
import { BSHeaders } from "./BSHeaders";
import { SearchInput } from "./SearchInput";
import { Btn100 } from "../Btn100";
import { AppContext } from "../../context/AppContext";
import RBSheet from "react-native-raw-bottom-sheet";
import { Cities, Regions } from "../../utils/locationData";
import { bsStyles } from "./BSStyles";

export const CityBottomSheet = ({
  onClose,
  onOpen,
  setFiltered,
  setCity,
  city,
}) => {
  const { height } = useWindowDimensions();
  const { ArtisanCityRef, regionInput } = useContext(AppContext);
  // the city data is filtered cities that have the same region as the selected region data
  // if regions don't match, all cities are shown
  const data = Cities.filter((item) => item.reg == regionInput?.abv);
  const cityData = data.length == 0 ? Cities : data;
  const [inputTxt, setInputTxt] = useState("");

  const filterData = cityData.filter((obj) =>
    obj.city.toLowerCase().includes(inputTxt.toLowerCase())
  );
  return (
    <RBSheet
      ref={ArtisanCityRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height * 0.6}
      onOpen={onOpen}
      onClose={onClose}
      animationType="slide"
      customStyles={{
        wrapper: bsStyles.wrapper,
        draggableIcon: bsStyles.icon,
        container: bsStyles.container,
      }}
    >
      <View style={[bsStyles.innerCont]}>
        <BSHeaders
          headerText="City"
          onPress={() => {
            setFiltered(false);
            setInputTxt("");
            setCity("");
            ArtisanCityRef.current.close();
          }}
        />
        <View style={{ marginTop: 15, paddingBottom: 15 }}>
          <SearchInput
            placeholder={"Enter City"}
            onChangeText={setInputTxt}
            defaultValue={city}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={inputTxt == "" ? cityData : filterData}
            keyExtractor={(item) => item.city}
            contentContainerStyle={{ paddingTop: 5 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setFiltered(true);
                  setCity(item.city);
                  setInputTxt("");
                  ArtisanCityRef.current.close();
                }}
                style={({ pressed }) => [
                  bsStyles.pressed,
                  {
                    backgroundColor: pressed
                      ? "rgba(0,0,0,0.05)"
                      : "transparent",
                  },
                ]}
              >
                <Text style={bsStyles.list}>{item.city}</Text>
              </Pressable>
            )}
          />
        </View>
        <View style={{ paddingTop: 15 }}></View>
        <Btn100
          text="Proceed"
          bg={colors.primaryRed400}
          pressFunc={() => {
            setFiltered(true);
            setCity(inputTxt);
            setInputTxt("");
            ArtisanCityRef.current.close();
          }}
        />
      </View>
    </RBSheet>
  );
};
