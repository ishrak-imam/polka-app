import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Staking() {
  return (
    <View style={styles.container}>
      <Text>{'Staking'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
