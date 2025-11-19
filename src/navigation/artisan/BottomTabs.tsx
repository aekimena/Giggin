import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "@expo/vector-icons/Ionicons";
import { colors, generalStyles } from "../../utils";
import { Dashboard } from "../../artisanScreens/bottomTabs/Dashboard";
import BookingScreens from "../../artisanScreens/bottomTabs/bookings";
import AccountScreens from "../../artisanScreens/bottomTabs/account";
import { Messages } from "../../artisanScreens/bottomTabs/Messages";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabBar({ state, descriptors, navigation }) {
  const { width } = useWindowDimensions();
  const [accountFocused, setAccountFocused] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.tabsCont,
        { width: width, paddingBottom: 5 + insets.bottom },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        let tabLabel;
        let iconColor;
        let icon;
        const isFocused = state.index === index;
        iconColor = isFocused ? colors.primaryRed400 : colors.black;

        switch (label) {
          case "Dashboard":
            icon = <IonIcons name={"home"} color={iconColor} size={17} />;
            tabLabel = "Home";

            break;
          case "BookingScreens":
            icon = <IonIcons name={"reader"} color={iconColor} size={17} />;
            tabLabel = "Bookings";

            break;
          case "Messages":
            icon = (
              <IonIcons name={"chatbubbles"} color={iconColor} size={17} />
            );
            tabLabel = "Messages";

            break;
          case "AccountScreens":
            icon = <IonIcons name={"person"} color={iconColor} size={17} />;
            tabLabel = "Account";

            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name == "AccountScreens") {
              setAccountFocused(true);
            } else {
              setAccountFocused(false);
            }
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.tabs,
              label == "BookingScreens" && !accountFocused && styles.spaceRight,
              label == "Messages" && !accountFocused && styles.spaceLeft,
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
          >
            {icon}
            {label !== "AddScreen" && (
              <Text
                style={[
                  generalStyles.poppins400_fs12,
                  { color: iconColor, fontSize: 10 },
                ]}
              >
                {tabLabel}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
      {!accountFocused && (
        <TouchableOpacity
          style={styles.outerCircle}
          onPress={() => navigation.navigate("AddScreen")}
        >
          <View style={styles.innerCircle}>
            <IonIcons name="add" color={"#fff"} size={20} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ...

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen component={Dashboard} name="Dashboard" />
      <Tab.Screen component={BookingScreens} name="BookingScreens" />
      <Tab.Screen component={Messages} name="Messages" />
      <Tab.Screen component={AccountScreens} name="AccountScreens" />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabsCont: {
    flexDirection: "row",
    alignItems: "center",
    // height: 60,
    paddingTop: 15,
    borderTopWidth: 0.5,
    borderColor: colors.acentGrey200,
    backgroundColor: colors.whiteBg,
    paddingHorizontal: 15,
    justifyContent: "center",
    gap: 20,
  },
  tabs: {
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  outerCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryRed400,
    position: "absolute",
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 15,
    // alignSelf: "center",

    alignSelf: "center",
  },
  innerCircle: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 4,
  },
  spaceRight: {
    marginRight: 20,
  },
  spaceLeft: {
    marginLeft: 20,
  },
});
