import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useFontSize } from '../../hooks/useFontSize';
import { FONT_SIZE_MAP } from '../../types/fontSize';

export default function Layout() {
  const { fontSize } = useFontSize();

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      style={{
        fontSize: FONT_SIZE_MAP[fontSize],
      }}
    >
      <Header />
      <Box flex="1" position="relative">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
