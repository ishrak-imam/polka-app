import React from 'react';
import {useTheme} from 'context/ThemeContext';
import {StyleSheet, View, ViewStyle} from 'react-native';

type PropTypes = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Layout({children, style}: PropTypes) {
  const {colors} = useTheme();
  return (
    <View
      style={{
        ...styles.safeView,
        ...style,
        backgroundColor: colors.background,
      }}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
