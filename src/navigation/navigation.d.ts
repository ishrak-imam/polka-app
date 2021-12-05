import {
  myAccounts,
  addressBook,
  mnemonic,
  verifyMnemonic,
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
};

type NetworkStackParamList = {
  [explorer]: undefined;
  [staking]: undefined;
};

type DrawerParamList = {
  [accountsNavigator]: undefined;
  [networkNavigator]: undefined;
};
