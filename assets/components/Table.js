import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Pagination } from './Pagination'
import { TableHeader } from './TableHeader';

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
          return screenWidth > 600 ? 'none' : 'n/a';
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
        <TableHeader
            handleNameClick={handleNameClick}
            birthYearColumn={birthYearColumn}
            genderColumn={genderColumn}
            homeWorldColumn={homeWorldColumn}
            speciesColumn={speciesColumn}
          />
            {characters.length ? (
              sortedCharacters.map((character) => (
                <View key={character.url} style={styles.row}>
                  <Icon
                    name={likeStatus[character.url] ? 'heart' : 'heart-o'}
                    size={20}
                    color={likeStatus[character.url] ? 'red' : '#f00'}
                    style={{ marginRight: '10%' }}
                    onPress={() => handlePress(character)}
                  />
                  <Text style={[styles.cell, { width: '40%' }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailedCharacterScreen', { url: character.url })}>
                      <Text>{character.name}</Text>
                    </TouchableOpacity>
                  </Text>
                  <Text style={[styles.cell, {width: '10%'}]}>{getBirthYearAbbreviation(character.birth_year)}</Text>
                  <Text style={[styles.cell, {width: '10%', overflow: 'hidden'}]}>{getGenderAbbreviation(character.gender)}</Text>
                  <Text style={[styles.cell, { width: '10%', overflow: 'hidden' }]} numberOfLines={1}>
                  {homeworldData[character.homeworld]}
                  </Text>
                  <Text style={[styles.cell, { width: '10%', overflow: 'hidden' }]} numberOfLines={1}>{speciesData[character.species]}</Text>
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
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    height: 47,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    textAlign: 'left',
    marginRight: 5,
  },
});
