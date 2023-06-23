import "react-native-gesture-handler";
import "react-native-get-random-values";
import { useSelector, useDispatch } from "react-redux";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";
import { logOutThunk } from "../redux/auth/authOperations";
import { getAccessToken } from "../redux/auth/authSelectors";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import Home from "./dashboard/Home";
import CommentsScreen from "./dashboard/CommentsScreen";
import MapScreen from "./dashboard/MapScreen";
import { arrowLeft, logOut } from "../images/iconsSVG";

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

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

const Main = () => {
  const token = useSelector(getAccessToken);
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      {!token ? (
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
      ) : (
        <MainStack.Navigator
          screenOptions={{
            headerBackImage: () => arrowLeft,
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
          <MainStack.Screen
            name="Home"
            component={Home}
            options={({ route }) => ({
              headerShown: getHeaderTitle(route) === "Profile" ? false : true,
              headerTitle: getHeaderTitle(route),
              headerBackImage: () => {},
              headerBackTitleVisible: false,
              headerRight: () => {
                return (
                  <TouchableOpacity
                    style={{ marginRight: 16 }}
                    onPress={() => dispatch(logOutThunk())}
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
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;
