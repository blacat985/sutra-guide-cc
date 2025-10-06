import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from '../../src/App';

describe('Navigation Integration Tests (FR-007, FR-008, FR-011)', () => {
  const renderApp = () => {
    return render(
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );
  };

  it('should navigate from homepage to sutra page and display TOC (FR-007)', async () => {
    const user = userEvent.setup();
    renderApp();

    // Find and click first sutra card
    const sutraCard = await screen.findByRole('link', {
      name: /view sutra|閱讀經文/i,
    });
    await user.click(sutraCard);

    // URL should change
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/^\/[a-z0-9-]+$/);
    });

    // TOC should display
    const toc = await screen.findByRole('navigation', { name: /table of contents|目錄/i });
    expect(toc).toBeInTheDocument();

    // Chapter 1 should be highlighted
    const chapter1Link = within(toc).getByRole('link', { name: /chapter 1|第一/i });
    expect(chapter1Link).toHaveAttribute('aria-current', 'page');
  });

  it('should navigate between chapters smoothly (FR-008, FR-011)', async () => {
    const user = userEvent.setup();
    renderApp();

    // Navigate to sutra page first
    const sutraLink = await screen.findByRole('link', { name: /view sutra/i });
    await user.click(sutraLink);

    // Wait for TOC to load
    const toc = await screen.findByRole('navigation');

    // Click Chapter 2
    const chapter2Link = within(toc).getByRole('link', { name: /chapter 2|第二/i });
    const startTime = performance.now();
    await user.click(chapter2Link);

    // URL should update
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/[a-z0-9-]+\/2$/);
    });

    const endTime = performance.now();
    const navigationTime = endTime - startTime;

    // Navigation should be < 500ms (FR-022)
    expect(navigationTime).toBeLessThan(500);

    // Chapter 2 content should display
    const chapterContent = await screen.findByRole('main');
    expect(chapterContent).toBeInTheDocument();

    // NO full page reload check - React state should persist
    expect(toc).toBeInTheDocument(); // TOC still exists
  });

  it('should support browser back/forward navigation', async () => {
    const user = userEvent.setup();
    renderApp();

    // Navigate to sutra
    const sutraLink = await screen.findByRole('link', { name: /view sutra/i });
    await user.click(sutraLink);

    // Navigate to chapter 2
    const chapter2Link = await screen.findByRole('link', { name: /chapter 2/i });
    await user.click(chapter2Link);

    // Go back
    window.history.back();
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/[a-z0-9-]+$/);
    });

    // Go forward
    window.history.forward();
    await waitFor(() => {
      expect(window.location.pathname).toMatch(/\/[a-z0-9-]+\/2$/);
    });
  });
});
