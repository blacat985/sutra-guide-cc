import type { FontSize } from '../types/fontSize';

const FONT_SIZE_KEY = 'fontSize';

export const saveFontSize = (size: FontSize): void => {
  try {
    localStorage.setItem(FONT_SIZE_KEY, size);
  } catch (error) {
    console.warn('Failed to save font size to localStorage:', error);
  }
};

export const loadFontSize = (): FontSize => {
  try {
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    if (stored && ['small', 'medium', 'large', 'x-large'].includes(stored)) {
      return stored as FontSize;
    }
  } catch (error) {
    console.warn('Failed to load font size from localStorage:', error);
  }
  return 'medium'; // Default fallback (FR-046, FR-048)
};
