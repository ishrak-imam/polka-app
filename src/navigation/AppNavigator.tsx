import React from 'react';
import {ParamListBase} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import type {
  AccountsStackParamList,
  NetworkStackParamList,
  DrawerParamList,
} from './navigation';
import * as routeKeys from './routeKeys';

import {MyAccounts} from 'accounts/MyAccounts';
import {AddressBook} from 'accounts/AddressBook';
import {Mnemonic} from 'accounts/Mnemonic';
import {Explorer} from 'network/Explorer';
import {Staking} from 'network/Staking';
import {AppBar} from 'rnpaper/AppBar';

const AccountsStack = createNativeStackNavigator<AccountsStackParamList>();
function AccountsNavigator() {
  return (
    <AccountsStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar
            navigation={
              navigation as unknown as DrawerNavigationProp<ParamListBase>
            }
            {...rest}
          />
        ),
      }}>
      <AccountsStack.Screen
        name={routeKeys.myAccounts}
        component={MyAccounts}
      />
      <AccountsStack.Screen
        name={routeKeys.addressBook}
        component={AddressBook}
      />
      <AccountsStack.Screen name={routeKeys.mnemonic} component={Mnemonic} />
    </AccountsStack.Navigator>
  );
}

const NetworkStack = createNativeStackNavigator<NetworkStackParamList>();
function NetworkNavigator() {
  return (
    <NetworkStack.Navigator
      screenOptions={{
        header: ({navigation, ...rest}) => (
          <AppBar
            navigation={
              navigation as unknown as DrawerNavigationProp<ParamListBase>
            }
            {...rest}
          />
        ),
      }}>
      <NetworkStack.Screen name={routeKeys.explorer} component={Explorer} />
      <NetworkStack.Screen name={routeKeys.staking} component={Staking} />
    </NetworkStack.Navigator>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name={routeKeys.accountsNavigator}
        component={AccountsNavigator}
      />
      <Drawer.Screen
        name={routeKeys.networkNavigator}
        component={NetworkNavigator}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
