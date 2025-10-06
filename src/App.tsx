import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import theme from './theme';
import router from './router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
