import {
  FlatList,
  Pressable,
  ScrollView,
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
import { Regions } from "../../utils/locationData";
import { bsStyles } from "./BSStyles";

export const RegionBottomSheet = ({
  onClose,
  onOpen,
  setFiltered,
  setRegion,
  region,
}) => {
  const { height } = useWindowDimensions();
  const { ArtisanRegionRef, setRegionInput } = useContext(AppContext);
  const [regionData, setRegionData] = useState(Regions);
  const [inputTxt, setInputTxt] = useState("");

  const filterData = regionData.filter((item) =>
    item.region.toLowerCase().includes(inputTxt.toLowerCase())
  );
  return (
    <RBSheet
      ref={ArtisanRegionRef}
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
      <View style={bsStyles.innerCont}>
        <BSHeaders
          headerText="Region"
          onPress={() => {
            setFiltered(false);
            setRegion("");
            setInputTxt("");
            setRegionInput(null);
            ArtisanRegionRef.current.close();
          }}
        />
        <View
          style={{
            marginTop: 15,
            paddingBottom: 15,
          }}
        >
          <SearchInput
            placeholder={"Enter Region"}
            onChangeText={setInputTxt}
            defaultValue={region}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            keyboardShouldPersistTaps="always"
            data={inputTxt == "" ? regionData : filterData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 5 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setFiltered(true);

                  setRegion(item.region);
                  setInputTxt("");
                  setRegionInput(item);
                  ArtisanRegionRef.current.close();
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
                <Text style={bsStyles.list}>{item.region}</Text>
              </Pressable>
            )}
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <Btn100
            text="Proceed"
            bg={colors.primaryRed400}
            pressFunc={() => {
              setFiltered(true);
              setRegion(inputTxt);
              setInputTxt("");
              ArtisanRegionRef.current.close();
            }}
          />
        </View>
      </View>
    </RBSheet>
  );
};
