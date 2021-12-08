import React from 'react';
import {useTheme} from 'context/Theme';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export function LoadingView() {
  const {colors} = useTheme();
  return (
    <View style={{...styles.safeView, backgroundColor: colors.background}}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
