import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, generalStyles } from "../utils";
import IonIcons from "@expo/vector-icons/Ionicons";

type Props = {
  data: any;
  setData: any;
  timeTitle: any; // this is the key name of the time value - very important
};

export const PaymentTimeFilter = ({ data, setData, timeTitle }: Props) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState([
    { id: "1", option: "This Month", selected: false },
    { id: "2", option: "Last Month", selected: false },
    { id: "3", option: "This Week", selected: false },
    { id: "4", option: "This Year", selected: false },
    // { id: "5", option: "Custom", selected: false },
  ]);
  const [filterVal, setFilterVal] = useState(filters[0].option);

  function openFilter() {
    if (filterOpen) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  }

  // function for option press
  function filterPress(item) {
    setFilterVal((prev) => {
      return item.option;
    });
    setFilters(
      filters.map((obj) => {
        return { ...obj, selected: obj.id == item.id ? true : false };
      })
    );
  }

  // filter function
  const filterPress2 = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    switch (filterVal) {
      case "This Month":
        setData(
          data.filter((data1) => data1[timeTitle] >= startOfMonth.getTime())
        );
        break;
      case "Last Month":
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        setData(
          data.filter(
            (data1) =>
              data1[timeTitle] >= lastMonthStart.getTime() &&
              data1[timeTitle] <= lastMonthEnd.getTime()
          )
        );
        break;
      case "This Week":
        setData(
          data.filter((data1) => data1[timeTitle] >= startOfWeek.getTime())
        );
        break;
      case "This Year":
        setData(
          data.filter((data1) => data1[timeTitle] >= startOfYear.getTime())
        );
        break;
      // case custom should display a date range picker. very soon
      default:
        setData(data);
    }

    setFilterOpen(false);
  };

  useEffect(() => {
    filterPress2();
  }, [filterVal]);

  useEffect(() => {
    filterPress(filters[0]);
  }, []);
  return (
    <View style={styles.filterCont}>
      <View style={styles.filterCont2}>
        <Pressable onPress={openFilter} style={styles.filterPress}>
          <IonIcons
            name="calendar-outline"
            size={14}
            color={colors.primaryRed400}
          />
          <Text
            style={[
              generalStyles.poppins500_fs12,
              { color: colors.primaryRed400, lineHeight: 17 },
            ]}
          >
            {filterVal}
          </Text>
          <IonIcons
            name="chevron-down"
            size={17}
            color={colors.primaryRed400}
          />
        </Pressable>
        <View
          style={[
            styles.filterListCont,
            { display: filterOpen ? "flex" : "none" },
          ]}
        >
          {filters.map((item, index) => (
            <Pressable
              onPress={() => filterPress(item)}
              key={item.id}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  backgroundColor:
                    pressed || item.selected
                      ? colors.acentGrey200
                      : "transparent",
                },
              ]}
            >
              <Text
                style={[generalStyles.poppins400_fs12, { color: colors.black }]}
              >
                {item.option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterCont: {
    alignItems: "flex-end",
    height: 40,
    zIndex: 5,
  },
  filterCont2: {
    width: 150,
    position: "absolute",
    right: 0,
    overflow: "hidden",
  },
  filterPress: {
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.primaryRed400,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    justifyContent: "center",
    zIndex: 4,
    backgroundColor: "#fff",
  },
  filterListCont: {
    paddingVertical: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    top: -3,
    borderWidth: 0.8,
    borderColor: colors.acentGrey200,
    gap: 10,
  },
});
