import type { ThemeMode } from '../types/theme';

const THEME_STORAGE_KEY = 'chakra-ui-color-mode';

export function saveTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (error) {
    // Silently fail if localStorage is unavailable or quota exceeded
    console.warn('Failed to save theme to localStorage:', error);
  }
}

export function loadTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'light'; // Default fallback
  } catch (error) {
    // Silently fail if localStorage is unavailable
    console.warn('Failed to load theme from localStorage:', error);
    return 'light'; // Default fallback
  }
}
