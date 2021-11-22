import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet, Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {NetworkStackParamList} from 'navigation/navigation';
import {staking} from 'navigation/routeKeys';

type ScreenProps = {
  navigation: NavigationProp<NetworkStackParamList>;
};

export function Explorer({navigation}: ScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'Explorer'}</Text>
      <Button
        title="Staking"
        onPress={() => {
          navigation.navigate(staking);
        }}
      />
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
