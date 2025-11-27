import { Box, Heading, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import FontSizeControl from './FontSizeControl';

export default function Header() {
  const bg = useColorModeValue('rgba(249, 245, 240, 0.85)', 'rgba(26, 22, 18, 0.85)');
  const borderColor = useColorModeValue('brand.200', 'brand.800');
  const textColor = useColorModeValue('brand.800', 'brand.100');

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bg}
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor={borderColor}
      transition="all 0.2s"
      py={4}
      px={8}
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Heading as="h1" fontSize="1.5em" fontFamily="heading" color={textColor} letterSpacing="wider">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            虛廣禪苑
          </Link>
        </Heading>
        <HStack spacing={4}>
          <FontSizeControl />
          <ThemeToggle />
        </HStack>
      </Flex>
    </Box>
  );
}
