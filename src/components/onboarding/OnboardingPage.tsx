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
  pressFunc?: any;
  index: number;
}

const { width, height } = Dimensions.get("window");
export const OnboardingPage = ({
  image,
  headerTxt,
  bodyTxt,
  pageNum,
  btnTxt,
  pressFunc,
  index,
}: OnboardingProps) => {
  const Indicators = () => {
    return (
      <View style={[generalStyles.allCenter, { flexDirection: "row", gap: 3 }]}>
        <View style={index == 0 ? styles.activeCircle : styles.circle}></View>
        <View style={index == 1 ? styles.activeCircle : styles.circle}></View>
        <View style={index == 2 ? styles.activeCircle : styles.circle}></View>
      </View>
    );
  };
  return (
    <View style={{ width: width, flex: 1 }}>
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
        {index === 2 && (
          <View style={styles.btnCont}>
            <Btn100
              text={btnTxt}
              textCol={"#fff"}
              bg={colors.primaryRed400}
              pressFunc={pressFunc}
              rounded
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
