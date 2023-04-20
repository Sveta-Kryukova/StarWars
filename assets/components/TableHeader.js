import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TableHeader = ({ handleNameClick, birthYearColumn, genderColumn, homeWorldColumn, speciesColumn }) => {
  return (
    <View style={styles.row}>
      <Icon 
        name="heart" 
        size={20} 
        color="black"
        />
      <TouchableOpacity onPress={handleNameClick} style={{ flex: 1 }}>
        <Text style={[styles.heading, { width: 160, flex: 1, marginLeft: 40 }]}>Name</Text>
      </TouchableOpacity>
      <Text style={styles.divider}>&#124;</Text>
      <Text style={[styles.heading, {width: '10%'}]}>{birthYearColumn}</Text>
      <Text style={styles.divider}>&#124;</Text>
      <Text style={[styles.heading, {width: '10%'}]}>{genderColumn}</Text>
      <Text style={styles.divider}>&#124;</Text>
      <Text style={[styles.heading, {width: '10%'}]}>{homeWorldColumn}</Text>
      <Text style={styles.divider}>&#124;</Text>
      <Text style={[styles.heading, {width: '10%'}]}>{speciesColumn}</Text>
      <Text style={styles.divider}>&#124;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '88%',
    height: 47,
    flexDirection: 'row',
    textAlign: 'flex-start',
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
  divider: {
    fontSize: 24,
    color: '#ccc',
  }
});

