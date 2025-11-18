import { StyleSheet } from "react-native";

export const colors = {
  whiteBg: "#fff",
  modalBgColor: "rgba(0,0,0,0.3)",
  secondaryBlue200: "#283163",
  secondaryBlue100: "#343F7D",
  secondaryBlue300: "#0C1231",
  secondaryBlue400: "#161F4E",
  acentGrey600: "#4E545F",
  primaryRed400: "#D03531",
  primaryRed50: "rgba(255, 195, 192, 0.1)",
  primaryRed200: "rgba(208, 53, 49, 0.3)",
  primaryRed300: "rgba(240, 101, 95, 1)",
  primaryRed100: "rgba(208, 53, 49, 0.08)",
  black: "#222",
  acentGrey400: "#9DA3AF",
  acentGrey200: "#E6E7EA",
  acentGrey300: "#D2D5DA",
  acentGrey500: "#6A7181",
  acentGrey800: "#272A30",
  acentGrey50: "rgba(249, 250, 250, 1)",
  forestGreen100: "rgba(13, 164, 0, 0.14)",
  forestGreen600: "rgba(13, 164, 0, 1)",
};

export const generalStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
  allCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowBtw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  poppins400_fs20: {
    fontFamily: "Poppins400",
    fontSize: 20,
  },
  poppins400_fs16: {
    fontFamily: "Poppins400",
    fontSize: 16,
  },
  poppins400_fs12: {
    fontFamily: "Poppins400",
    fontSize: 12,
    lineHeight: 20,
  },
  poppins400_fs14: {
    fontFamily: "Poppins400",
    fontSize: 14,
    lineHeight: 20,
  },
  poppins500_fs20: {
    fontFamily: "Poppins500",
    fontSize: 20,
  },
  poppins500_fs22: {
    fontFamily: "Poppins500",
    fontSize: 22,
  },
  poppins500_fs16: {
    fontFamily: "Poppins500",
    fontSize: 16,
    lineHeight: 20,
  },
  poppins500_fs14: {
    fontFamily: "Poppins500",
    fontSize: 14,
    lineHeight: 20,
  },
  poppins500_fs12: {
    fontFamily: "Poppins500",
    fontSize: 12,
    lineHeight: 20,
  },
  poppins600_fs22: {
    fontFamily: "Poppins600",
    fontSize: 22,
  },
  poppins600_fs14: {
    fontFamily: "Poppins600",
    fontSize: 14,
  },
  poppins600_fs16: {
    fontFamily: "Poppins600",
    fontSize: 16,
  },
  poppins700_fs20: {
    fontFamily: "Poppins700",
    fontSize: 20,
  },
  poppins700_fs16: {
    fontFamily: "Poppins700",
    fontSize: 16,
  },
  poppins700_fs14: {
    fontFamily: "Poppins700",
    fontSize: 14,
  },
  poppins700_fs12: {
    fontFamily: "Poppins700",
    fontSize: 12,
  },
});

export const month_1 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const month_2 = [
  "Jan",
  "Feb",
  "Mar",
  "Api",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// "build": {
//   "development": {
//     "developmentClient": true,
//     "distribution": "internal"
//   },
//   "preview": {
//     "distribution": "internal"
//   },
//   "production": {}
// },
// "submit": {
//   "production": {}
// }
