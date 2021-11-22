import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {ParamListBase, Route} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';

type AppBarProps = {
  back?: {title: string};
  route: Route<string>;
  navigation: DrawerNavigationProp<ParamListBase>;
};

export function AppBar({back, route, navigation}: AppBarProps) {
  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action onPress={navigation.openDrawer} icon={'menu'} />
      )}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}
