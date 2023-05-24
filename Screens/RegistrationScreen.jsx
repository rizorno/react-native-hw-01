import React, { useState } from "react";
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
import bgAndroid from "../images/bgAndroid.png";
import bgIOS from "../images/bgIOS.png";
import { btnAdd, btnRemove } from "../images/iconsSVG";

import { USER } from "./DATA";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialState);
  const [hidden, setHidden] = useState(true);
  const [ava, setAva] = useState();
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerMain}>
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
              <View style={(ava && styles.avaImageBox) || styles.avaNoImageBox}>
                {ava && <Image source={ava} style={styles.avaImage} />}
              </View>

              <TouchableOpacity
                style={ava ? styles.avaRemoveBox : styles.avaAddBox}
                onPress={() => {
                  if (ava === "") {
                    setAva(USER[0].ava);
                  } else {
                    return setAva("");
                  }
                }}
              >
                {ava ? btnRemove : btnAdd}
              </TouchableOpacity>

              <Text style={styles.title}>Registration</Text>

              <TextInput
                style={
                  isFocused.login === "focus"
                    ? styles.inputActive
                    : styles.inputDefault
                }
                type="text"
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                maxLength={250}
                autoComplete="username"
                keyboardType="default"
                value={state.login}
                defaultValue={state.login}
                onChangeText={(value) => setState({ ...state, login: value })}
                onBlur={() => setIsFocused({ ...state, login: "" })}
                onFocus={() => setIsFocused({ ...state, login: "focus" })}
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
                value={state.email}
                defaultValue={state.email}
                onChangeText={(value) => setState({ ...state, email: value })}
                onBlur={() => setIsFocused({ ...state, email: "" })}
                onFocus={() => setIsFocused({ ...state, email: "focus" })}
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
                  onChangeText={(value) =>
                    setState({ ...state, password: value })
                  }
                  onBlur={() => setIsFocused({ ...state, password: "" })}
                  onFocus={() => setIsFocused({ ...state, password: "focus" })}
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

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (
                    state.login === "" ||
                    state.email === "" ||
                    state.password === ""
                  ) {
                    return;
                  }
                  console.log(state);
                  setState(initialState);
                  setIsFocused(initialState);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.btnText}>Sign up</Text>
              </TouchableOpacity>

              <Text
                style={styles.btnLogin}
                onPress={() => navigation.navigate("Login")}
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
  bgImage: {
    flex: 1,
    justifyContent: "center",
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
