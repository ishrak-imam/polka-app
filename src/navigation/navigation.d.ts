import {
  myAccounts,
  addressBook,
  mnemonic,
  explorer,
  staking,
  accountsNavigator,
  networkNavigator,
} from './routeKeys';

type AccountsStackParamList = {
  [myAccounts]: undefined;
  [addressBook]: undefined;
  [mnemonic]: undefined;
};

type NetworkStackParamList = {
  [explorer]: undefined;
  [staking]: undefined;
};

type DrawerParamList = {
  [accountsNavigator]: undefined;
  [networkNavigator]: undefined;
};
