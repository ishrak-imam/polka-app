import React from 'react';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout} from 'components/Layout';
import {View, Headline, Divider, Drawer, Switch} from 'rnpaper';
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

export function DrawerScreen({navigation}: DrawerContentComponentProps) {
  const {theme, toggleTheme} = useTheme();
  const [activeScreen, setActiveScreen] = React.useState<string>(myAccounts);

  return (
    <Layout style={styles.layout} noTopEdges={false}>
      <View style={styles.alignCenter}>
        <Headline>{'POLKA'}</Headline>
      </View>
      <Divider />
      <ScrollView>
        <Drawer.Section title="Accounts">
          <Drawer.Item
            label="My Accounts"
            icon="account-details"
            active={activeScreen === myAccounts}
            onPress={() => {
              setActiveScreen(myAccounts);
              navigation.navigate(accountsNavigator, {screen: myAccounts});
            }}
          />
          <Drawer.Item
            label="Address Book"
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
  alignCenter: {
    alignItems: 'center',
  },
});
