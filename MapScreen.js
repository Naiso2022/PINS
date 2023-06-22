import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "./key";
import * as Location from "expo-location";
import { useEffect, useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PinModal } from "./components/modalbatch";
import { locationsOfInterest, pinsOfInterest } from "./locationsOfInterest";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INITIAL_POSITION = {
  latitude: 
  // 59.243397,
  59.293156,
  // 59.178543,
   longitude: 
  // 17.587156,
  18.081652,
  // 17.422183,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};



const pinDone = (pinId) => {
  let allDone = true;
  locationsOfInterest.forEach((loc) => {
    //hitta locations med samma id
    if (loc.pinID == pinId && !loc.locationDone) {
      allDone = false;
    }
  });
  return allDone;
};

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(true);
  const [currentLocation, setCurrentLocation] = useState();

  const handleAddTask = () => {
    setModalOpen(false);
  };

  // const closefunction = () => {
  //   setPinModalOpen(false);
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            onPress={() => setModalOpen(true)}
            name="finger-print"
            size={35}
            style={{ color: "red" }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status == "granted") {
        console.log("Permission successful!");
      } else {
        console.log("Permission not granted!");
      }

      const loc = await Location.getCurrentPositionAsync();

      console.log(loc);

      setLocation(loc);
    })();
  }, []);

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
          pinColor={item.pinColor}
        />
      );
    });
  };

  const nearPosition = (coordinate) => {
    // console.log("coordinate", coordinate);

    locationsOfInterest.forEach((loc) => {
      const latVal = Math.abs(loc.location.latitude - coordinate.latitude);
      const longVal = Math.abs(loc.location.longitude - coordinate.longitude);
      const hypotenusa = Math.sqrt(latVal + longVal);

      //  console.log("hypotenusa", hypotenusa);

      loc.isNear = hypotenusa < 0.01;
      if (hypotenusa < 0.01 && loc.locationDone == false) {
        console.log("Done location", loc);
        loc.locationDone = true;

        //1. kolla om andra pins var tagna.
        loc.isComplete = pinDone(loc.pinID);
        console.log("isComplete", loc.isComplete);

        //2. set state med info som ska visas i modalen.

        setCurrentLocation(loc);

        // visa popup
        setPinModalOpen(true);
      }
    });
  };

  return (
    <View style={styles.jump}>
      {/* <Text>Home Screen</Text>
      <Button title="Go to details" onPress={() => {
        navigation.navigate("Details");
      }} /> */}
      <Modal visible={modalOpen} animationType="slide">

        <View style={styles.linkwrapper}>
          <Text style={styles.addname}>PinFriends</Text>
          <Ionicons name="walk-sharp" size={60} style={{ color: "green" }} />
        </View>

        <View style={styles.linkwrapper}>
          <Text style={styles.addname}>All Pins</Text>
          <Ionicons name="ribbon-outline" size={57} style={{ color: "red" }} />
        </View>

        <View style={styles.linkwrapper}>
          <Text style={styles.addname}>Profile</Text>
          <Ionicons name="person-outline" size={50} style={{ color: "blue" }} />
        </View>

        <View style={styles.linkwrapper}>
          <Text style={styles.addname}>Settings</Text>
          <Ionicons
            name="settings-outline"
            size={50}
            style={{ color: "black" }}
          />
        </View>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addwrapper}>
            <Text style={styles.addButton}>Close</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <PinModal
        currentLocation={currentLocation}
        pinModalOpen={pinModalOpen}
        setPinModalOpen={setPinModalOpen}
      />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        showsUserLocation={true}
        followsUserLocation={true}
        onUserLocationChange={(e) => nearPosition(e.nativeEvent.coordinate)}
      >
        {showLocationsOfInterest()}
      </MapView>

      <View>
        <Text>{JSON.stringify(location)}</Text>

        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: { GOOGLE_API_KEY },
            language: "en",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c6ea5b",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  text: {
    color: "#ffffff",
    fontSize: 33,
    paddingTop: "30%",
  },

  text2: {
    fontSize: 22,
    marginTop: "2%",
  },

  text3: {
    color: "#ff0000",
    fontSize: 33,
    paddingTop: "30%",
  },

  box: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
  },

  box1: {
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    width: 80,
    height: 80,
  },

  buttonbox1: {
    backgroundColor: "#ff0000",
    borderColor: "#ff0000",
    width: 80,
    height: 80,
  },

  box2: {
    backgroundColor: "#2e00ea",
    borderColor: "#ff0000",
    width: 80,
    height: 80,
  },

  box3: {
    backgroundColor: "#439b37",
    borderColor: "#ff0000",
    width: 80,
    height: 80,
  },

  jump: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headerButton: {
    marginRight: 20,
    marginBottom: 7,
  },
  addwrapper: {
    width: 170,
    height: 60,
    backgroundColor: "#ff9900",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    alignSelf: "center",
    shadowOffset: { width: -5, height: 5 },
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addname: {
    marginTop: 0,
    alignSelf: "center",
    fontSize: 40,
    marginRight: 20,
  },
  addButton: {
    fontSize: 20,
  },
  pins: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  iconwrap: {
    display: "flex",
    flexDirection: "col",
    alignItems: "center",
  },
  icontext: {
    fontSize: 20,
  },
  frontpic: {
    height: 400,
    width: 400,
    position: "absolute",
    paddingTop: 600,
    marginTop: 100,
  },
  bigTitle: {
    fontSize: 70,
    marginBottom: 0,
    paddingTop: 50,
    textAlign: "center",
    color: "#000000",
  },
  backgroundimage: {
    width: "100%",
    height: "100%",
  },
  linkwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    marginLeft: 60,
    marginRight: 60,
  },
});
