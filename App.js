import "react-native-gesture-handler";
import "react-native-get-random-values";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { store, persistor } from "./redux/store";
import Main from "./Screens/Main";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    // eslint-disable-next-line no-undef
    Roboto_Bold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    // eslint-disable-next-line no-undef
    Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    // eslint-disable-next-line no-undef
    Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    console.log(error);
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
