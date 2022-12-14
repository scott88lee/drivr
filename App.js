import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';


const App = () => {
  const [location, setLocation] = useState(null);
  const [timeStamp, setTimestamp] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function getLocation() {
    console.log('Button Pressed.');
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;  
      }

      let location = await Location.getCurrentPositionAsync({});
      let time = new Date(location.timestamp);
      setTimestamp(time.toLocaleString());
      
      let payload = {
        time,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
        accuracy: location.coords.accuracy,
        altitudeAccuracy: location.coords.altitudeAccuracy,
        heading: location.coords.heading,
        speed: location.coords.speed,
      }
      setLocation(JSON.stringify(payload))
    })();
  }

  useEffect(() => {
    console.log('Location: ', location);
  }, [location]);

  return (
    <View style={styles.container}>
      <Text>Time: {timeStamp}</Text>
      <Text>{location}</Text>
      <Button
        onPress={() => getLocation()}
        title="Current Location"
      />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7c7c7c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});