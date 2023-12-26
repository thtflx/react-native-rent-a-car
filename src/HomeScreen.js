import React, { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Image, SafeAreaView, StyleSheet, Text, View, Modal } from "react-native";

const menu = require("./assets/icons/menu.png");
const face = require("./assets/face.png");
const magnifying_glass = require("./assets/icons/magnifying-glass.png");

const image_v_1 = require("./assets/vehicles/v-1.png");
const image_v_2 = require("./assets/vehicles/v-2.png");
const image_v_3 = require("./assets/vehicles/v-3.png");
const image_v_4 = require("./assets/vehicles/v-4.png");
const image_v_5 = require("./assets/vehicles/v-5.png");

import data from "./dataset/vehicles.json";

const HomeScreen = ({ navigation }) => {
  const [vehicles, setVehicles] = useState(data.vehicles);
  const [filteredVehicles, setFilteredVehicles] = useState(data.vehicles);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const getImage = (id) => {
    if (id == 1) return image_v_1;
    if (id == 2) return image_v_2;
    if (id == 3) return image_v_3;
    if (id == 4) return image_v_4;
    if (id == 5) return image_v_5;
  }


  const searchVehicles = (keyword) => {

    const lowercasedKeyword = keyword.toLowerCase();

    const results = vehicles.filter(vehicle => {
      return vehicle.make.toLowerCase().includes(lowercasedKeyword)
    })

    setFilteredVehicles(results);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Image
            source={menu}
            resizeMode="contain"
            style={styles.menuIconStyle}
          />

          <Modal
            transparent
            visible={isDropdownVisible}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              {/* Your dropdown content goes here */}
              <Text style={{ fontSize: 20, color: '#333' }}>Sozlamalar</Text>



              <TouchableOpacity style={{ backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, borderRadius: 3, padding: 5 }} onPress={toggleDropdown}>
                <Text style={{ color: 'white' }}>Qaytish</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity onPress={toggleDropdown}>
            <Image
              source={face}
              resizeMode="contain"
              style={styles.faceIconStyle}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Avtomobil ijarasi</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TextInput
              style={styles.searchInput}
              placeholder="Qidirish"
              onChangeText={(text) => searchVehicles(text)}
            />
            <View style={styles.searchIconArea}>
              <Image
                source={magnifying_glass}
                resizeMode="contain"
                style={styles.magnifyingIconStyle}
              />
            </View>
          </View>
        </View>

        <View style={styles.typesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.typesTextActive}>Hammasi</Text>
            <Text style={styles.typesText}>Suv</Text>
            <Text style={styles.typesText}>Sedan</Text>
            <Text style={styles.typesText}>Mpv</Text>
            <Text style={styles.typesText}>Hatchback</Text>
            <Text style={styles.typesText}>Jeep</Text>
            <Text style={styles.typesText}>Kabriolet</Text>
          </ScrollView>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.headText}>Eng ko'p ijaraga olingan</Text>

          <ScrollView style={styles.elementPallet}>
            {filteredVehicles.map((vehicle) => {
              return (
                <TouchableOpacity
                  style={styles.element}
                  key={vehicle.id}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Info', { id: vehicle.id })}
                >
                  <View style={styles.infoArea}>
                    <Text style={styles.infoTitle}>{vehicle.make} {vehicle.model}</Text>
                    <Text style={styles.infoSub}>{vehicle.type}-{vehicle.transmission}</Text>
                    <Text style={styles.infoPrice}>
                      <Text style={styles.infoAmount}>${vehicle.price_per_day} </Text>/kuniga
                    </Text>
                  </View>
                  <View style={styles.imageArea}>
                    <Image
                      source={getImage(vehicle.id)}
                      resizeMode="contain"
                      style={styles.vehicleImage}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  menuIconStyle: {
    width: 30,
    height: 30,
    // Add any additional styles as needed
  },
  modalContainer: {
    position: 'absolute',
    top: 80, // Adjust the top position as needed
    right: 60, // Adjust the right position as needed
    width: 150, // Adjust the width as needed
    height: 110,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow color (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    padding: 10,
  },
  dropdownContent: {
    // Your styles for dropdown content
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 30,
  },
  faceIconStyle: {
    width: 40,
  },

  titleSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },

  searchSection: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
  },
  searchPallet: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    borderRadius: 8,
    width: "100%",
    height: 30,
    backgroundColor: "white",
  },
  searchInput: {
    width: 245,
    height: 30,

    backgroundColor: "white",
  },
  searchIconArea: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  magnifyingIconStyle: {
    width: 24,
    height: 24,
    marginRight: 30,
  },

  typesSection: {
    marginTop: 15,
    flexDirection: "row",
  },
  typesTextActive: {
    fontSize: 15,
    marginRight: 34,
    fontWeight: "bold",
    color: "black",
  },
  typesText: {
    fontSize: 15,
    marginRight: 33,
    fontWeight: "500",
    color: "#696969",
  },

  listSection: {
    marginTop: 25,
  },
  headText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  elementPallet: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 15,
    width: "110%",
    height: 350,
  },
  element: {
    height: 100,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 13,
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoSub: {
    fontSize: 11,
    fontWeight: "600",
    color: "#696969",
  },
  infoPrice: {
    position: "absolute",
    bottom: 0,
    fontSize: 10,
    color: "#696969",
    fontWeight: "bold",
  },
  infoAmount: {
    fontSize: 12,
    color: "black",
    fontWeight: "600",
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    position: "absolute",
    top: -15,
    left: -15,
    width: "140%",
    height: "140%",
  },
});
