import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });
  
  if (!fontsLoaded) {
   console.log(error)
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
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

        <MainStack.Screen name="Posts" component={PostsScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
