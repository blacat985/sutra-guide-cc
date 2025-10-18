import { Box, VStack, Link, Heading, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useSutraData } from '../../hooks/useSutraData';
import { useChapterTitles } from '../../hooks/useChapterTitles';
import { useMemo } from 'react';

interface TableOfContentsProps {
  sutraId: string;
  currentChapter: number;
  onNavigate?: () => void;
}

interface VolumeGroup {
  volume: number;
  volumeTitle: string;
  chapters: Array<{
    number: number;
    title: string;
  }>;
}

export default function TableOfContents({
  sutraId,
  currentChapter,
  onNavigate,
}: TableOfContentsProps) {
  const { sutra, loading } = useSutraData(sutraId);

  // Determine start chapter: use sutra.startChapter if provided, otherwise use 0 for diamond-sutra, 1 for others
  const startChapter = sutra?.startChapter ?? (sutraId === 'diamond-sutra' ? 0 : 1);

  const { titles, chapters, loading: titlesLoading } = useChapterTitles(
    sutraId,
    sutra?.chapters || 0,
    startChapter
  );

  // Group chapters by volume
  const volumeGroups = useMemo(() => {
    if (!chapters || chapters.length === 0) return [];

    // Check if any chapter has volume information
    const hasVolumeInfo = chapters.some(ch => ch.volume !== undefined);
    if (!hasVolumeInfo) return [];

    const groups = new Map<number, VolumeGroup>();

    chapters.forEach(chapter => {
      if (chapter.volume && chapter.volumeTitle) {
        if (!groups.has(chapter.volume)) {
          groups.set(chapter.volume, {
            volume: chapter.volume,
            volumeTitle: chapter.volumeTitle,
            chapters: [],
          });
        }
        groups.get(chapter.volume)!.chapters.push({
          number: chapter.number,
          title: chapter.title,
        });
      }
    });

    return Array.from(groups.values()).sort((a, b) => a.volume - b.volume);
  }, [chapters]);

  // Find which volume index contains the current chapter
  const defaultVolumeIndex = useMemo(() => {
    const index = volumeGroups.findIndex(group =>
      group.chapters.some(ch => ch.number === currentChapter)
    );
    return index >= 0 ? index : 0;
  }, [volumeGroups, currentChapter]);

  if (loading || titlesLoading || !sutra) {
    return (
      <Box as="nav" aria-label="Table of Contents" p={4}>
        <Text>Loading...</Text>
      </Box>
    );
  }

  // If no volume grouping, show simple list
  if (volumeGroups.length === 0) {
    const simpleChapters = Array.from({ length: sutra.chapters }, (_, i) => i + startChapter);

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
        fontSize="16px"
      >
        <VStack align="stretch" spacing={4}>
          <Heading as="h2" fontSize="1.3em" mb={2}>
            {sutra.title}
          </Heading>
          <VStack as="ul" align="stretch" spacing={2} listStyleType="none">
            {simpleChapters.map((num) => (
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
                  {titles.get(num) || (sutraId === 'samyukta-agama' ? `第${num}經` : `第 ${num} 章`)}
                </Link>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>
    );
  }

  // Render with volume grouping
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
      fontSize="16px"
      overflowY="auto"
      maxH="calc(100vh - 100px)"
    >
      <VStack align="stretch" spacing={4}>
        <Heading as="h2" fontSize="1.3em" mb={2}>
          {sutra.title}
        </Heading>

        <Accordion defaultIndex={[defaultVolumeIndex]} allowMultiple>
          {volumeGroups.map((group, groupIndex) => (
            <AccordionItem key={group.volume} border="none">
              <AccordionButton
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ bg: 'gray.100' }}
                _dark={{ _hover: { bg: 'gray.700' } }}
              >
                <Box flex="1" textAlign="left" fontWeight="semibold" fontSize="0.95em">
                  {group.volumeTitle}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2} px={0}>
                <VStack as="ul" align="stretch" spacing={1} listStyleType="none">
                  {group.chapters.map((chapter) => (
                    <Box
                      as="li"
                      key={chapter.number}
                      borderLeft={currentChapter === chapter.number ? '3px solid' : 'none'}
                      borderColor="brand.500"
                      pl={currentChapter === chapter.number ? 3 : 0}
                    >
                      <Link
                        as={RouterLink}
                        to={`/${sutraId}/${chapter.number}`}
                        onClick={onNavigate}
                        display="block"
                        p={2}
                        pl={3}
                        borderRadius="md"
                        fontSize="0.9em"
                        bg={currentChapter === chapter.number ? 'brand.50' : 'transparent'}
                        _hover={{ bg: 'gray.100' }}
                        aria-current={currentChapter === chapter.number ? 'page' : undefined}
                        fontWeight={currentChapter === chapter.number ? 'bold' : 'normal'}
                        color={currentChapter === chapter.number ? 'brand.700' : 'gray.700'}
                        _dark={{
                          bg: currentChapter === chapter.number ? 'brand.800' : 'transparent',
                          color: currentChapter === chapter.number ? 'brand.200' : 'gray.300',
                          _hover: { bg: 'gray.700' }
                        }}
                      >
                        {chapter.title || (sutraId === 'samyukta-agama' ? `第${chapter.number}經` : `第 ${chapter.number} 章`)}
                      </Link>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}
