import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { grid, plus, user } from "../../images/iconsSVG";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = focused ? grid("#ffffff") : grid("#212121");
          } else if (route.name === "Create Posts") {
            iconName = focused ? plus("#ffffff") : plus("#212121");
          } else if (route.name === "Profile") {
            iconName = focused ? user("#ffffff") : user("#212121");
          }
          return (
            <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
              {iconName}
            </TouchableOpacity>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 70,
        },
        tabBarItemStyle: {
          width: 70,
          height: 40,
          borderRadius: 20,
        },
      })}
    >
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen name="Create Posts" component={CreatePostsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

export default Home;
