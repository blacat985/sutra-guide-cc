import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Center, Spinner } from '@chakra-ui/react';
import Layout from './components/layout/Layout';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const SutraPage = lazy(() => import('./pages/SutraPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const LoadingFallback = () => (
  <Center minH="400px">
    <Spinner size="xl" color="brand.500" />
  </Center>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ':sutraId',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SutraPage />
          </Suspense>
        ),
      },
      {
        path: ':sutraId/:chapterNum',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SutraPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

export default router;
