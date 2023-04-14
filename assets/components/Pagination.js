import React, {useContext} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CharactersContext } from '../../App';

export const Pagination = () => {
  const [characters, handleClickNext, handleClickPrev, count, currentPage] = useContext(CharactersContext);
  
  const itemsPerPage = 10;
  const itemsStart = (currentPage - 1) * itemsPerPage + 1;
  const itemsEnd = Math.min(currentPage * itemsPerPage, count);
  const shownItems = `${itemsStart} - ${itemsEnd} of ${count}`;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = !characters || itemsEnd === count;

  return (
    <View style={styles.container}>
      <Text style={styles.itemsShown}>{shownItems}</Text>
      <TouchableOpacity onPress={handleClickPrev} style={styles.button} disabled={isPrevDisabled}>
        <Ionicons name="chevron-back" size={24} color={isPrevDisabled ? 'grey' : 'black'} style={styles.arrow}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickNext} style={styles.button} disabled={isNextDisabled}>
        <Ionicons name="chevron-forward" size={24} color={isNextDisabled ? 'grey' : 'black'} style={styles.arrow}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemsShown: {
    marginRight: 10,
  },
  arrow: {
    marginHorizontal: 15,
  },
  button: {
    opacity: 0.8,
    marginHorizontal: 5,
  },
});
