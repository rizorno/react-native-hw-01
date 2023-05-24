import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { USER, POSTS } from "./DATA";

const MapScreen = ({ route }) => {
  const selectedPost = POSTS.find(
    (item) => item.id === route.params.selectedPost
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        //   onMapReady={() => console.log("Map is ready")}
        //   onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title={selectedPost.localisation}
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          description={selectedPost.title}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
