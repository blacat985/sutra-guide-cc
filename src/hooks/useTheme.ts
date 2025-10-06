import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { loadTheme, saveTheme } from '../services/themeStorage';
import type { ThemeMode } from '../types/theme';

interface UseThemeResult {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    // Load theme on mount
    const savedTheme = loadTheme();
    if (savedTheme !== colorMode) {
      toggleColorMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    toggleColorMode();
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    saveTheme(newMode as ThemeMode);
  };

  return {
    mode: colorMode as ThemeMode,
    toggleTheme,
  };
}
