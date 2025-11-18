import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useContext, useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { colors, generalStyles } from "../../utils";
import { AppContext } from "../../context/AppContext";
import { BSHeaders } from "./BSHeaders";
import { SearchInput } from "./SearchInput";
import { Btn100 } from "../Btn100";
import { bsStyles } from "./BSStyles";

export const FeesBottomSheet = ({
  onOpen,
  onClose,
  setMinFee,
  setMaxFee,
  setFeeFiltered,
  minFee,
  maxFee,
}) => {
  const { height } = useWindowDimensions();
  const { ArtisanFeesRef } = useContext(AppContext);
  return (
    <RBSheet
      ref={ArtisanFeesRef}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height * 0.5}
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
          headerText="Price"
          onPress={() => {
            setFeeFiltered(false);
            ArtisanFeesRef.current.close();
          }}
        />
        <View style={{ flexDirection: "row", gap: 10, marginTop: 15 }}>
          <View style={{ flex: 1 }}>
            <SearchInput
              placeholder={"Enter Minimum Fee"}
              keyboardType="number-pad"
              onChangeText={setMinFee}
              defaultValue={minFee}
            />
          </View>
          <View style={{ flex: 1 }}>
            <SearchInput
              placeholder={"Enter Maximum Fee"}
              keyboardType="number-pad"
              onChangeText={setMaxFee}
              defaultValue={maxFee}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <Btn100
          text="Proceed"
          bg={colors.primaryRed400}
          pressFunc={() => {
            setFeeFiltered(true);
            ArtisanFeesRef.current.close();
          }}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({});
