import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export const Counter = (props) => {
  const { genderFans, genderCounts } = props;

  const [fontsLoaded] = useFonts({
    "Roboto": require("../fonts/Roboto-Light.ttf"),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{genderCounts}</Text>
      <Text>{genderFans}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    fontSize: 35,
    fontFamily: 'Roboto',
  },
});
