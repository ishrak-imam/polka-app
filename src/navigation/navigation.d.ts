import {
  myAccounts,
  addressBook,
  mnemonic,
  verifyMnemonic,
  createAccount,
  importAccount,
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
  [importAccount]: undefined;
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
