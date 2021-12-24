import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {
  Provider,
  Portal,
  FAB,
  useTheme,
  List,
  View,
  Caption,
  Modal,
  Card,
  Paragraph,
  TextInput,
  ErrorText,
  Button,
  IconButton,
} from 'rnpaper';
import Identicon from '@polkadot/reactnative-identicon/';
import {stringShorten} from '@polkadot/util';
import {StyleSheet, FlatList} from 'react-native';
import {useAccounts, Account, AddExternalAccountPayload} from 'context/Accounts';
import {Layout} from 'components/Layout';
import {accountDetail, importJson, importSeed, mnemonic} from 'navigation/routeKeys';
import {isAddressValid} from 'utils';
import {useNetwork} from 'context/Network';
import {LoadingView} from 'components/LoadingView';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts({navigation}: ScreenProps) {
  const theme = useTheme();
  const {isLoading, accounts, addExternalAccount, toggleFavorite} = useAccounts();

  const [isVisible, setIsVisible] = React.useState(false);

  const toAccountDetail = (account: Account) => {
    navigation.navigate(accountDetail, {account});
  };

  return (
    <Provider theme={theme}>
      <Layout style={styles.layout}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={accounts}
            renderItem={({item: account}) => (
              <AccountItem onPress={toAccountDetail} account={account} toggleFavorite={toggleFavorite} />
            )}
          />
        )}
      </Layout>
      <Buttons navigation={navigation} setModalVisible={setIsVisible} />
      <AddExternalAccountModal
        visible={isVisible}
        setModalVisible={setIsVisible}
        addExternalAccount={addExternalAccount}
      />
    </Provider>
  );
}

type AddExternalAccountProps = {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  addExternalAccount: (payload: AddExternalAccountPayload) => void;
};

const AddExternalAccountModal = ({visible, setModalVisible, addExternalAccount}: AddExternalAccountProps) => {
  const {currentNetwork} = useNetwork();
  const [address, setAddress] = React.useState('');
  const [error, setError] = React.useState('');

  const isDisabled = !address || Boolean(error);

  React.useEffect(() => {
    if (address) {
      setError(isAddressValid(currentNetwork, address) ? '' : 'Invalid address');
    }
  }, [address, currentNetwork]);

  const onReset = () => {
    setAddress('');
    setError('');
    setModalVisible(false);
  };

  const onAddAccount = () => {
    addExternalAccount({
      address,
      network: currentNetwork.key,
      isFavorite: false,
    });
    onReset();
  };

  return (
    <Modal visible={visible} onDismiss={onReset}>
      <Card>
        <Card.Title title={<Paragraph>{'Add external account'}</Paragraph>} />
        <Card.Content>
          <TextInput
            multiline
            numberOfLines={3}
            mode="outlined"
            placeholder="Paste address here, e.g. 167r...14h"
            value={address}
            onChangeText={(text) => setAddress(text)}
            error={Boolean(error)}
          />
          <View style={styles.errorText}>{error ? <ErrorText>{error}</ErrorText> : null}</View>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button onPress={onReset}>Cancel</Button>
          <Button disabled={isDisabled} onPress={onAddAccount}>
            Add
          </Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
};

type AccountItemProps = {
  account: Account;
  toggleFavorite: (address: string) => void;
  onPress: (account: Account) => void;
};

const AccountItem = ({account, toggleFavorite, onPress}: AccountItemProps) => {
  const {colors} = useTheme();

  return (
    <List.Item
      onPress={() => {
        onPress(account);
      }}
      title={<Caption>{account.isExternal ? 'External account' : account.name}</Caption>}
      left={() => (
        <View style={styles.justifyCenter}>
          <Identicon value={account.address} size={40} />
        </View>
      )}
      description={stringShorten(account.address, 12)}
      right={() => (
        <IconButton
          onPress={() => {
            toggleFavorite(account.address);
          }}
          color={account.isFavorite ? colors.accent : colors.disabled}
          icon={account.isFavorite ? 'star' : 'star-outline'}
        />
      )}
    />
  );
};

type ButtonsProps = {
  navigation: ScreenProps['navigation'];
  setModalVisible: (visible: boolean) => void;
};

const Buttons = ({navigation, setModalVisible}: ButtonsProps) => {
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
            label: 'Import account from Seed',
            onPress: () => {
              navigation.navigate(importSeed);
            },
          },
          {
            icon: 'code-json',
            label: 'Import account from json',
            onPress: () => {
              navigation.navigate(importJson);
            },
          },
          {
            icon: 'location-exit',
            label: 'Add external account',
            onPress: () => {
              setModalVisible(true);
            },
          },
          {
            icon: 'account-key',
            label: 'Create new account',
            onPress: () => navigation.navigate(mnemonic),
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
  cardActions: {
    justifyContent: 'flex-end',
  },
  errorText: {
    height: 30,
  },
});
