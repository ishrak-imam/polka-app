import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon/';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {createAccount, myAccounts} from 'navigation/routeKeys';
import {
  View,
  Button,
  Caption,
  TextInput,
  Padder,
  List,
  useTheme,
} from 'rnpaper';
import {useNetwork} from 'context/Network';
import {useAccounts} from 'context/Accounts';
import {Layout} from 'components/Layout';
import zxcvbn from 'zxcvbn';
import {useMountEffect} from 'hooks/useMountEffect';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof createAccount>;
};

type Account = {
  name: string;
  password: string;
  confirmPassword: string;
};

export function CreateAccount({navigation, route}: ScreenProps) {
  const {mnemonic} = route.params;
  const {currentNetwork} = useNetwork();
  const {
    createAccount: createAccountFromSeed,
    addAccount,
    setCallback,
  } = useAccounts();
  const {colors} = useTheme();

  const [account, setAccount] = React.useState<Account>({
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [address, setAddress] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled =
    !account.name ||
    !account.password ||
    account.password !== account.confirmPassword ||
    passwordStrength < 3;

  useMountEffect(() => {
    createAccountFromSeed(mnemonic);
  });

  const webviewOnMessage = (data: any) => {
    const {type, payload} = data;
    switch (type) {
      case 'CREATE_ACCOUNT': {
        setAddress(payload.address);
        break;
      }
    }
  };
  setCallback(webviewOnMessage);

  const onSubmit = () => {
    addAccount({
      mnemonic,
      password: account.password,
      name: account.name,
      network: currentNetwork.key,
      isFavorite: false,
      isExternal: false,
    });
    navigation.navigate(myAccounts);
  };

  return (
    <Layout style={styles.layout}>
      <ScrollView>
        <List.Item
          title={() => (
            <View style={styles.name}>
              <Caption>{account.name}</Caption>
            </View>
          )}
          left={() => (
            <View style={styles.justifyCenter}>
              <Identicon value={address} size={40} />
            </View>
          )}
          description={address}
        />
        <TextInput mode="flat" disabled value={mnemonic} multiline />
        <Padder scale={1} />
        <TextInput
          mode="outlined"
          label={'Descriptive name for the account'}
          value={account.name}
          onChangeText={text => setAccount({...account, name: text})}
        />
        <Padder scale={1} />
        <TextInput
          secureTextEntry={!isPasswordVisible}
          label={'New password for the account'}
          value={account.password}
          onChangeText={text => {
            setAccount({...account, password: text});
          }}
          right={
            <TextInput.Icon
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
              color={colors.disabled}
            />
          }
          mode="outlined"
          error={Boolean(account.password) && passwordStrength < 3}
        />
        <Padder scale={1} />
        <TextInput
          mode="outlined"
          secureTextEntry={!isPasswordVisible}
          label={'Confirm password'}
          value={account.confirmPassword}
          onChangeText={text => setAccount({...account, confirmPassword: text})}
          error={
            Boolean(account.confirmPassword) &&
            account.password !== account.confirmPassword
          }
        />
        <Padder scale={2} />
        <Button disabled={isDisabled} mode="outlined" onPress={onSubmit}>
          Submit
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
  justifyCenter: {
    justifyContent: 'center',
  },
  name: {
    height: 20,
  },
});
