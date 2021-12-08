import {
  myAccounts,
  addressBook,
  mnemonic,
  verifyMnemonic,
  createAccount,
  explorer,
  staking,
  accountsNavigator,
  networkNavigator,
} from './routeKeys';

type AccountsStackParamList = {
  [myAccounts]: undefined;
  [addressBook]: undefined;
  [mnemonic]: undefined;
  [verifyMnemonic]: {mnemonic: string};
  [createAccount]: {mnemonic: string};
};

type NetworkStackParamList = {
  [explorer]: undefined;
  [staking]: undefined;
};

type DrawerParamList = {
  [accountsNavigator]: undefined;
  [networkNavigator]: undefined;
};
