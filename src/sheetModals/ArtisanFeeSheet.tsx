import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef } from "react";
import { SheetLayout } from "../components/layouts/SheetLayout";
import { bsStyles } from "../components/bottomSheets/BSStyles";
import { BSHeaders } from "../components/bottomSheets/BSHeaders";
import { SearchInput } from "../components/bottomSheets/SearchInput";
import { Btn100 } from "../components/Btn100";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Vspacer } from "../components/Vspacer";

export const ArtisanFeeSheet = forwardRef(
  (
    {
      onOpen,
      onClose,
      setMinFee,
      setMaxFee,
      setFeeFiltered,
      minFee,
      maxFee,
    }: any,
    ref
  ) => {
    const insets = useSafeAreaInsets();
    return (
      <SheetLayout ref={ref} snapPoints={["50%", "80%"]}>
        <View style={{ flex: 1 }}>
          <View style={{ ...bsStyles.innerCont, backgroundColor: undefined }}>
            <BSHeaders
              headerText="Price"
              onPress={() => {
                setFeeFiltered(false);
                onClose();
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
            {/* <View style={{ flex: 1 }}></View> */}
            {/* <View style={{ marginBottom: insets.bottom + 10 }}> */}
            <Vspacer />
            <Btn100
              text="Proceed"
              bg={colors.primaryRed400}
              pressFunc={() => {
                // setFeeFiltered(true);
                // ArtisanFeesRef.current.close();
                onClose();
              }}
            />
            {/* </View> */}
          </View>
        </View>
      </SheetLayout>
    );
  }
);

const styles = StyleSheet.create({});
