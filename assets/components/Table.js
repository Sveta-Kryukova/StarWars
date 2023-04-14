import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { Pagination } from './Pagination'

export const Table = (props) => {
  const { 
    characters, 
    setGenderCounts, 
    setLikeStatus, 
    setFavorites, 
    likeStatus, 
    favorites,
    navigation
  } = props;

  const [homeworld, setHomeworld] = useState('');
  const [species, setSpecies] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [homeworldData, setHomeworldData] = useState({});
  const [speciesData, setSpeciesData] = useState({});

  useEffect(() => {
    const fetchHomeworldData = async () => {
      const homeworldUrls = characters.map((character) => character.homeworld);
      const homeworldResponses = await Promise.all(
        homeworldUrls.map((url) => fetch(url).then((res) => res.json()))
      );
      const homeworldData = homeworldResponses.reduce(
        (data, response) => ({ ...data, [response.url]: response.name }),
        {}
      );
      setHomeworldData(homeworldData);
    };
  
    const fetchSpeciesData = async () => {
      const speciesUrls = characters
        .map((character) => character.species)
        .filter((species) => Array.isArray(species) && species.length > 0)
        .flat()
        .filter((url) => url);
    
      if (speciesUrls.length > 0) {
        const speciesResponses = await Promise.all(
          speciesUrls.map((url) => fetch(url).then((res) => res.json()))
        );
        const speciesData = speciesResponses.reduce(
          (data, response) => ({ ...data, [response.url]: response.name }),
          {}
        );
        setSpeciesData(speciesData);
      }
    };
  
    fetchHomeworldData();
    fetchSpeciesData();
  }, [characters]);

    const screenWidth = Dimensions.get('window').width;

    const getBirthYearAbbreviation = (birthYear) => {
      if (screenWidth > 600) {
        return birthYear;
      } else {
        return birthYear.slice(0, 2) + '...';
      }
    }

    const getGenderAbbreviation = (gender) => {
      switch (gender) {
        case 'female':
          return screenWidth > 600 ? 'female' : 'fe...';
        case 'male':
          return screenWidth > 600 ? 'male' : 'm...';
        case 'n/a':
          return screenWidth > 600 ? 'none' : 'no...';
        default:
          return gender.slice(0, 2) + '...';
      }
    }

  const windowWidth = useWindowDimensions().width;

  const isMobile = windowWidth < 768;
  const birthYearColumn = isMobile ? 'B..' : 'Birth Year';
  const genderColumn = isMobile ? 'G..' : 'Gender';
  const homeWorldColumn = isMobile ? 'H..' : 'Home World';
  const speciesColumn = isMobile ? 'S..' : 'Species';

  const handleNameClick = () => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder === 'asc') {
        return 'desc';
      } else if (prevSortOrder === 'desc') {
        return null;
      } else {
        return 'asc';
      }
    });
  };

  const sortedCharacters = [...characters].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    } else {
      return characters.indexOf(a) - characters.indexOf(b);
    }
  });

  const handlePress = useCallback(async (character) => {
    setLikeStatus((prevLikeStatus) => ({
      ...prevLikeStatus,
      [character.url]: !prevLikeStatus[character.url],
      gender: character.gender
    }));

    if (!likeStatus[character.url]) {
      setFavorites([...favorites, character]);
    } else {
      setFavorites(favorites.filter((fav) => fav.url !== character.url));
    }
  }, [favorites, likeStatus, setFavorites, setLikeStatus]);

  useEffect(() => {
    // console.log(likeStatus);
  }, [likeStatus]);

  useEffect(() => {
    const counts = favorites.reduce((acc, val) => {
      if (val.gender === 'male') {
        acc.male += 1;
      } else if (val.gender === 'female') {
        acc.female += 1;
      } else {
        acc.other += 1;
      }
      return acc;
    }, { male: 0, female: 0, other: 0 });
    setGenderCounts(counts);
  }, [favorites]);

  return (
    <>
      <ScrollView horizontal={isMobile} style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Icon 
              name="heart" 
              size={20} 
              color="black" 
              style={{ paddingRight: '20%' }} />
             
            <TouchableOpacity onPress={handleNameClick} style={{ flex: 1 }}>
              <Text style={[styles.heading, { width: 200, flex: 2 }]}>Name</Text>
            </TouchableOpacity>
            <Text style={styles.divider}>&#124;</Text>
            <Text style={[styles.heading, {width: 50}]}>{birthYearColumn}</Text>
            <Text style={styles.divider}>&#124;</Text>
            <Text style={[styles.heading, {width: 50}]}>{genderColumn}</Text>
            <Text style={styles.divider}>&#124;</Text>
            <Text style={[styles.heading, {width: 50}]}>{homeWorldColumn}</Text>
            <Text style={styles.divider}>&#124;</Text>
            <Text style={styles.heading}>{speciesColumn}</Text>
            <Text style={styles.divider}>&#124;</Text>
          </View>
            {characters.length ? (
              sortedCharacters.map((character) => (
                <View key={character.url} style={styles.row}>
                  <Icon
                    name={likeStatus[character.url] ? 'heart' : 'heart-o'}
                    size={20}
                    color={likeStatus[character.url] ? 'red' : '#f00'}
                    style={{ paddingRight: '20%' }}
                    onPress={() => handlePress(character)}
                  />
                  <Text style={[styles.cell, { width: 200 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailedCharacterScreen', { url: character.url })}>
                      <Text>{character.name}</Text>
                    </TouchableOpacity>
                  </Text>
                  <Text style={[styles.cell, {width: 50}]}>{getBirthYearAbbreviation(character.birth_year)}</Text>
                  <Text style={[styles.cell, {width: 50, overflow: 'hidden'}]}>{getGenderAbbreviation(character.gender)}</Text>
                  <Text style={[styles.cell, { width: 50, overflow: 'hidden' }]} numberOfLines={1}>
                  {homeworldData[character.homeworld]}
                  </Text>
                  <Text style={[styles.cell, { width: 50, overflow: 'hidden' }]} numberOfLines={1}>{speciesData[character.species]}</Text>
                </View>
              ))
            ) : (
              <ActivityIndicator size="large" color="red" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}/>
          )}
        </View>
      </ScrollView>
      <Pagination />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    overflow: 'scroll',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 15,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    width: '120%',
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  cell: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Roboto',
  },
  divider: {
    fontSize: 24,
    color: '#ccc',
  },
});
