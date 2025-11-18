import { StyleSheet } from "react-native";
import { colors, generalStyles } from "../../utils";

export const bsStyles = StyleSheet.create({
  list: {
    ...generalStyles.poppins400_fs14,
    color: colors.acentGrey500,
  },
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  icon: { backgroundColor: colors.acentGrey400 },
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.acentGrey50,
  },
  pressed: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  innerCont: { backgroundColor: colors.acentGrey50, padding: 15, flex: 1 },
});
