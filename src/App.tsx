import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { FontSizeProvider } from './contexts/FontSizeContext';
import theme from './theme';
import defaultRouter from './router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ router = defaultRouter }: { router?: any }) {
  return (
    <ChakraProvider theme={theme}>
      <FontSizeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </FontSizeProvider>
    </ChakraProvider>
  );
}

export default App;
