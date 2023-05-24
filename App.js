import "react-native-gesture-handler";
import "react-native-get-random-values";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";
import { logOut, arrowLeft } from "./images/iconsSVG";

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Posts";
  switch (routeName) {
    case "Posts":
      return "Posts";
    case "Create Posts":
      return "Create Posts";
    case "Profile":
      return "Profile";
    case "Comments":
      return "Comments";
    case "Map":
      return "Map";
    default:
      return "Posts";
  }
};

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Roboto_Bold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    console.log(error);
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Registration"
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto_Medium",
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      >
        <MainStack.Group
          screenOptions={{
            headerBackImage: () => {},
            headerShown: false,
          }}
        >
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen name="Login" component={LoginScreen} />
        </MainStack.Group>

        <MainStack.Group
          screenOptions={{
            headerBackImage: () => arrowLeft,
          }}
        >
          <MainStack.Screen
            name="Home"
            component={Home}
            options={({ navigation, route }) => ({
              headerTitle: getHeaderTitle(route),
              headerBackImage: () => {},
              headerBackTitleVisible: false,
              headerRight: () => {
                return (
                  <TouchableOpacity
                    style={{ marginRight: 16 }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <View>{logOut}</View>
                  </TouchableOpacity>
                );
              },
            })}
          />

          <MainStack.Group
            screenOptions={{
              headerLeftContainerStyle: {
                paddingLeft: 16,
              },
              headerTitleContainerStyle: {
                paddingRight: 16,
              },
            }}
          >
            <MainStack.Screen name="Comments" component={CommentsScreen} />
            <MainStack.Screen name="Map" component={MapScreen} />
          </MainStack.Group>
        </MainStack.Group>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 17,
    lineHeight: 22,
  },
});
