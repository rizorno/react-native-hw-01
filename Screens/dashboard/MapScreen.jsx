import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PropTypes from "prop-types";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.postCoords;
  const { localisation } = route.params.postPlace;
  const { title } = route.params.postTitle;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title={localisation}
          coordinate={{ latitude, longitude }}
          description={title}
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

MapScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default MapScreen;
