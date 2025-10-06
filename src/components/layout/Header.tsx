import { Box, Heading, Flex, Link } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <Box as="header" bg="brand.500" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          <Link href="/" _hover={{ textDecoration: 'none' }} color="inherit">
            經典智慧
          </Link>
        </Heading>
        <ThemeToggle />
      </Flex>
    </Box>
  );
}
