import { StatusBar } from "expo-status-bar";
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
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PinModal } from "./components/modalbatch";
import MapScreen from "./MapScreen";
import { locationsOfInterest, pinsOfInterest } from "./locationsOfInterest";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.jump}>
      <ImageBackground
        source={require("./assets/background1.jpg")}
        style={styles.backgroundimage}
      >
        <Text style={styles.bigTitle}>Pins</Text>
        <Image
          source={require("./assets/redpin2.png")}
          style={styles.frontpic}
        />
      </ImageBackground>
    </View>
  );
}

function PinScreen({ navigation }) {
  const [pinModal, setPinModal] = useState(false);

  const completedLocations = locationsOfInterest.filter(loc => loc.locationDone);

  // loc.locationDone.map = (pins) => {
  //   return (<View>{pins.logo}</View>), (<Text>{pins.title}</Text>);
  // };


  const changePinModal = (bool) => {
    setPinModal(bool);
  };
  return (
    <View>
      <Text style={{ flex: 1, alignItems: "center" }}>My Pins</Text>

      <View style={styles.pins}>
        <Modal
          transparent={true}
          animationType="fade"
          visible={pinModal}
          nRequestClose={() => changePinModal(false)}
        >
          <PinModal />
        </Modal>
        {completedLocations.map((loc) => {
          return (
            <View style={styles.iconwrap}>
              <Ionicons name={loc.icon} size={57} style={{ color: "red" }} />
              <Text style={styles.icontext}>{loc.title}</Text>
            </View>
          );

        })}
      </View>
    </View>
  );
}

function Challenge({ navigation }) {
  return (
    <View>
      <View style={styles.pins}>
        <View style={styles.iconwrap}>
          <Ionicons
            name="musical-notes"
            size={57}
            style={{ color: "orange" }}
          />
          <Text style={styles.icontext}>Globen</Text>
        </View>

        <View style={styles.iconwrap}>
          <Ionicons name="logo-dribbble" size={57} style={{ color: "red" }} />
          <Text style={styles.icontext}>HotBall</Text>
        </View>

        <View style={styles.iconwrap}>
          <Ionicons name="flash" size={57} style={{ color: "black" }} />
          <Text style={styles.icontext}>Life</Text>
        </View>
      </View>
      <View style={styles.pins}>
        <View style={styles.iconwrap}>
          <Ionicons name="beer" size={57} style={{ color: "green" }} />
          <Text style={styles.icontext}>MegaBozzer</Text>
        </View>
        <View style={styles.iconwrap}>
          <Ionicons name="train" size={57} style={{ color: "blue" }} />

          <Text style={styles.icontext}>Smelltrain</Text>
        </View>
        <View style={styles.iconwrap}>
          <Ionicons name="paw" size={57} style={{ color: "pink" }} />

          <Text style={styles.icontext}>Puppy</Text>
        </View>
      </View>
    </View>
  );
}

function SettingsStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="My Pins" component={PinScreen} />
      <Stack.Screen name="All Pins" component={AllPins} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "FuzzyBubbles-Bold": require("./assets/fonts/Fuzzy_Bubbles/FuzzyBubbles-Bold.ttf"),
    "ArchitectsDaughter": require("./assets/fonts/ArchitectsDaughter-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "ios-home" : "ios-home";
            } else if (route.name === "Map") {
              iconName = focused ? "ios-compass" : "compass";
            } else if (route.name === "My Pins") {
              iconName = focused ? "ios-aperture" : "ios-aperture";
            } else if (route.name === "Challenge") {
              iconName = focused ? "ios-trophy" : "ios-trophy";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="My Pins" component={PinScreen} />
        <Tab.Screen name="Challenge" component={Challenge} />
      </Tab.Navigator>
    </NavigationContainer>
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
    width: 70,
    height: 60,
    backgroundColor: "#c2f751",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    alignSelf: "center",
  },
  addname: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    alignSelf: "center",
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
    fontSize: 90,
    marginBottom: 0,
    paddingTop: 30,
    textAlign: "center",
    color: "#000000",
    fontFamily: "ArchitectsDaughter",
    //fontFamily: "FuzzyBubbles-Bold",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 7, height: 2 },
    textShadowRadius: 5,
  },
  backgroundimage: {
    width: "100%",
    height: "100%",
  },
});
