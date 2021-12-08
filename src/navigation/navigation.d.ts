import {
  myAccounts,
  addressBook,
  mnemonic,
  verifyMnemonic,
  createAccount,
  explorer,
  staking,
  accountsNavigator,
  addressBookNavigator,
  networkNavigator,
  stakingNavigator,
} from './routeKeys';

type AccountsStackParamList = {
  [myAccounts]: undefined;
  [mnemonic]: undefined;
  [verifyMnemonic]: {mnemonic: string};
  [createAccount]: {mnemonic: string};
};

type AddressBookStackParamList = {
  [addressBook]: undefined;
};

type NetworkStackParamList = {
  [explorer]: undefined;
};

type StackingStackParamList = {
  [staking]: undefined;
};

type DrawerParamList = {
  [accountsNavigator]: undefined;
  [addressBookNavigator]: undefined;
  [networkNavigator]: undefined;
  [stakingNavigator]: undefined;
};
