import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { CharactersContext } from "../../App";
import { Table } from "./Table";

export const CharactersList = (props) => {
  const { 
    setGenderCounts, 
    setLikeStatus, 
    setFavorites, 
    favorites, 
    likeStatus,
    navigation 
  } = props;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [characters] = useContext(CharactersContext);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        icon={() => <Icon name="search" size={30} />}
        placeholderTextColor="#A9A9A9"
        style={styles.searchBar}
        onChangeText={handleSearchQueryChange}
        value={searchQuery}
      />
      <Table 
        characters={filteredCharacters} 
        setGenderCounts={setGenderCounts} 
        setLikeStatus={setLikeStatus} 
        setFavorites={setFavorites} 
        likeStatus={likeStatus}
        favorites={favorites}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  searchBar: {
    color: "#A9A9A9",
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingLeft: 0,
  },
});
