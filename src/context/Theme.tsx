import React from 'react';
import {
  useTheme as useRNPaperTheme,
  Provider as RNPaperProvider,
  DarkTheme,
  LightTheme,
} from 'rnpaper';
import {usePersistedState} from 'hooks/usePersistedState';
import {Platform, StatusBar} from 'react-native';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => undefined,
});

type PropTypes = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: PropTypes) {
  const [theme, setTheme] = usePersistedState<Theme>('theme', 'light');

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle(`${theme === 'dark' ? 'light' : 'dark'}-content`);
    }
  }, [theme]);

  const value = React.useMemo(
    () => ({theme, toggleTheme}),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <RNPaperProvider theme={value.theme === 'dark' ? DarkTheme : LightTheme}>
        {children}
      </RNPaperProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const rnPaperTheme = useRNPaperTheme();
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return {...context, ...rnPaperTheme};
}
