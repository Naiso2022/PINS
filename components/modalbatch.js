import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PinModal = ({ pinModalOpen, setPinModalOpen, currentLocation }) => {
  if (!currentLocation) {
    return null;
  }
  // const currentLocation = {
  //   title: "hejuwehfuwiefhwuefiwhefuweifw",
  //   icon: "headset",
  // };

  return (
    // <View style={styles.container}>

    <Modal
      animationType="slide"
      transparent={true}
      visible={pinModalOpen}
      onRequestClose={() => {
        setPinModalOpen(false);
      }}
    >
      <View style={styles.modal}>
        <Image source={currentLocation.logo} style={styles.logo}/>

        <TouchableOpacity style={styles.xBox}>
          <Ionicons
            onPress={() => setPinModalOpen(false)}
            name="close"
            size={35}
            style={styles.x}
          />
        </TouchableOpacity>

        <View style={styles.textAndIconBox}>
          <Text style={styles.pinLocation}>{currentLocation.title}</Text>

          <Text style={styles.descriptionText}>
            {currentLocation.description}
          </Text>
          <Ionicons name={currentLocation.icon} size={90} style={styles.icon} />
          <Text style={styles.pinDoneDescription}>
            Pin för att {currentLocation.pinDoneDescription}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export { PinModal };

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  modal: {
    flex: 1,
    padding: 0,
    margin: 20,
    marginTop: "30%",
    marginBottom: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: -5, height: 7 },
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  xBox: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 0,
    marginTop: 15,
    marginRight: 50,
  },
  logo: {
    height: 50,
    width: 200,
    marginLeft: -5,
    marginTop: 20,
    objectFit: "contain",
  },
  pinLocation: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 35,
  },
  x: {
    color: "black",
    width: 40,
  },
  descriptionText: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    padding: 10,
  },
  icon: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
  textAndIconBox: {},
  pinDoneDescription: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
  },
});
