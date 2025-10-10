import { Box, VStack, Link, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useSutraData } from '../../hooks/useSutraData';
import { useChapterTitles } from '../../hooks/useChapterTitles';

interface TableOfContentsProps {
  sutraId: string;
  currentChapter: number;
  onNavigate?: () => void;
}

export default function TableOfContents({
  sutraId,
  currentChapter,
  onNavigate,
}: TableOfContentsProps) {
  const { sutra, loading } = useSutraData(sutraId);
  const startChapter = sutraId === 'diamond-sutra' ? 0 : 1;
  const { titles, loading: titlesLoading } = useChapterTitles(
    sutraId,
    sutra?.chapters || 0,
    startChapter
  );

  if (loading || titlesLoading || !sutra) {
    return (
      <Box as="nav" aria-label="Table of Contents" p={4}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  // Generate chapter list
  const chapters = Array.from({ length: sutra.chapters + (startChapter === 0 ? 1 : 0) }, (_, i) => i + startChapter);

  return (
    <Box
      as="nav"
      aria-label="Table of Contents"
      p={6}
      borderRight="1px"
      borderColor="gray.200"
      minH="calc(100vh - 200px)"
      position="sticky"
      top={0}
    >
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" size="md" mb={2}>
          {sutra.title}
        </Heading>
        <VStack as="ul" align="stretch" spacing={2} listStyleType="none">
          {chapters.map((num) => (
            <Box
              as="li"
              key={num}
              borderLeft={currentChapter === num ? '3px solid' : 'none'}
              borderColor="brand.500"
              pl={currentChapter === num ? 3 : 0}
            >
              <Link
                as={RouterLink}
                to={`/${sutraId}/${num}`}
                onClick={onNavigate}
                display="block"
                p={2}
                borderRadius="md"
                bg={currentChapter === num ? 'brand.50' : 'transparent'}
                _hover={{ bg: 'gray.100' }}
                aria-current={currentChapter === num ? 'page' : undefined}
                fontWeight={currentChapter === num ? 'bold' : 'normal'}
                color={currentChapter === num ? 'brand.700' : 'gray.700'}
                _dark={{
                  bg: currentChapter === num ? 'brand.800' : 'transparent',
                  color: currentChapter === num ? 'brand.200' : 'gray.300',
                  _hover: { bg: 'gray.700' }
                }}
              >
                {titles.get(num) || `第 ${num} 章`}
              </Link>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
