import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useContext, useState } from "react";
import { SheetLayout } from "../components/layouts/SheetLayout";
import { bsStyles } from "../components/bottomSheets/BSStyles";
import { BSHeaders } from "../components/bottomSheets/BSHeaders";
import { SearchInput } from "../components/bottomSheets/SearchInput";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Btn100 } from "../components/Btn100";
import { Cities, Regions } from "../utils/locationData";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";

export const ArtisanCitySheet = forwardRef(
  ({ onClose, onOpen, setFiltered, setRegion, region }: any, ref) => {
    const [inputTxt, setInputTxt] = useState("");

    const { regionInput } = useContext(AppContext);
    const data = Cities.filter((item) => item.reg == regionInput?.abv);
    const cityData = data.length == 0 ? Cities : data;

    const insets = useSafeAreaInsets();

    const filterData = cityData.filter((obj) =>
      obj.city.toLowerCase().includes(inputTxt.toLowerCase())
    );

    return (
      <SheetLayout snapPoints={["50%", "80%"]} ref={ref}>
        <View style={bsStyles.innerCont}>
          <BSHeaders
            headerText="City"
            onPress={() => {
              setFiltered(false);
              setRegion("");
              setInputTxt("");
              // setRegionInput(null);
              // ArtisanRegionRef.current.close();
              onClose();
            }}
          />
          <View
            style={{
              marginTop: 15,
              paddingBottom: 15,
            }}
          >
            <SearchInput
              placeholder={"Enter City"}
              onChangeText={setInputTxt}
              defaultValue={region}
            />
          </View>
          <View style={{ flex: 1 }}>
            <BottomSheetFlatList
              keyboardShouldPersistTaps="always"
              data={inputTxt == "" ? cityData : filterData}
              keyExtractor={(item) => item.city}
              contentContainerStyle={{ paddingTop: 5 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setFiltered(true);

                    setRegion(item.region);
                    setInputTxt("");
                    //   setRegionInput(item);
                    //   ArtisanRegionRef.current.close();
                    onClose();
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
          <View
            style={{
              paddingTop: 15,
              marginBottom: insets.bottom + 10,
            }}
          >
            <Btn100
              text="Proceed"
              bg={colors.primaryRed400}
              pressFunc={() => {
                setFiltered(true);
                setRegion(inputTxt);
                setInputTxt("");
                //   ArtisanRegionRef.current.close();
                onClose();
              }}
            />
          </View>
        </View>
      </SheetLayout>
    );
  }
);

const styles = StyleSheet.create({});
