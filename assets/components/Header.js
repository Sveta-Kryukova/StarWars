import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useFonts } from "expo-font";

export const Header = (props) => {
  const { title,buttonName, resetGenderCounts, buttonAction } = props;
  const [fontsLoaded] = useFonts({
    'Roboto': require('../fonts/Roboto-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight
        style={styles.button}
        underlayColor="transparent"
        onPress={buttonAction}
      >
        <Text style={styles.buttonText}>{buttonName}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto, sans-serif",
  },
  button: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "Roboto",
  },
  buttonText: {
    textTransform: "uppercase",
    color: "red",
    fontFamily: "Roboto",
  },
});