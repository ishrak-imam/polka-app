import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import {ThemeProvider} from 'context/ThemeContext';
import {NetworkProvider} from 'context/Network';
import {ApiProvider} from 'context/Api';
import {AccountsProvider} from 'context/Accounts';

export default function App() {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <ApiProvider>
          <ThemeProvider>
            <AccountsProvider>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </AccountsProvider>
          </ThemeProvider>
        </ApiProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
