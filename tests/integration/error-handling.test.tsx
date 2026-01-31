import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import SutraPage from '../../src/pages/SutraPage';

describe('Error Handling Integration Test (FR-027-FR-028)', () => {
  it('should display user-friendly error message for corrupted YAML', async () => {
    // Mock fetch to return invalid YAML
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      text: async () => 'invalid: yaml: {{{',
    } as Response);

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SutraPage />
        </BrowserRouter>
      </ChakraProvider>
    );

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/error loading|載入失敗|錯誤/i);
    expect(errorMessage).not.toHaveTextContent(/stack trace|undefined|null/i);
  });

  it('should keep TOC functional when chapter fails to load', async () => {
    const user = userEvent.setup();

    // Mock fetch to fail for chapter 2
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url) => {
      if (url.toString().includes('chapter-2')) {
        return {
          ok: true,
          text: async () => 'invalid yaml',
        } as Response;
      }
      return {
        ok: true,
        text: async () => 'valid: yaml',
      } as Response;
    });

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SutraPage />
        </BrowserRouter>
      </ChakraProvider>
    );

    const toc = await screen.findByRole('navigation');
    expect(toc).toBeInTheDocument();

    // Should be able to click other chapters
    const chapter1Link = within(toc).getByRole('link', { name: /chapter 1/i });
    await user.click(chapter1Link);

    // Should navigate successfully
    expect(window.location.pathname).toMatch(/\/1$/);
  });

  it('should not crash application on error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    // Trigger error
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SutraPage />
        </BrowserRouter>
      </ChakraProvider>
    );

    // App should still render
    await screen.findByRole('main');
    expect(document.body).toBeTruthy();

    consoleSpy.mockRestore();
  });

  it('should log error to console for debugging', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('YAML parse error'));

    render(
      <ChakraProvider>
        <BrowserRouter>
          <SutraPage />
        </BrowserRouter>
      </ChakraProvider>
    );

    await screen.findByRole('alert');

    // Error should be logged for developers
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
