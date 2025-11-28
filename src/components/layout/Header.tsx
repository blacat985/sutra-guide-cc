import { Box, Heading, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import FontSizeControl from './FontSizeControl';

export default function Header() {
  const bg = useColorModeValue('rgba(253, 252, 248, 0.8)', 'rgba(28, 25, 23, 0.8)');
  const borderColor = useColorModeValue('stone.200', 'stone.800');

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bg}
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      py={3}
      px={6}
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Heading as="h1" fontSize="1.25em" fontFamily="heading" letterSpacing="widest">
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
