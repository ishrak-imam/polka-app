import React from 'react';
import {Caption, useTheme} from 'react-native-paper';

export function ErrorText(props: {children: React.ReactNode}) {
  const theme = useTheme();
  return (
    <Caption style={{color: theme.colors.error}}>{props.children}</Caption>
  );
}
