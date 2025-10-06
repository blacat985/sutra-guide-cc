import { ChakraProvider, Box } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import theme from './theme';
import router from './router';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Header />
          <Box flex="1">
            <RouterProvider router={router} />
          </Box>
          <Footer />
        </Box>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
