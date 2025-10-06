import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import App from '../../src/App';

describe('Theme Toggle & Persistence Integration Test (FR-016-FR-019)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should toggle between light and dark mode', async () => {
    const user = userEvent.setup();
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    const themeToggle = await screen.findByRole('button', {
      name: /toggle theme|切換主題/i,
    });

    // Default should be light mode
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    // Click to dark mode
    await user.click(themeToggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    // Click back to light mode
    await user.click(themeToggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('should persist theme preference across page reloads', async () => {
    const user = userEvent.setup();
    const { unmount } = render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    const themeToggle = await screen.findByRole('button', {
      name: /toggle theme/i,
    });

    // Switch to dark mode
    await user.click(themeToggle);

    // Unmount and remount (simulate page reload)
    unmount();
    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    // Should still be dark mode
    await screen.findByRole('main');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('should fall back to light mode if localStorage unavailable', () => {
    // Mock localStorage failure
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('localStorage unavailable');
    });

    render(
      <ChakraProvider>
        <App />
      </ChakraProvider>
    );

    // Should default to light mode
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
