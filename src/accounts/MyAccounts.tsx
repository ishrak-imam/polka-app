import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {Provider, Portal, FAB, useTheme, List, View, Caption} from 'rnpaper';
import Identicon from '@polkadot/reactnative-identicon/';
import {stringShorten} from '@polkadot/util';
import {StyleSheet, FlatList} from 'react-native';
import {useAccounts, Account} from 'context/Accounts';
import {Layout} from 'components/Layout';
import {mnemonic} from 'navigation/routeKeys';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts({navigation}: ScreenProps) {
  const theme = useTheme();
  const {accounts} = useAccounts();

  return (
    <Provider theme={theme}>
      <Layout style={styles.layout}>
        <FlatList
          data={accounts}
          renderItem={({item: account}) => <AccountItem account={account} />}
        />
      </Layout>
      <Buttons navigation={navigation} />
    </Provider>
  );
}

type AccountItemProps = {
  account: Account;
};

const AccountItem = ({account}: AccountItemProps) => {
  return (
    <List.Item
      title={<Caption>{account.name}</Caption>}
      left={() => (
        <View style={styles.justifyCenter}>
          <Identicon value={account.address} size={40} />
        </View>
      )}
      description={stringShorten(account.address, 12)}
    />
  );
};

const Buttons = ({navigation}: {navigation: ScreenProps['navigation']}) => {
  const [state, setState] = React.useState({open: false});
  const onStateChange = ({open}: {open: boolean}) => setState({open});
  const {open} = state;

  return (
    <Portal>
      <FAB.Group
        visible={true}
        open={open}
        icon={open ? 'minus' : 'plus'}
        actions={[
          {
            icon: 'import',
            label: 'Import seed',
            onPress: () => ({}),
          },
          {
            icon: 'plus',
            label: 'Add External Account',
            onPress: () => ({}),
          },
          {
            icon: 'key-plus',
            label: 'Generate New Seed',
            onPress: () => navigation.navigate(mnemonic),
            small: false,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
});
