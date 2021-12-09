import React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout} from 'components/Layout';
import {View, Subheading, Divider, Drawer, Switch} from 'rnpaper';
import {
  accountsNavigator,
  addressBook,
  addressBookNavigator,
  explorer,
  myAccounts,
  networkNavigator,
  staking,
  stakingNavigator,
} from './routeKeys';
import {useTheme} from 'context/Theme';
import { useNetwork } from 'context/Network';

export function DrawerScreen({navigation}: DrawerContentComponentProps) {
  const {currentNetwork, polkadotNetwork, kusamaNetwork, select} = useNetwork()
  const {theme, toggleTheme} = useTheme();
  const [activeScreen, setActiveScreen] = React.useState<string>(myAccounts);

  const onSwitchNetwork = () => {
    select(currentNetwork.key === 'polkadot' ? kusamaNetwork : polkadotNetwork)
  }

  return (
    <Layout style={styles.layout} noTopEdges={false}>
      <View style={styles.header}>
        <Subheading style={{color: currentNetwork.color}}>{currentNetwork.name}</Subheading>
      </View>
      <Divider />
      <ScrollView>
        <Drawer.Section title="Accounts">
          <Drawer.Item
            label="My accounts"
            icon="account-details"
            active={activeScreen === myAccounts}
            onPress={() => {
              setActiveScreen(myAccounts);
              navigation.navigate(accountsNavigator, {screen: myAccounts});
            }}
          />
          <Drawer.Item
            label="Address book"
            icon="book-open"
            active={activeScreen === addressBook}
            onPress={() => {
              setActiveScreen(addressBook);
              navigation.navigate(addressBookNavigator, {screen: addressBook});
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Network">
          <Drawer.Item
            label="Explorer"
            icon="file-search"
            active={activeScreen === explorer}
            onPress={() => {
              setActiveScreen(explorer);
              navigation.navigate(networkNavigator, {screen: explorer});
            }}
          />
          <Drawer.Item
            label="Staking"
            icon="buffer"
            active={activeScreen === staking}
            onPress={() => {
              setActiveScreen(staking);
              navigation.navigate(stakingNavigator, {screen: staking});
            }}
          />
        </Drawer.Section>
        <Drawer.Section title="Settings">
          <Drawer.Item
            label="Dark theme"
            icon="brightness-6"
            right={() => (
              <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            )}
          />
          <Drawer.Item
            onPress={onSwitchNetwork}
            label={`Switch to ${currentNetwork.key === 'polkadot' ? 'Kusama' : 'Polkadot'}`}
            icon="server-network"
          />
        </Drawer.Section>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  header: {
    height: 50,
    // backgroundColor: 'green',
    justifyContent: 'center',
    paddingLeft: 15
  },
});
