import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, generalStyles } from "../utils";

const ModalListView = ({ visible, children, setVisible }) => {
  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={[
          generalStyles.flex1,
          generalStyles.allCenter,
          { backgroundColor: "rgba(0,0,0,0.2)", paddingHorizontal: 30 },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
};

export default ModalListView;

const styles = StyleSheet.create({});
