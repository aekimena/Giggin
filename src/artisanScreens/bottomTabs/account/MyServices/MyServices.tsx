import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { OverviewPagesHeader } from "../../../../components/OverviewPagesHeader";
import { colors, generalStyles } from "../../../../utils";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PendingServices } from "./PendingServices";
import { ApprovedServices } from "./ApprovedServices";
import { RejectedServices } from "./RejectedServices";
import IonIcons from "@expo/vector-icons/Ionicons";
import { artisanServices } from "../../../../utils/dummyData";
import { AppContext } from "../../../../context/AppContext";

export const MyServices = () => {
  const Tab = createMaterialTopTabNavigator();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const { services, setServices } = useContext(AppContext);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // get artisan services here; pending, approved, rejected should be together.
    setServices(artisanServices);

    setTimeout(() => {
      setDataLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (filterVal == "") {
      setServices(artisanServices);
    } else {
      setServices(
        artisanServices.filter(
          (item) => item.category.toLowerCase() == filterVal.toLowerCase()
        )
      );
    }
  }, [filterVal]);

  const [filters, setFilters] = useState([
    { id: "1", option: "Carpentry", selected: false },
    { id: "2", option: "AC Repairs", selected: false },
    { id: "3", option: "Mechanic", selected: false },
    { id: "4", option: "Upholstery", selected: false },
    { id: "5", option: "Electrician", selected: false },
  ]);

  function openFilter() {
    if (filterOpen) {
      setFilterOpen(false);
    } else {
      setFilterOpen(true);
    }
  }

  function filterPress(item) {
    if (filterVal == item.option) {
      setFilterVal("");
      setFilters(
        filters.map((obj) => {
          return { ...obj, selected: obj.id == item.id && false };
        })
      );
    } else {
      setFilterVal(item.option);
      setFilters(
        filters.map((obj) => {
          return { ...obj, selected: obj.id == item.id && true };
        })
      );
    }

    setFilterOpen(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <OverviewPagesHeader title={"My Services"} hideRightComp />
      </View>
      {dataLoading && (
        <View style={[generalStyles.allCenter, { flex: 1 }]}>
          <ActivityIndicator size={"large"} color={colors.primaryRed400} />
        </View>
      )}
      {!dataLoading && (
        <>
          <View style={styles.filterCont}>
            <View style={styles.filterCont2}>
              <Pressable onPress={openFilter} style={styles.filterPress}>
                <Text
                  style={[
                    generalStyles.poppins400_fs12,
                    { color: colors.black, lineHeight: 18 },
                  ]}
                >
                  {filterVal == "" ? "All Categories" : filterVal}
                </Text>
                <IonIcons
                  name="caret-down"
                  size={20}
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
                      style={[
                        generalStyles.poppins400_fs12,
                        { color: colors.black },
                      ]}
                    >
                      {item.option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: styles.tabBarLabel,
              tabBarStyle: styles.tabBar,
              tabBarIndicatorStyle: { backgroundColor: colors.primaryRed400 },
              tabBarPressColor: "rgba(0,0,0,0.07)",
            }}
          >
            <Tab.Screen
              name="PendingServices"
              component={PendingServices}
              options={{ title: "Pending" }}
            />
            <Tab.Screen
              name="ApprovedServices"
              component={ApprovedServices}
              options={{ title: "Approved" }}
            />
            <Tab.Screen
              name="RejectedServices"
              component={RejectedServices}
              options={{ title: "Rejected" }}
            />
          </Tab.Navigator>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.acentGrey50,
  },
  tabBarLabel: {
    fontSize: 16,
    fontFamily: "Poppins500",
    color: colors.black,
    textTransform: "none",
  },
  tabBar: {
    backgroundColor: "transparent",
    elevation: 0,
    borderBottomWidth: 2,
    borderColor: colors.acentGrey300,
  },
  filterCont: {
    alignItems: "flex-end",
    height: 50,
    zIndex: 5,
  },
  filterCont2: {
    width: 150,
    position: "absolute",
    right: 25,
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
