import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet} from 'react-native';
// import {NavigationProp} from '@react-navigation/native';
// import {NetworkStackParamList} from 'navigation/navigation';

// type ScreenProps = {
//   navigation: NavigationProp<NetworkStackParamList>;
// };

export function Explorer() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'Explorer'}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
