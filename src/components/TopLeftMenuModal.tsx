import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, generalStyles } from "../utils";

interface OptionObjProp {
  id: string;
  option: string;
  value: string;
}

interface Props {
  optionsArray: Array<OptionObjProp>;
  visible: boolean;
  setVisible: any;
  top?: number;
  left?: number;
  enableSelected?: boolean;
  onSelect?: (value: OptionObjProp) => void;
}

export const TopLeftMenuModal = ({
  optionsArray,
  visible,
  setVisible,
  top,
  left,
  enableSelected,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState(null);
  function PressFunc(item) {
    if (selected == item.value) {
      setSelected(null);
    } else {
      setSelected(item.value);
    }

    onSelect(item);
  }
  const List = ({ item }) => (
    <Pressable
      onPress={() => PressFunc(item)}
      style={({ pressed }) => [
        styles.menuList,
        {
          backgroundColor: enableSelected
            ? selected == item.value
              ? "rgba(0,0,0,0.09)"
              : pressed
              ? "rgba(0,0,0,0.02)"
              : "transparent"
            : pressed
            ? "rgba(0,0,0,0.05)"
            : "transparent",
        },
      ]}
    >
      <Text style={[generalStyles.poppins400_fs14, { color: colors.black }]}>
        {item.option}
      </Text>
    </Pressable>
  );
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <Pressable style={{ flex: 1 }} onPress={() => setVisible(false)}>
        <Pressable
          onPress={null}
          style={[
            styles.menuBox,
            { marginTop: 0 || top, marginLeft: 0 || left },
          ]}
        >
          <View>
            {optionsArray.map((item, index) => (
              <List key={index} item={item} />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  menuBox: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    minWidth: 130,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
  menuList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
});
