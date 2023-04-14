import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CounterBlock } from "../components/CounterBlock";
import { SafeAreaView } from "react-native-safe-area-context";
import { CharactersList } from "../components/CharactersList";
import { Header } from "../components/Header";

export const MainScreen = () => {
  const navigation = useNavigation();

  const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0, other: 0 });
  const [likeStatus, setLikeStatus] = useState({});
  const [favorites, setFavorites] = useState([]);

  const resetGenderCounts = () => {
    setGenderCounts({ male: 0, female: 0, other: 0 });
    setLikeStatus({});
    setFavorites([]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <Header 
          title='Fans'
          buttonName='Clear fans'
          buttonAction={resetGenderCounts}
        />
        <CounterBlock genderCounts={genderCounts}/>
        <CharactersList 
          setGenderCounts={setGenderCounts}
          setFavorites={setFavorites} 
          setLikeStatus={setLikeStatus}
          likeStatus={likeStatus}
          favorites={favorites}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
});
