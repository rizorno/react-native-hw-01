import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import { uploadAva } from "../../firebase/hooks";
import { signUpThunk } from "../../redux/auth/authOperations";
import bgAndroid from "../../images/bgAndroid.png";
import bgIOS from "../../images/bgIOS.png";
import { btnAdd, btnRemove } from "../../images/iconsSVG";

const initialState = {
  name: "",
  userEmail: "",
  password: "",
  avatar: null,
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialState);
  const [hidden, setHidden] = useState(true);
  const [spin, setSpin] = useState({ spinner: false });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (state.name === "" || state.userEmail === "" || state.password === "") {
      return;
    }

    setSpin({ spinner: true });

    dispatch(signUpThunk(state));
    Keyboard.dismiss();
    setState(initialState);
    setIsFocused(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerMain}>
        <Spinner
          visible={spin.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <ImageBackground
          source={Platform.OS == "ios" ? bgAndroid : bgIOS}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-180}
          >
            <View style={styles.container}>
              <View
                style={
                  (state.avatar && styles.avaImageBox) || styles.avaNoImageBox
                }
              >
                {state.avatar && (
                  <Image
                    source={{ uri: state.avatar }}
                    style={styles.avaImage}
                  />
                )}
              </View>

              <TouchableOpacity
                style={state.avatar ? styles.avaRemoveBox : styles.avaAddBox}
                onPress={async () => {
                  if (state.avatar === null) {
                    const assets = await uploadAva();
                    setState((prevState) => ({
                      ...prevState,
                      avatar: assets[0].uri,
                    }));
                  } else {
                    setState((prevState) => ({
                      ...prevState,
                      avatar: null,
                    }));
                  }
                }}
              >
                {state.avatar ? btnRemove : btnAdd}
              </TouchableOpacity>

              <Text style={styles.title}>Registration</Text>

              <TextInput
                style={
                  isFocused.name === "focus"
                    ? styles.inputActive
                    : styles.inputDefault
                }
                type="text"
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                maxLength={250}
                autoComplete="username"
                keyboardType="default"
                value={state.name}
                defaultValue={state.name}
                onSubmitEditing={handleSubmit}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, name: value }))
                }
                onBlur={() =>
                  setIsFocused((prevState) => ({ ...prevState, name: "" }))
                }
                onFocus={() =>
                  setIsFocused((prevState) => ({
                    ...prevState,
                    name: "focus",
                  }))
                }
              />

              <TextInput
                style={
                  isFocused.email === "focus"
                    ? styles.inputActive
                    : styles.inputDefault
                }
                type="email"
                placeholder="E-mail"
                placeholderTextColor="#BDBDBD"
                maxLength={250}
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                value={state.userEmail}
                defaultValue={state.userEmail}
                onSubmitEditing={handleSubmit}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, userEmail: value }))
                }
                onBlur={() =>
                  setIsFocused((prevState) => ({ ...prevState, email: "" }))
                }
                onFocus={() =>
                  setIsFocused((prevState) => ({
                    ...prevState,
                    email: "focus",
                  }))
                }
              />

              <View>
                <TextInput
                  style={
                    isFocused.password === "focus"
                      ? styles.inputPasswordActive
                      : styles.inputPasswordDefault
                  }
                  type="password"
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  maxLength={250}
                  autoComplete="off"
                  textContentType="password"
                  keyboardType={
                    Platform.OS === "ios" ? "default" : "visible-password"
                  }
                  secureTextEntry={hidden === true ? true : false}
                  value={state.password}
                  defaultValue={state.password}
                  onSubmitEditing={handleSubmit}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onBlur={() =>
                    setIsFocused((prevState) => ({
                      ...prevState,
                      password: "",
                    }))
                  }
                  onFocus={() =>
                    setIsFocused((prevState) => ({
                      ...prevState,
                      password: "focus",
                    }))
                  }
                />

                <Text
                  style={styles.show}
                  onPress={() =>
                    hidden === true ? setHidden(false) : setHidden(true)
                  }
                >
                  Show
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.btnText}>Sign up</Text>
              </TouchableOpacity>

              <Text
                style={styles.btnLogin}
                onPress={() => {
                  navigation.navigate("Login");
                  setState(initialState);
                }}
              >
                Already have an account? Login
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "#ffffff",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },

  container: {
    backgroundColor: "#ffffff",
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 78,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avaNoImageBox: {
    position: "absolute",
    top: "-14%",
    left: "37%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  avaImageBox: {
    position: "absolute",
    top: "-14%",
    left: "37%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 16,
  },
  avaImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avaAddBox: {
    position: "absolute",
    top: 30,
    right: "35%",
    width: 25,
    height: 25,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
    borderRadius: "50%",
  },
  avaRemoveBox: {
    position: "absolute",
    top: 30,
    right: "35%",
    width: 25,
    height: 25,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#BDBDBD",
    borderRadius: "50%",
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    marginBottom: 33,
  },
  inputActive: {
    height: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
  },
  inputDefault: {
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  inputPasswordActive: {
    height: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
  },
  inputPasswordDefault: {
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingStart: 16,
    paddingEnd: 65,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  show: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#1B4371",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
    marginBottom: 16,
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnLogin: {
    color: "#1B4371",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});

export default RegistrationScreen;
