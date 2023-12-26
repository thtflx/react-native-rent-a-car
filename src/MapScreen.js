import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = () => {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: "#e7e7e7",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Map Screen</Text>
    // </View>
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};

export default MapScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});