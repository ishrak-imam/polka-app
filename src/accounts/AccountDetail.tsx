import React from 'react';
import Identicon from '@polkadot/reactnative-identicon';
import {Layout} from 'components/Layout';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Card, Caption, Padder, Button} from 'rnpaper';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {accountDetail, myAccounts} from 'navigation/routeKeys';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAccounts} from 'context/Accounts';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof accountDetail>;
};

export function AccountDetail({route, navigation}: ScreenProps) {
  const {account} = route.params;
  const {forgetAccount} = useAccounts();

  const copyToClipboard = () => {
    Clipboard.setString(account.address);
  };

  const deleteAccount = () => {
    forgetAccount(account.address);
    navigation.navigate(myAccounts);
  };

  return (
    <Layout style={styles.layout}>
      <ScrollView>
        <Card>
          <Card.Content style={styles.centerAlign}>
            {account.name ? (
              <>
                <Caption>{account.name}</Caption>
                <Padder scale={0.5} />
              </>
            ) : null}
            <TouchableOpacity onPress={copyToClipboard}>
              <Identicon value={account.address} size={60} />
            </TouchableOpacity>
          </Card.Content>
        </Card>
        <Padder scale={2} />
        <Button icon="delete" mode="outlined" onPress={deleteAccount}>
          Delete account
        </Button>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  centerAlign: {
    alignItems: 'center',
  },
});
