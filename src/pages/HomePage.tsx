import { Container, Box, Heading, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { Leaf } from 'lucide-react';
import SutraList from '../components/sutra/SutraList';
import { useFontSize } from '../hooks/useFontSize';

export default function HomePage() {
  const bgGradient = useColorModeValue(
    'linear(to-b, stone.100, #FDFCF8)',
    'linear(to-b, stone.900, stone.900)'
  );
  const { fontSize } = useFontSize();

  const fontSizes = {
    small: { title: '4xl', subtitle: 'lg' },
    medium: { title: '5xl', subtitle: 'xl' },
    large: { title: '6xl', subtitle: '2xl' },
    'x-large': { title: '7xl', subtitle: '3xl' },
  };

  const currentFontSize = fontSizes[fontSize];

  return (
    <Box minH="100vh" bgGradient={bgGradient} pt={24}>
      {/* Hero Header */}
      <Box as="header" py={12} px={6} textAlign="center">
        <Box
          display="inline-flex"
          p={3}
          borderRadius="full"
          bg="stone.200"
          _dark={{ bg: 'stone.800' }}
          mb={4}
          opacity={0.8}
        >
          <Icon as={Leaf} boxSize={8} color="stone.600" _dark={{ color: 'stone.400' }} />
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: currentFontSize.title, md: currentFontSize.title }}
          fontFamily="heading"
          fontWeight="bold"
          color="stone.800"
          _dark={{ color: 'stone.100' }}
          mb={4}
          letterSpacing="wider"
        >
          禪悅
        </Heading>
        <Text
          color="stone.500"
          _dark={{ color: 'stone.400' }}
          maxW="lg"
          mx="auto"
          fontSize={currentFontSize.subtitle}
          lineHeight="relaxed"
        >
          在數位時代找回內心的平靜。<br />
          透過現代化的介面，重新領悟古老的智慧。
        </Text>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pb={20}>
        <SutraList />
      </Container>
    </Box>
  );
}
