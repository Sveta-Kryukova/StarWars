import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { useFonts } from 'expo-font';

export const DetailedCharacterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url } = route.params;

  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCharacterData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [url]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    'Roboto': require('../fonts/Roboto-Light.ttf'),
  });

  const [homeworldData, setHomeworldData] = useState({});
  const [filmsData, setFilmsData] = useState([]);
  const [speciesData, setSpeciesData] = useState({});
  const [vehiclesData, setVehiclesData] = useState([]);
  const [starshipsData, setStarshipsData] = useState([]);

  useEffect(() => {
    const fetchHomeworldData = async () => {
      const response = await fetch(characterData.homeworld);
      const data = await response.json();
      setHomeworldData(data);
    };

    const fetchFilmsData = async () => {
      const response = await Promise.all(characterData.films.map((film) => fetch(film)));
      const data = await Promise.all(response.map((res) => res.json()));
      setFilmsData(data);
    };

    const fetchSpeciesData = async () => {
      const response = await fetch(characterData.species);
      const data = await response.json();
      setSpeciesData(data);
    };

    const fetchVehiclesData = async () => {
      const response = await Promise.all(characterData.vehicles.map((vehicle) => fetch(vehicle)));
      const data = await Promise.all(response.map((res) => res.json()));
      setVehiclesData(data);
    };

    const fetchStarshipsData = async () => {
      const response = await Promise.all(characterData.starships.map((starship) => fetch(starship)));
      const data = await Promise.all(response.map((res) => res.json()));
      setStarshipsData(data);
    };

    if (characterData) {
      fetchHomeworldData();
      fetchFilmsData();
      fetchSpeciesData();
      fetchVehiclesData();
      fetchStarshipsData();
    }
  }, [characterData]);

  if (!fontsLoaded) {
    return null;
  }

  const SafeArea = Platform.OS === 'android' ? View : SafeAreaView;

  return (
    <SafeArea style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <Header 
          title='Character details'
          buttonName='Back'
          buttonAction={() => navigation.goBack()}
        />
        {characterData && (
          <View style={styles.container}>
             <Text style={[styles.text, { textAlign: 'center', fontSize: 30 }]}>{characterData.name}</Text>
            <Text style={styles.text}>Height: {characterData.height} sm</Text>
            <Text style={styles.text}>Mass: {characterData.mass} kg</Text>
            <Text style={styles.text}>Hair color: {characterData.hair_color}</Text>
            <Text style={styles.text}>Skin color: {characterData.skin_color}</Text>
            <Text style={styles.text}>Eye color: {characterData.eye_color}</Text>
            <Text style={styles.text}>Birth year: {characterData.birth_year}</Text>
            <Text style={styles.text}>Gender: {characterData.gender}</Text>
            <Text style={styles.text}>Homeworld: {homeworldData.name}</Text>
            <Text style={styles.text}>Films: {filmsData.map((film) => film.title).join(', ')}</Text>
            <Text style={styles.text}>Species: {speciesData.name}</Text>
            <Text style={styles.text}>Vehicles: {vehiclesData.map((vehicle) => vehicle.name).join(', ') }</Text>
            <Text style={styles.text}>Starships: {starshipsData.map((starship) => starship.name).join(', ')}</Text>
          </View>
        )}
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    marginHorizontal: 5,
    paddingTop: 50,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontSize: 20,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
});