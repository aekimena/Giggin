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
import Bookings from "../../clientScreens/bottom Tabs/bookings";
import { Messaging } from "../../clientScreens/bottom Tabs/Messaging";
import AccountScreens from "../../clientScreens/bottom Tabs/account";
import HomeScreens from "../../clientScreens/bottom Tabs/HomeTab";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabBar({ state, descriptors, navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.tabsCont,
        { width: width, paddingBottom: 15 + insets.bottom },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;
        let iconColor = isFocused ? colors.primaryRed400 : colors.black;
        let iconName;
        let tabLabel;

        switch (label) {
          case "HomeScreens":
            iconName = "home";

            tabLabel = "Home";
            break;
          case "Bookings":
            iconName = "reader";

            tabLabel = "Bookings";
            break;
          case "Messaging":
            iconName = "chatbubble-ellipses";

            tabLabel = "Messaging";
            break;
          case "Account":
            iconName = "person";

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
            navigation.navigate(route.name, route.params);
          }
        };
        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.tabs}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
          >
            <IonIcons name={iconName} color={iconColor} size={17} />
            <Text
              style={[
                generalStyles.poppins400_fs12,
                { color: iconColor, fontSize: 10 },
              ]}
            >
              {tabLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
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
      <Tab.Screen component={HomeScreens} name="HomeScreens" />
      <Tab.Screen component={Bookings} name="Bookings" />
      <Tab.Screen component={Messaging} name="Messaging" />
      <Tab.Screen component={AccountScreens} name="Account" />
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
    paddingHorizontal: 20,
    gap: 25,
  },
  tabs: {
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
});
