
import React from 'react'
import {HomeScreen} from "screen/HomeScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AppStack = createNativeStackNavigator()

function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home Screen" component={HomeScreen}></AppStack.Screen>
    </AppStack.Navigator>
  )
}

export default AppNavigator