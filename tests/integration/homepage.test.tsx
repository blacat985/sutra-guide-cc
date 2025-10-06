import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from '../../src/pages/HomePage';

describe('Homepage Integration Test (FR-006)', () => {
  const renderHomePage = () => {
    return render(
      <ChakraProvider>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </ChakraProvider>
    );
  };

  it('should load homepage successfully', async () => {
    renderHomePage();
    // Page should render without crashing
    expect(document.body).toBeTruthy();
  });

  it('should display sutra list', async () => {
    renderHomePage();
    // Should have a container for sutra list
    const sutraListContainer = await screen.findByRole('main', {
      name: /sutra list|sutras/i,
    });
    expect(sutraListContainer).toBeInTheDocument();
  });

  it('should display 1-3 sutras with metadata', async () => {
    renderHomePage();

    // Should display sutra cards
    const sutraCards = await screen.findAllByRole('article');
    expect(sutraCards.length).toBeGreaterThanOrEqual(1);
    expect(sutraCards.length).toBeLessThanOrEqual(3);

    // Each card should have required metadata
    for (const card of sutraCards) {
      expect(card).toHaveTextContent(/般若|金剛|六祖/); // Chinese title pattern
      expect(card).toHaveTextContent(/Mahayana|Theravada|Vajrayana/); // Tradition
    }
  });

  it('should have no console errors', async () => {
    const consoleSpy = vi.spyOn(console, 'error');
    renderHomePage();
    await screen.findByRole('main');

    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
