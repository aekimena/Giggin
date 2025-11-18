import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../../../utils";
import { OverviewPagesHeader } from "../../../components/OverviewPagesHeader";
import { artisanGallery } from "../../../utils/dummyData";
import { Btn100 } from "../../../components/Btn100";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ModalView = ({ visible, setVisible, deleteFunc }) => {
  const navigation = useNavigation<any>();
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.modalCont}>
        <View style={styles.modalBox}>
          <View style={{ width: "70%", alignSelf: "center" }}>
            <Text
              style={[
                generalStyles.poppins400_fs16,
                { textAlign: "center", color: colors.black },
              ]}
            >
              Delete this image?
            </Text>
          </View>
          <View
            style={[generalStyles.flexRowCenter, { gap: 20, marginTop: 20 }]}
          >
            <Pressable
              onPress={deleteFunc}
              style={({ pressed }) => [
                styles.yesNoCont,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.forestGreen600 },
                ]}
              >
                Yes
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.yesNoCont,
                {
                  backgroundColor: pressed ? "rgba(0,0,0,0.03)" : "transparent",
                },
              ]}
              onPress={() => setVisible(false)}
            >
              <Text
                style={[
                  generalStyles.poppins400_fs16,
                  { color: colors.primaryRed400 },
                ]}
              >
                No
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const RenderItem = ({ item, index, setVisible }) => {
  return (
    <View style={{ height: 150, width: "100%", flexDirection: "row", gap: 15 }}>
      {index % 2 == 0 && (
        <>
          <View
            style={[
              { height: "100%" },
              item[1] == undefined ? { flex: 1 } : { width: 110 },
            ]}
          >
            <Image source={item[0]} style={[styles.image]} />
            <Pressable style={styles.trash} onPress={() => setVisible(true)}>
              <Ionicons name="trash" size={18} color={colors.primaryRed400} />
            </Pressable>
          </View>

          {item[1] !== undefined && (
            <View style={{ flex: 1 }}>
              <Image source={item[1]} style={[styles.image]} />
              <Pressable style={styles.trash} onPress={() => setVisible(true)}>
                <Ionicons name="trash" size={18} color={colors.primaryRed400} />
              </Pressable>
            </View>
          )}
        </>
      )}

      {index % 2 !== 0 && (
        <>
          <View style={{ flex: 1 }}>
            <Image source={item[0]} style={[styles.image]} />
            <Pressable style={styles.trash} onPress={() => setVisible(true)}>
              <Ionicons name="trash" size={18} color={colors.primaryRed400} />
            </Pressable>
          </View>

          {item[1] !== undefined && (
            <View style={{ width: 110 }}>
              <Image source={item[1]} style={[styles.image]} />
              <Pressable style={styles.trash} onPress={() => setVisible(true)}>
                <Ionicons name="trash" size={18} color={colors.primaryRed400} />
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export const Gallery = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setData(
      // this needs to be done to replicate the design
      artisanGallery.reduce((acc, curr, index, array) => {
        if (index % 2 === 0) {
          acc.push(array.slice(index, index + 2));
        }
        return acc;
      }, [])
    );
    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  function deleteImage() {
    // delete image from database, replace data with the updated one
    setVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <OverviewPagesHeader title="Gallery" hideRightComp />
      {dataLoading && (
        <View style={[generalStyles.allCenter, generalStyles.flex1]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <RenderItem
              item={item}
              index={index}
              key={index}
              setVisible={setVisible}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 15, gap: 15 }}
        />
      )}
      <View style={styles.btnCont}>
        <Btn100
          text="Add Work"
          bg={colors.primaryRed400}
          pressFunc={() => navigation.navigate("AddToGallery")}
          rounded
        />
      </View>
      <ModalView
        visible={visible}
        setVisible={setVisible}
        deleteFunc={deleteImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    borderRadius: 15,
    width: "100%",
  },
  trash: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
    paddingHorizontal: 20,
  },
  btnCont: {
    marginTop: 0,
    borderTopWidth: 0.8,
    borderColor: colors.acentGrey200,
    paddingVertical: 10,
  },
  modalCont: {
    flex: 1,
    backgroundColor: colors.modalBgColor,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  modalBox: {
    backgroundColor: colors.whiteBg,
    padding: 15,
    borderRadius: 10,
  },
  yesNoCont: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
