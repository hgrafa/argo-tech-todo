import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Platform } from "react-native";

import { Inbox } from "@screens/app/Inbox";
import { Search } from "@screens/app/Search";
import { Profile } from "@screens/app/Profile";

import {
  CircleUserRoundIcon,
  InboxIcon,
  SearchIcon,
} from "lucide-react-native";

type AppRoutes = {
  today: undefined;
  inbox: undefined;
  search: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#818cf8",
        tabBarInactiveTintColor: "#737373",
        tabBarStyle: {
          borderBlockColor: "#262626",
          backgroundColor: "#262626",
          height: Platform.OS === "android" ? "auto" : 80,
        },
      }}
    >
      <Screen
        name="inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({ color }) => <InboxIcon size={24} color={color} />,
        }}
      />
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon size={24} color={color} />,
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <CircleUserRoundIcon size={24} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
