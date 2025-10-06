import { Box, Heading, Flex } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <Box as="header" bg="brand.500" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg">
          經典智慧
        </Heading>
        <ThemeToggle />
      </Flex>
    </Box>
  );
}
