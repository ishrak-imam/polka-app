import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import {ThemeProvider} from 'context/ThemeContext';
import {NetworkProvider} from 'context/Network';
import {ApiProvider} from 'context/Api';

export default function App() {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <ApiProvider>
          <NavigationContainer>
            <ThemeProvider>
              <AppNavigator />
            </ThemeProvider>
          </NavigationContainer>
        </ApiProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
