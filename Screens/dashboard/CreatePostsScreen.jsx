import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Image,
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
import PropTypes from "prop-types";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { uploadPhotoToServer } from "../../firebase/hooks";
import { getUser } from "../../redux/auth/authSelectors";
import {
  uploadPostToServerThunk,
  getAllPostsThunk,
  getUserPostsThunk,
} from "../../redux/dashboard/postOperations";
import { camera, local, trash } from "../../images/iconsSVG";

const initialState = {
  uid: null,
  pictureMetaData: null,
  pictureCameraURI: null,
  name: "",
  place: "",
  local: "",
  coords: "",
};

// eslint-disable-next-line no-undef
const { GOOGLE_MAP_KEY } = process.env;

const CreatePostsScreen = ({ navigation }) => {
  const { uid } = useSelector(getUser);
  const [state, setState] = useState(initialState);
  const [openCamera, setOpenCamera] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access camera was denied");
        return;
      }

      let { valid = status } =
        await Location.requestForegroundPermissionsAsync();

      if (valid !== "granted") {
        console.log("Permission to access location was denied");
      }

      // eslint-disable-next-line no-unused-vars
      const result = await MediaLibrary.requestPermissionsAsync();

      setHasPermission((prevState) => ({ ...prevState, camera: "granted" }));

      const position = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const currentLocal = await Location.reverseGeocodeAsync(
        coords,
        GOOGLE_MAP_KEY
      );

      setState((prevState) => ({
        ...prevState,
        uid,
        coords,
        local: {
          name: currentLocal[0].name,
          street: currentLocal[0].street,
          streetNumber: currentLocal[0].streetNumber,
          district: currentLocal[0].district,
          city: currentLocal[0].city,
          region: currentLocal[0].region,
          country: currentLocal[0].country,
        },
      }));

      setHasPermission((prevState) => ({ ...prevState, location: "granted" }));

      const blurScreen = navigation.addListener("blur", () => {
        setOpenCamera(true);
        setState(initialState);
      });

      return blurScreen;
    })();
  }, [openCamera, navigation, uid]);

  const onSubmit = () => {
    const { pictureCameraURI, name, place } = state;

    if (pictureCameraURI === null || name === "" || place === "") {
      return;
    }

    uploadPhotoToServer(state.pictureCameraURI);

    dispatch(uploadPostToServerThunk(state));

    dispatch(getAllPostsThunk());

    dispatch(getUserPostsThunk(uid));

    setState(initialState);

    navigation.navigate("Posts");
    setOpenCamera(true);
  };

  return (
    <>
      {hasPermission && openCamera ? (
        <View style={styles.containerCamera}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <View style={styles.textBox}>
                  <Text style={styles.text}>Flip</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeContainer}
                onPress={() => {
                  navigation.navigate("Posts");
                  setOpenCamera(true);
                }}
              >
                <View style={styles.textBox}>
                  <Text style={styles.text}>Close</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    const savedPicture = await MediaLibrary.createAssetAsync(
                      uri
                    );
                    setState((prevState) => ({
                      ...prevState,
                      pictureCameraURI: savedPicture.uri,
                      pictureMetaData: savedPicture,
                    }));
                    setOpenCamera(false);
                  }
                }}
              >
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={160}
            style={styles.container}
          >
            <View>
              <View
                style={
                  state.pictureCameraURI
                    ? styles.photoBoxFull
                    : styles.photoBoxFree
                }
              >
                {state.pictureCameraURI ? (
                  <Image
                    source={state.pictureMetaData}
                    style={styles.myPhoto}
                  />
                ) : null}

                <TouchableOpacity
                  style={styles.cameraBox}
                  onPress={() => setOpenCamera(true)}
                >
                  {state.pictureCameraURI
                    ? camera("rgba(255, 255, 255, 0.3)", "#ffffff")
                    : camera("#ffffff", "#BDBDBD")}
                </TouchableOpacity>
              </View>
              <Text style={styles.textUpload}>
                {state.pictureCameraURI ? "Edid a picture" : "Upload a picture"}
              </Text>

              <View>
                <TextInput
                  style={styles.inputName}
                  type="text"
                  placeholder="Name..."
                  placeholderTextColor="#BDBDBD"
                  maxLength={250}
                  autoComplete="off"
                  keyboardType="default"
                  autoCorrect={false}
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />

                <View style={styles.inputWrapper}>
                  <View style={styles.localIcon}>{local}</View>

                  <TextInput
                    style={styles.inputLocal}
                    type="text"
                    placeholder="Location..."
                    placeholderTextColor="#BDBDBD"
                    maxLength={250}
                    autoComplete="off"
                    keyboardType="default"
                    autoCorrect={false}
                    value={state.place}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, place: value }))
                    }
                  />
                </View>
              </View>

              <TouchableOpacity
                style={
                  state.pictureCameraURI === null ||
                  state.name === "" ||
                  state.place === ""
                    ? styles.btnNoActive
                    : styles.btnActive
                }
                onPress={onSubmit}
              >
                <Text
                  style={
                    state.pictureCameraURI === null ||
                    state.name === "" ||
                    state.place === ""
                      ? styles.btnTextNoActive
                      : styles.btnTextActive
                  }
                >
                  Publish
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnTrash}
                onPress={() => {
                  if (
                    state.pictureCameraURI === null &&
                    state.name === "" &&
                    state.place === ""
                  ) {
                    return;
                  }
                  setState(initialState);
                }}
              >
                <View>
                  {state.pictureCameraURI === null &&
                  state.name === "" &&
                  state.place === ""
                    ? trash("#BDBDBD")
                    : trash("red")}
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    justifyContent: "space-around",
  },
  photoBoxFree: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  photoBoxFull: {
    position: "relative",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  myPhoto: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: "cover",
  },
  cameraBox: {
    position: "absolute",
    top: "40%",
    right: "43%",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  textUpload: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 30,
  },
  inputWrapper: {
    position: "relative",
    marginVertical: 32,
  },
  inputName: {
    minHeight: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  inputLocal: {
    minHeight: 50,
    width: "100%",
    color: "#212121",
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    paddingVertical: 5,
    paddingBottom: 15,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  localIcon: {
    position: "absolute",
    top: 5,
    left: 0,
  },
  btnActive: {
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnNoActive: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextActive: {
    color: "#FFFFFF",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnTextNoActive: {
    color: "#BDBDBD",
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnTrash: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerCamera: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  photoView: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  flipContainer: {
    position: "absolute",
    right: 10,
    bottom: 20,
  },
  closeContainer: {
    position: "absolute",
    left: 10,
    bottom: 20,
  },
  textBox: {
    backgroundColor: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: "50%",
  },
  text: {
    color: "#212121",
    fontSize: 18,
  },
  button: {
    alignSelf: "center",
    marginBottom: 20,
  },
  takePhotoOut: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 50,
  },
  takePhotoInner: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 50,
  },
});

CreatePostsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CreatePostsScreen;
