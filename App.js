import React, { createContext, useState, useCallback } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen } from "./assets/screens/MainScreen";
import { DetailedCharacterScreen } from "./assets/screens/DetailedCharacterScreen";
import { getCharacters } from './API';
import { useFonts } from 'expo-font';

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getCharacters(currentPage);
      setCharacters(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
    };
    fetchCharacters();
  }, [currentPage]);

  const loadFonts = async () => {
    await useFonts({
      'Roboto': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Thin.ttf'),
    });
  };

  React.useEffect(() => {
    loadFonts();
  }, []);
  
   const handleClickNext = useCallback(() => {
    if (next !== null) {
      setCurrentPage((prev) => prev + 1);
    }
    return;
  }, [])

  const hadleClickPrev = useCallback(() => {
    if (previous !== null) {
      setCurrentPage((prev) => prev - 1);
    }
    return;
  }, [])

  return (
    <CharactersContext.Provider value={[characters, handleClickNext, hadleClickPrev, count, currentPage]}>
      {children}
    </CharactersContext.Provider>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CharactersProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="DetailedCharacterScreen"
          component={DetailedCharacterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </CharactersProvider>
  );
};

export default App;