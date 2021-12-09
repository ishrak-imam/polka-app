import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Identicon from '@polkadot/reactnative-identicon/';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {Layout} from 'components/Layout';
import {
  TextInput,
  ErrorText,
  Padder,
  List,
  View,
  Caption,
  useTheme,
  Button,
} from 'rnpaper';
import {useAccounts} from 'context/Accounts';
import zxcvbn from 'zxcvbn';
import {useNetwork} from 'context/Network';
import {myAccounts} from 'navigation/routeKeys';

type Account = {
  name: string;
  password: string;
  confirmPassword: string;
};

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function ImportAccount({navigation}: ScreenProps) {
  const {colors} = useTheme();
  const {currentNetwork} = useNetwork();
  const {setCallback, validateMnemonic, createAccount, addAccount} =
    useAccounts();
  const [seed, setSeed] = React.useState('');
  const [seedStatus, setSeedStatus] = React.useState({
    validating: false,
    isValid: false,
  });
  const [address, setAddress] = React.useState('');
  const [account, setAccount] = React.useState<Account>({
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const passwordStrength = zxcvbn(account.password).score;

  const isDisabled =
    !seedStatus.isValid ||
    !account.name ||
    !account.password ||
    account.password !== account.confirmPassword ||
    passwordStrength < 3;

  const webviewOnMessage = (data: any) => {
    const {type, payload} = data;
    switch (type) {
      case 'VALIDATE_MNEMONIC': {
        setSeedStatus({validating: false, isValid: payload.isValid});
        break;
      }

      case 'CREATE_ACCOUNT': {
        setAddress(payload.address);
        break;
      }
    }
  };
  setCallback(webviewOnMessage);

  React.useEffect(() => {
    if (seedStatus.isValid) {
      createAccount(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, seedStatus.isValid]);

  React.useEffect(() => {
    if (seed) {
      validateMnemonic(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  const onSubmit = () => {
    addAccount({
      mnemonic: seed,
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
        <View style={styles.identicon}>
          {address ? (
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
          ) : null}
        </View>
        <Padder scale={0.5} />
        <TextInput
          style={styles.seedInput}
          label={'Existing Seed'}
          numberOfLines={3}
          multiline={true}
          value={seed}
          onChangeText={_seed => {
            setSeedStatus({...seedStatus, validating: true});
            setSeed(_seed);
          }}
          editable
          mode="outlined"
          error={Boolean(seed) && !seedStatus.validating && !seedStatus.isValid}
        />
        <View style={styles.errorText}>
          {Boolean(seed) && !seedStatus.validating && !seedStatus.isValid ? (
            <ErrorText>{'Invalid Seed'}</ErrorText>
          ) : null}
        </View>
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
          Import Account
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
  identicon: {
    height: 80,
  },
  errorText: {
    height: 30,
  },
  seedInput: {
    height: 80,
  },
});
