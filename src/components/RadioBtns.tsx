import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../utils";

interface CollectionObj {
  name: string;
  value: string;
}

interface RadioBtnProps {
  defaultValue?: string;
  collection: Array<CollectionObj>;
  onSelect: (value: string) => void;
}

const RadioBtns: React.FC<RadioBtnProps> = ({
  collection,
  defaultValue,
  onSelect,
}) => {
  const [selected, setSelected] = useState<CollectionObj>(null);

  function handlePress(item: CollectionObj) {
    setSelected(item);
    onSelect(item.value);
  }
  return (
    <View
      style={[
        styles.allCenter,
        styles.flexRow,
        {
          gap: 20,
        },
      ]}
    >
      {collection.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(item)}
          style={[styles.flexRow, { alignItems: "center", gap: 3 }]}
          key={index}
        >
          <View style={[styles.allCenter, styles.radioBtnOuter]}>
            {(selected?.value || defaultValue) == item.value && (
              <View style={styles.radioBtnInner}></View>
            )}
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioBtns;

const styles = StyleSheet.create({
  allCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  radioBtnOuter: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    borderColor: "#888",
    borderWidth: 1,
  },
  radioBtnInner: {
    backgroundColor: colors.primaryRed400,
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  name: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "Poppins400",
    lineHeight: 19,
  },
});
