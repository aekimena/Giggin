import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useContext, useState } from "react";
import { SheetLayout } from "../components/layouts/SheetLayout";
import { bsStyles } from "../components/bottomSheets/BSStyles";
import { BSHeaders } from "../components/bottomSheets/BSHeaders";
import { SearchInput } from "../components/bottomSheets/SearchInput";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Btn100 } from "../components/Btn100";
import { Regions } from "../utils/locationData";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";

export const ArtisanRegionBottomSheet = forwardRef(
  ({ onClose, onOpen, setFiltered, setRegion, region }: any, ref) => {
    const { ArtisanRegionRef, setRegionInput } = useContext(AppContext);
    const [regionData, setRegionData] = useState(Regions);
    const [inputTxt, setInputTxt] = useState("");

    const insets = useSafeAreaInsets();

    const filterData = regionData.filter((item) =>
      item.region.toLowerCase().includes(inputTxt.toLowerCase())
    );

    return (
      <SheetLayout snapPoints={["50%", "80%"]} ref={ref}>
        <View style={bsStyles.innerCont}>
          <BSHeaders
            headerText="Region"
            onPress={() => {
              setFiltered(false);
              setRegion("");
              setInputTxt("");
              setRegionInput(null);
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
              placeholder={"Enter Region"}
              onChangeText={setInputTxt}
              defaultValue={region}
            />
          </View>
          <View style={{ flex: 1 }}>
            <BottomSheetFlatList
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
