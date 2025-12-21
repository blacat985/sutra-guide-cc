import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import Layout from '../../src/components/layout/Layout';
import SutraList from '../../src/components/sutra/SutraList';
import SutraPage from '../../src/pages/SutraPage';

// Mock the data fetching hook
vi.mock('../../src/hooks/useSutraData', () => ({
  useAllSutras: () => ({
    sutras: [
      {
        id: 'diamond-sutra',
        title: 'Diamond Sutra',
        title_zh: '金剛經',
        description: 'The Diamond Sutra...',
      },
      {
        id: 'samyukta-agama',
        title: 'Samyukta Agama',
        title_zh: '雜阿含經',
        description: 'The Samyukta Agama...',
      }
    ],
    loading: false,
    error: null,
  }),
  useSutraData: () => ({
    sutra: {
      id: 'diamond-sutra',
      title: 'Diamond Sutra',
      title_zh: '金剛經',
      chapters: [
        { id: 1, title: 'Chapter 1' },
        { id: 2, title: 'Chapter 2' }
      ]
    },
    loading: false,
    error: null,
  }),
  useFontSize: () => ({
    fontSize: 'medium',
    setFontSize: vi.fn(),
  }),
}));

// Mock useChapterTitles
vi.mock('../../src/hooks/useChapterTitles', () => ({
  useChapterTitles: () => ({
    titles: new Map([[1, 'Chapter 1'], [2, 'Chapter 2']]),
    chapters: [
      { number: 1, title: 'Chapter 1' },
      { number: 2, title: 'Chapter 2' }
    ],
    loading: false,
    error: null,
  }),
}));

const testRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <SutraList />,
      },
      {
        path: ':sutraId',
        element: <SutraPage />,
      },
      {
        path: ':sutraId/:chapterNum',
        element: <SutraPage />,
      },
    ],
  },
];

describe('Navigation Integration Tests (FR-007, FR-008, FR-011)', () => {
  const renderApp = () => {
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ['/'],
    });
    return render(<App router={router} />);
  };

  it('should navigate from homepage to sutra page and display TOC (FR-007)', async () => {
    const user = userEvent.setup();
    renderApp();

    // Find and click first sutra card
    const sutraCard = await screen.findByRole('link', {
      name: /view sutra|閱讀經文/i,
    }, { timeout: 5000 });
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
    const sutraLink = await screen.findByRole('link', {
      name: /view sutra/i
    }, { timeout: 3000 });
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
    const sutraLink = await screen.findByRole('link', {
      name: /view sutra|閱讀經文/i,
    }, { timeout: 3000 });
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
