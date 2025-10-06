import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ChapterView from '../../src/components/sutra/ChapterView';

describe('External Podcast Link Integration Test (FR-012-FR-013)', () => {
  it('should open podcast link in new tab with security attributes', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <ChapterView sutraId="heart-sutra" chapterNum={1} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const podcastLink = await screen.findByRole('link', { name: /podcast/i });

    expect(podcastLink).toHaveAttribute('target', '_blank');
    expect(podcastLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display external link indicator', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <ChapterView sutraId="heart-sutra" chapterNum={1} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const podcastLink = await screen.findByRole('link', { name: /podcast/i });

    // Should have external icon or text indicator
    expect(podcastLink).toHaveTextContent(/external|外部|新視窗/i);
  });

  it('should hide link or show message if no podcast URL available', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <ChapterView sutraId="test-no-podcast" chapterNum={1} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const podcastLink = screen.queryByRole('link', { name: /podcast/i });

    if (!podcastLink) {
      // Should show "not available" message or hide section
      const message = await screen.findByText(/not available|暫無|尚未提供/i);
      expect(message).toBeInTheDocument();
    }
  });

  it('should display transcript below podcast link if available', async () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <ChapterView sutraId="heart-sutra" chapterNum={1} />
        </BrowserRouter>
      </ChakraProvider>
    );

    const transcript = await screen.findByRole('region', { name: /transcript/i });
    expect(transcript).toBeInTheDocument();

    // Transcript should be readable and formatted
    expect(transcript).toHaveTextContent(/./);
  });
});
