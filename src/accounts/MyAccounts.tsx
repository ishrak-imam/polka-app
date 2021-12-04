import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {Provider, Portal, FAB, useTheme} from 'rnpaper';
import {StyleSheet} from 'react-native';
import {useAccounts} from 'context/Accounts';
// import {Layout} from 'components/Layout';
import {mnemonic} from 'navigation/routeKeys';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts({navigation}: ScreenProps) {
  const theme = useTheme();
  const {accounts} = useAccounts();

  return (
    <Provider theme={theme}>
      {/* <Layout /> */}
      <Buttons navigation={navigation} />
    </Provider>
  );
}

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
  card: {
    margin: 10,
  },
});
