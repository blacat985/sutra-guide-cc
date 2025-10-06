import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveTheme, loadTheme } from '../../../src/services/themeStorage';

describe('Theme Storage Service', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should save theme preference to localStorage', () => {
    saveTheme('dark');
    expect(localStorage.getItem('chakra-ui-color-mode')).toBe('dark');
  });

  it('should load theme preference from localStorage', () => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
    const theme = loadTheme();
    expect(theme).toBe('dark');
  });

  it('should fall back to light mode if localStorage is empty', () => {
    const theme = loadTheme();
    expect(theme).toBe('light');
  });

  it('should fall back to light mode if localStorage is unavailable (FR-019)', () => {
    // Mock localStorage to throw error
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });

    const theme = loadTheme();
    expect(theme).toBe('light');

    getItemSpy.mockRestore();
  });

  it('should handle localStorage quota exceeded gracefully', () => {
    // Mock localStorage to throw quota exceeded error
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockImplementation(() => {
      throw new DOMException('QuotaExceededError');
    });

    // Should not throw error
    expect(() => saveTheme('dark')).not.toThrow();

    setItemSpy.mockRestore();
  });
});
