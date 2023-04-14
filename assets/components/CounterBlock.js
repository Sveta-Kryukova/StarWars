import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Counter } from "./Counter";

export const CounterBlock = (props) => {
  const { genderCounts } = props;
  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Counter genderFans='Male Fans' genderCounts={genderCounts.male}/>
      </View>
      <View style={styles.counterContainer}>
        <Counter genderFans='Female Fans' genderCounts={genderCounts.female}/>
      </View>
      <View style={styles.counterContainer}>
        <Counter genderFans='Others' genderCounts={genderCounts.other}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  counterContainer: {
    height: 100,
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
