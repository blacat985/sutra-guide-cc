import { Box, Heading, Text, VStack, Icon, Flex, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import type { Sutra } from '../../types/sutra';
import { useFontSize } from '../../hooks/useFontSize';

interface SutraCardProps {
  sutra: Sutra;
}

// Map sutra IDs to theme color schemes
const getThemeColor = (id: string) => {
  switch (id) {
    case 'diamond-sutra':
      return 'amber';
    case 'heart-sutra':
      return 'emerald';
    case 'medicine-sutra':
      return 'cyan';
    case 'buddhist-anthology':
      return 'blue';
    default:
      return 'stone'; // Default for Samyukta Agama and others
  }
};

export default function SutraCard({ sutra }: SutraCardProps) {
  const themeColor = getThemeColor(sutra.id);
  const { fontSize } = useFontSize();

  const fontSizes = {
    small: { title: 'xl', description: 'sm' },
    medium: { title: '2xl', description: 'md' },
    large: { title: '3xl', description: 'lg' },
    'x-large': { title: '4xl', description: 'xl' },
  };

  const currentFontSize = fontSizes[fontSize];

  // Dynamic color values
  const bg = useColorModeValue(`${themeColor}.50`, `${themeColor}.900`);
  const borderColor = useColorModeValue(`${themeColor}.100`, `${themeColor}.800`);
  const accentColor = useColorModeValue(`${themeColor}.800`, `${themeColor}.200`);
  const hoverShadow = useColorModeValue('xl', 'dark-lg');

  // Determine default chapter
  const getDefaultChapter = () => {
    if (sutra.defaultChapter !== undefined) return sutra.defaultChapter;
    if (sutra.startChapter !== undefined) return sutra.startChapter;
    return sutra.id === 'diamond-sutra' ? 0 : 1;
  };

  return (
    <Box
      as={RouterLink}
      to={`/${sutra.id}/${getDefaultChapter()}`}
      display="block"
      position="relative"
      overflow="hidden"
      bg={bg}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="2xl"
      p={8}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: hoverShadow,
        borderColor: `${themeColor}.300`,
      }}
      role="group"
    >
      {/* Background Icon Decoration */}
      <Box
        position="absolute"
        top={0}
        right={0}
        p={4}
        opacity={0.1}
        color={accentColor}
        transition="opacity 0.3s"
        _groupHover={{ opacity: 0.2 }}
      >
        <Icon as={BookOpen} boxSize="120px" />
      </Box>

      <VStack align="start" spacing={6} position="relative" zIndex={1} height="100%">
        <Box>
          <Heading
            as="h2"
            fontSize={currentFontSize.title}
            fontFamily="heading"
            color={accentColor}
            mb={2}
          >
            {sutra.title}
          </Heading>
          {sutra.titleEn && (
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
              color="stone.500"
              _dark={{ color: 'stone.400' }}
            >
              {sutra.titleEn}
            </Text>
          )}
        </Box>

        {sutra.description && (
          <Text
            fontSize={currentFontSize.description}
            color="stone.600"
            _dark={{ color: 'stone.300' }}
            lineHeight="relaxed"
            noOfLines={4}
            flex={1}
          >
            {sutra.description}
          </Text>
        )}

        <Flex
          align="center"
          fontSize="sm"
          fontWeight="medium"
          color="stone.500"
          _groupHover={{ color: accentColor }}
          transition="color 0.2s"
          mt="auto"
        >
          開始閱讀
          <Icon as={ChevronRight} ml={1} boxSize={4} />
        </Flex>
      </VStack>
    </Box>
  );
}
