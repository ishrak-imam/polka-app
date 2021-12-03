import React from 'react';
import {useTheme} from 'context/ThemeContext';
import {StyleSheet, View} from 'react-native';

type PropTypes = {
  children: React.ReactNode;
};

export function Layout({children}: PropTypes) {
  const {colors} = useTheme();
  return (
    <View style={{...styles.safeView, backgroundColor: colors.background}}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
