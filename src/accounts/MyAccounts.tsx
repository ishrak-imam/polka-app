import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, StyleSheet, Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {addressBook} from 'navigation/routeKeys';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts({navigation}: ScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{'My Accounts'}</Text>
      <Button
        title="Address book"
        onPress={() => {
          navigation.navigate(addressBook);
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
