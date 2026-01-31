import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SutraPage from '../../src/pages/SutraPage';

expect.extend(toHaveNoViolations);

describe('Chapter Content Display Integration Test (FR-003)', () => {
  const renderChapterView = () => {
    return render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/:sutraId/:chapterNum?" element={<SutraPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );
  };

  it('should display original text section', async () => {
    renderChapterView();
    const originalText = await screen.findByRole('region', {
      name: /original text|原文/i,
    });
    expect(originalText).toBeInTheDocument();
    expect(originalText).toHaveTextContent(/觀自在菩薩|金剛/); // Classical Chinese pattern
  });

  it('should display translation section', async () => {
    renderChapterView();
    const translation = await screen.findByRole('region', {
      name: /translation|白話翻譯/i,
    });
    expect(translation).toBeInTheDocument();
  });

  it('should display annotations with source attribution', async () => {
    renderChapterView();
    const annotations = await screen.findByRole('region', {
      name: /annotations|註解/i,
    });

    if (annotations) {
      // Each annotation should have source
      const sources = within(annotations).getAllByText(/source|來源|出處/i);
      expect(sources.length).toBeGreaterThan(0);
    }
  });

  it('should display illustrations with alt text', async () => {
    renderChapterView();
    const images = screen.queryAllByRole('img');

    for (const img of images) {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    }
  });

  it('should display podcast link if available', async () => {
    renderChapterView();
    const podcastLink = screen.queryByRole('link', { name: /podcast|播客/i });

    if (podcastLink) {
      expect(podcastLink).toHaveAttribute('target', '_blank');
      expect(podcastLink).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('should display podcast transcript if available', async () => {
    renderChapterView();
    const transcript = screen.queryByRole('region', {
      name: /transcript|文字稿/i,
    });

    if (transcript) {
      expect(transcript).toBeInTheDocument();
      // Transcript should preserve multi-paragraph format
      const paragraphs = within(transcript).getAllByText(/./);
      expect(paragraphs.length).toBeGreaterThan(0);
    }
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderChapterView();
    await screen.findByRole('main');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should meet color contrast requirements (4.5:1)', async () => {
    const { container } = renderChapterView();
    await screen.findByRole('main');

    // axe will check color contrast automatically
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
