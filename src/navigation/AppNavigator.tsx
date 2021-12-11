import React from 'react';
import {ParamListBase} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator, DrawerNavigationProp} from '@react-navigation/drawer';

import type {
  AccountsStackParamList,
  AddressBookStackParamList,
  NetworkStackParamList,
  StackingStackParamList,
  DrawerParamList,
} from './navigation';
import * as routeKeys from './routeKeys';

import {DrawerScreen} from './DrawerScreen';
import {MyAccounts} from 'accounts/MyAccounts';
import {AddressBook} from 'accounts/AddressBook';
import {Mnemonic} from 'accounts/Mnemonic';
import {VerifyMnemonic} from 'accounts/VerifyMnemonic';
import {CreateAccount} from 'accounts/CreateAccount';
import {ImportSeed} from 'accounts/ImportSeed';
import {ImportJson} from 'accounts/ImportJson';
import {AccountDetail} from 'accounts/AccountDetail';
import {Explorer} from 'network/Explorer';
import {Staking} from 'network/Staking';
import {AppBar} from 'rnpaper/AppBar';

const AccountsStack = createNativeStackNavigator<AccountsStackParamList>();
function AccountsNavigator() {
  return (
    <AccountsStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar navigation={navigation as unknown as DrawerNavigationProp<ParamListBase>} {...rest} />
        ),
      }}>
      <AccountsStack.Screen name={routeKeys.myAccounts} component={MyAccounts} />
      <AccountsStack.Screen name={routeKeys.mnemonic} component={Mnemonic} />
      <AccountsStack.Screen name={routeKeys.verifyMnemonic} component={VerifyMnemonic} />
      <AccountsStack.Screen name={routeKeys.createAccount} component={CreateAccount} />
      <AccountsStack.Screen name={routeKeys.importSeed} component={ImportSeed} />
      <AccountsStack.Screen name={routeKeys.importJson} component={ImportJson} />
      <AccountsStack.Screen name={routeKeys.accountDetail} component={AccountDetail} />
    </AccountsStack.Navigator>
  );
}

const AddressBookStack = createNativeStackNavigator<AddressBookStackParamList>();
function AddressBookNavigator() {
  return (
    <AddressBookStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar navigation={navigation as unknown as DrawerNavigationProp<ParamListBase>} {...rest} />
        ),
      }}>
      <AddressBookStack.Screen name={routeKeys.addressBook} component={AddressBook} />
    </AddressBookStack.Navigator>
  );
}

const NetworkStack = createNativeStackNavigator<NetworkStackParamList>();
function NetworkNavigator() {
  return (
    <NetworkStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar navigation={navigation as unknown as DrawerNavigationProp<ParamListBase>} {...rest} />
        ),
      }}>
      <NetworkStack.Screen name={routeKeys.explorer} component={Explorer} />
    </NetworkStack.Navigator>
  );
}

const StakingStack = createNativeStackNavigator<StackingStackParamList>();
function StakingNavigator() {
  return (
    <StakingStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar navigation={navigation as unknown as DrawerNavigationProp<ParamListBase>} {...rest} />
        ),
      }}>
      <StakingStack.Screen name={routeKeys.staking} component={Staking} />
    </StakingStack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name={routeKeys.accountsNavigator} component={AccountsNavigator} />
      <Drawer.Screen name={routeKeys.addressBookNavigator} component={AddressBookNavigator} />
      <Drawer.Screen name={routeKeys.networkNavigator} component={NetworkNavigator} />
      <Drawer.Screen name={routeKeys.stakingNavigator} component={StakingNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
