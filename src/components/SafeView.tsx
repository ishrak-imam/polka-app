import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, ViewStyle} from 'react-native';

type PropTypes = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function SafeView({children, style}: PropTypes) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
