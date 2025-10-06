import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';

describe('Error Reporting Link Integration Test (FR-029)', () => {
  it('should display error reporting link', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );

    const reportLink = await screen.findByRole('link', {
      name: /report error|回報錯誤|回報內容錯誤/i,
    });

    expect(reportLink).toBeInTheDocument();
  });

  it('should have clear labeling for error reporting', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );

    const reportLink = await screen.findByRole('link', {
      name: /report|回報/i,
    });

    expect(reportLink).toHaveAccessibleName();
    expect(reportLink.textContent).toMatch(/report|error|回報|錯誤/i);
  });

  it('should use mailto or external form for reporting', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );

    const reportLink = await screen.findByRole('link', { name: /report/i });
    const href = reportLink.getAttribute('href');

    // Should be either mailto: or https:// (external form)
    expect(href).toMatch(/^(mailto:|https?:\/\/)/);
  });

  it('should not require authentication for error reporting', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    );

    const reportLink = await screen.findByRole('link', { name: /report/i });

    // Link should be directly accessible (public)
    expect(reportLink).toBeVisible();
    expect(reportLink).not.toBeDisabled();
  });
});
