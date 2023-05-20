import "react-native-gesture-handler";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import { logOut } from "./images/iconsSVG";

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Posts";
  switch (routeName) {
    case "Posts":
      return "Posts";
    case "Create Posts":
      return "Create Posts";
    case "Profile":
      return "Profile";
    default:
      return "Posts";
  }
};

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
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
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

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
                  {logOut}
                </TouchableOpacity>
              );
            },
          })}
        />
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
