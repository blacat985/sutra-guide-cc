import { Box, Heading, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <Box as="header" bg="brand.500" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          虛廣禪苑
          </Link>
        </Heading>
        <ThemeToggle />
      </Flex>
    </Box>
  );
}
