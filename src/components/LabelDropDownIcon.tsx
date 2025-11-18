import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalListView from "./ModalListView";

interface ListObj {
  label: string;
  value: string;
  default?: boolean;
}

interface LabelDropDownIconProps {
  placeholder: string;
  label?: string;
  collection: Array<ListObj>;
  showErrorText?: boolean;
  errorText?: string;
  onSelect: (value: string) => void;
  textStyle?: TextStyle;
  placeHolderStyle?: TextStyle;
}

const LabelDropDownIcon: React.FC<LabelDropDownIconProps> = ({
  placeholder,
  label,
  collection,
  onSelect,
  showErrorText,
  textStyle,
  placeHolderStyle,
  errorText,
}) => {
  const [visible, setVisible] = useState(false);
  const defaultExists = collection.find((obj) => obj.default == true);
  const [selected, setSelected] = useState<ListObj>(defaultExists || null);

  function selectFunction(item: ListObj) {
    setSelected(item);
    onSelect(item.value);
    setVisible(false);
  }
  return (
    <>
      <View>
        <Text style={styles.labelTxt}>{label}</Text>
        <Pressable style={styles.dropDownCont} onPress={() => setVisible(true)}>
          {selected == null ? (
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: "#777" },
                placeHolderStyle,
              ]}
            >
              {placeholder}
            </Text>
          ) : (
            <Text
              style={[
                generalStyles.poppins400_fs14,
                { color: colors.black },
                textStyle,
              ]}
            >
              {selected.label}
            </Text>
          )}
          <Ionicons name="caret-down" color={"#888"} size={19} />
        </Pressable>
        {showErrorText && (
          <Text
            style={[
              generalStyles.poppins400_fs12,
              { color: colors.primaryRed400 },
            ]}
          >
            {errorText}
          </Text>
        )}
      </View>
      <ModalListView visible={visible} setVisible={setVisible}>
        <View style={styles.listCont}>
          <View style={styles.listHeader}>
            <Text style={[generalStyles.poppins400_fs14, { color: "#777" }]}>
              {placeholder}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            {collection.map((item, index) => (
              <Pressable
                onPress={() => selectFunction(item)}
                style={({ pressed }) => [
                  styles.list,
                  {
                    backgroundColor: pressed
                      ? "rgba(0,0,0,0.07)"
                      : "transparent",
                  },
                ]}
                key={index}
              >
                <Text
                  style={[
                    generalStyles.poppins400_fs16,
                    { color: colors.black },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ModalListView>
    </>
  );
};

export default LabelDropDownIcon;

const styles = StyleSheet.create({
  labelTxt: {
    color: colors.black,
    fontFamily: "Poppins400",
    fontSize: 14,
  },
  dropDownCont: {
    height: 50,
    width: "100%",
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  listCont: {
    backgroundColor: colors.whiteBg,
    height: "auto",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: 15,
  },
  listHeader: {
    width: "100%",
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 0.5,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
