import React from 'react';
import {useTheme} from 'context/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, ViewStyle} from 'react-native';

type PropTypes = {
  children: React.ReactNode;
  style?: ViewStyle;
  noTopEdges?: boolean;
};

export function Layout({children, style, noTopEdges = true}: PropTypes) {
  const {colors} = useTheme();
  return (
    <SafeAreaView
      edges={noTopEdges ? ['left', 'right', 'bottom'] : undefined}
      style={{
        ...styles.safeView,
        ...style,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
