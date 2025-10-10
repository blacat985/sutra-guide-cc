import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { FontSizeProvider } from './contexts/FontSizeContext';
import theme from './theme';
import router from './router';

function App() {
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
