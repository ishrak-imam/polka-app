import type {Account} from 'context/Accounts';
import {
  myAccounts,
  addressBook,
  mnemonic,
  verifyMnemonic,
  createAccount,
  importSeed,
  importJson,
  accountDetail,
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
  [importSeed]: undefined;
  [importJson]: undefined;
  [accountDetail]: {account: Account};
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
