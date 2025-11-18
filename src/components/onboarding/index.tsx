import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Btn100 } from "../Btn100";
import { colors, generalStyles } from "../../utils";

interface OnboardingProps {
  image: any;
  headerTxt: string;
  bodyTxt: string;
  pageNum: number;
  btnTxt: string;
  pressFunc: any;
}

const { width, height } = Dimensions.get("window");
const index = ({
  image,
  headerTxt,
  bodyTxt,
  pageNum,
  btnTxt,
  pressFunc,
}: OnboardingProps) => {
  const Indicators = () => {
    return (
      <View style={[generalStyles.allCenter, { flexDirection: "row", gap: 3 }]}>
        <View style={pageNum == 1 ? styles.activeCircle : styles.circle}></View>
        <View style={pageNum == 2 ? styles.activeCircle : styles.circle}></View>
        <View style={pageNum == 3 ? styles.activeCircle : styles.circle}></View>
      </View>
    );
  };
  return (
    <View>
      <View style={[generalStyles.allCenter, { height: height * 0.6 }]}>
        <Image source={image} style={[styles.image]} />
      </View>
      <View style={{ height: height * 0.5 }}>
        <View style={[styles.infoCont, { flex: 1 }]}>
          <Text style={styles.headerTxt}>{headerTxt}</Text>
          <Text style={styles.bodyTxt}>{bodyTxt}</Text>
          <View>
            <Indicators />
          </View>
        </View>
        <View style={styles.btnCont}>
          <Btn100
            text={btnTxt}
            textCol={"#fff"}
            bg={colors.primaryRed400}
            pressFunc={pressFunc}
            rounded
          />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  image: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: "100%",
    width: width,
  },
  btnCont: {
    height: 120,
    width,
    paddingHorizontal: 15,
    paddingBottom: 35,
    justifyContent: "center",
  },
  circle: {
    height: 7,
    width: 7,
    borderRadius: 7 / 2,
    borderColor: colors.primaryRed400,
    borderWidth: 1,
  },
  activeCircle: {
    height: 7,
    width: 20,
    borderRadius: 50,
    backgroundColor: colors.primaryRed400,
  },
  infoCont: {
    paddingHorizontal: 35,
    paddingTop: 20,
    gap: 15,
  },
  headerTxt: {
    fontSize: 25,
    fontFamily: "Poppins700",
    textAlign: "center",
    color: colors.secondaryBlue200,
  },
  bodyTxt: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins400",
    color: colors.acentGrey600,
  },
});
