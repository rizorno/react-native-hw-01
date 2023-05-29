import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useEffect } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserThunk, logOutThunk } from "../redux/auth/authOperations";
import { getAccessToken } from "../redux/auth/authSelectors";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import Home from "./dashboard/Home";
import CommentsScreen from "./dashboard/CommentsScreen";
import MapScreen from "./dashboard/MapScreen";
import { logOut, arrowLeft } from "../images/iconsSVG";

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

  useEffect(() => {
    token && dispatch(getCurrentUserThunk());
  }, [dispatch, token]);

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
          initialRouteName="Registration"
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
            options={({ navigation, route }) => ({
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

const styles = StyleSheet.create({
  headerTitleStyle: {
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 17,
    lineHeight: 22,
  },
});
