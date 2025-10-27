import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  Link,
  Divider,
  Spinner,
  Center,
  ListItem,
  OrderedList,
  UnorderedList,
  Code,
  Collapse,
  Button,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useChapterData } from '../../hooks/useChapterData';
import { checkChapterExists } from '../../services/yamlParser';
import { useSutraData } from '../../hooks/useSutraData';
import ErrorMessage from '../common/ErrorMessage';
import VideoPlayer from '../media/VideoPlayer';
import AudioPlayer from '../media/AudioPlayer';

interface ChapterViewProps {
  sutraId: string;
  chapterNum: number;
  onMenuClick?: () => void;
}

const markdownComponents: Components = {
  h1: ({ children }) => <Heading as="h1" fontSize="1.5em" mt={5} mb={3} color="brand.600">{children}</Heading>,
  h2: ({ children }) => <Heading as="h2" fontSize="1.3em" mt={4} mb={2} color="brand.600">{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" fontSize="1.15em" mt={3} mb={2} color="brand.600">{children}</Heading>,
  h4: ({ children }) => <Heading as="h4" fontSize="1em" fontWeight="semibold" mt={2} mb={1}>{children}</Heading>,
  p: ({ children }) => <Text mb={4} lineHeight="tall">{children}</Text>,
  ul: ({ children }) => <UnorderedList mb={4} spacing={2}>{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList mb={4} spacing={2}>{children}</OrderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  code: ({ children }) => <Code>{children}</Code>,
  strong: ({ children }) => <Text as="strong" fontWeight="bold">{children}</Text>,
  // Handle line breaks: convert single newlines to double newlines for proper paragraph spacing
  br: () => <Box h="1em" />,
};

// Helper function to normalize markdown text: convert single newlines to double newlines
// Compatible with older Safari browsers (no lookbehind/lookahead regex)
const normalizeMarkdown = (text: string): string => {
  // Split by newlines and process each line
  const lines = text.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);

    // Add extra newline between non-empty lines
    // (converting single newlines to double newlines)
    if (i < lines.length - 1 && lines[i].trim() !== '' && lines[i + 1].trim() !== '') {
      result.push('');
    }
  }

  return result.join('\n');
};

export default function ChapterView({ sutraId, chapterNum, onMenuClick }: ChapterViewProps) {
  const { chapter, loading, error } = useChapterData(sutraId, chapterNum);
  const { sutra } = useSutraData(sutraId);
  const navigate = useNavigate();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isTeachingOpen, setIsTeachingOpen] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Record<number, boolean>>({});
  const baseUrl = import.meta.env.BASE_URL;

  const toggleExplanation = (index: number) => {
    setOpenExplanations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Calculate chapter range
  const startChapter = sutra?.startChapter ?? 1;
  const totalChapters = sutra?.chapters ?? 0;
  const lastChapter = startChapter + totalChapters - 1;

  const hasPrevChapter = chapterNum > startChapter;
  const hasNextChapter = chapterNum < lastChapter;

  // Find next valid chapter by checking if files exist
  const findNextValidChapter = async (
    direction: 'next' | 'prev',
    maxAttempts: number = 5
  ): Promise<number | null> => {
    const step = direction === 'next' ? 1 : -1;
    let targetChapter = chapterNum + step;
    
    for (let i = 0; i < maxAttempts; i++) {
      // Check boundary
      if (targetChapter < startChapter || targetChapter > lastChapter) {
        return null;
      }
      
      // Check if chapter file exists
      const exists = await checkChapterExists(sutraId, targetChapter);
      if (exists) {
        return targetChapter;
      }
      
      // Continue searching
      targetChapter += step;
    }
    
    return null;
  };

  const goToPrevChapter = async () => {
    if (!hasPrevChapter) return;
    
    const prevChapter = await findNextValidChapter('prev');
    if (prevChapter) {
      navigate(`/${sutraId}/${prevChapter}`);
    }
  };

  const goToNextChapter = async () => {
    if (!hasNextChapter) return;
    
    const nextChapter = await findNextValidChapter('next');
    if (nextChapter) {
      navigate(`/${sutraId}/${nextChapter}`);
    }
  };

  if (loading) {
    return (
      <Center minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (error) {
    return <ErrorMessage 
      message={error.message}
      chapterNum={chapterNum}
      chapterTitle={chapter?.title}
      hasPrevChapter={hasPrevChapter}
      hasNextChapter={hasNextChapter}
      onPrevChapter={goToPrevChapter}
      onNextChapter={goToNextChapter}
      onMenuClick={onMenuClick}
    />;
  }

  if (!chapter) {
    return <ErrorMessage 
      message="Chapter not found"
      chapterNum={chapterNum}
      hasPrevChapter={hasPrevChapter}
      hasNextChapter={hasNextChapter}
      onPrevChapter={goToPrevChapter}
      onNextChapter={goToNextChapter}
      onMenuClick={onMenuClick}
    />;
  }

  // Extract teaching content from transcript
  // Compatible with older Safari browsers (no lookahead regex)
  const extractTeaching = (transcript: string): string => {
    const startMarker = '### 弘源法師開示';
    const startIdx = transcript.indexOf(startMarker);

    if (startIdx === -1) return '';

    // Find the next heading (### or ##) after the start marker
    const afterStart = transcript.slice(startIdx + startMarker.length);
    const lines = afterStart.split('\n');
    let endIdx = afterStart.length;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('### ') || line.startsWith('## ')) {
        // Calculate position up to (but not including) this line
        endIdx = lines.slice(0, i).join('\n').length;
        break;
      }
    }

    return startMarker + afterStart.slice(0, endIdx);
  };

  return (
    <Box as="main" role="main" p={8} maxW="800px" mx="auto">
      <VStack align="stretch" spacing={8}>
        {/* Chapter Navigation */}
        <HStack justify="space-between" w="full">
          <HStack spacing={2}>
            {/* Menu button - mobile only */}
            {onMenuClick && (
              <IconButton
                aria-label="開啟章節選單"
                icon={<HamburgerIcon />}
                onClick={onMenuClick}
                variant="ghost"
                display={{ base: 'flex', md: 'none' }}
              />
            )}
            <IconButton
              aria-label="上一章"
              icon={<ChevronLeftIcon />}
              onClick={goToPrevChapter}
              isDisabled={!hasPrevChapter}
              variant="outline"
              colorScheme="brand"
              fontSize="inherit"
            />
          </HStack>
          <Text color="gray.600" _dark={{ color: "gray.400" }}>
            {chapter.title}
          </Text>
          <IconButton
            aria-label="下一章"
            icon={<ChevronRightIcon />}
            onClick={goToNextChapter}
            isDisabled={!hasNextChapter}
            variant="outline"
            colorScheme="brand"
            fontSize="inherit"
          />
        </HStack>

        {/* Chapter Title */}
        <Heading as="h1" fontSize="2em" textAlign="center">
          {chapter.title}
        </Heading>

        {/* Illustrations */}
        {chapter.illustrations && chapter.illustrations.length > 0 && (
          <>
            <Box as="section" role="region" aria-label="Illustrations">
              <VStack align="stretch" spacing={4}>
                {chapter.illustrations.map((illustration, index) => (
                  <Box key={index}>
                    <Image
                      src={`${baseUrl}${illustration.url.replace(/^\//, '')}`}
                      alt={illustration.alt}
                      borderRadius="md"
                      maxW="full"
                      loading="lazy"
                      decoding="async"
                      fallback={<Center minH="200px"><Spinner /></Center>}
                    />
                    {illustration.caption && (
                      <Text color="gray.600" _dark={{ color: "gray.400" }} mt={2} textAlign="center">
                        {illustration.caption}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
            <Divider />
          </>
        )}

        {/* Podcast Link */}
        {chapter.podcastUrl && (
          <Box as="section">
            <Link
              href={chapter.podcastUrl}
              isExternal
              color="brand.600"
              fontWeight="bold"
            >
              {chapter.podcastTitle ? (
                <>
                  📻 Podcast｜{chapter.podcastTitle} <ExternalLinkIcon mx="2px" />
                </>
              ) : (
                <>
                  📻 收聽 Podcast <ExternalLinkIcon mx="2px" />
                </>
              )}
            </Link>
          </Box>
        )}

        {/* Video Player */}
        {chapter.videoUrl && (
          <>
            <VideoPlayer url={chapter.videoUrl} title={chapter.videoTitle} />
            <Divider />
          </>
        )}

        {/* Audio Player */}
        {chapter.audioUrl && (
          <>
            <AudioPlayer url={chapter.audioUrl} title={chapter.audioTitle} />
            <Divider />
          </>
        )}

        {/* Podcast Transcript */}
        {chapter.transcript && (
          <>
            <Box as="section" role="region" aria-label="Transcript">
              <Button
                onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                variant="ghost"
                colorScheme="brand"
                fontSize="inherit"
                rightIcon={isTranscriptOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                mb={3}
              >
                Podcast 文字稿
              </Button>
              <Collapse in={isTranscriptOpen} animateOpacity>
                <Box
            p={6}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.300"
            _dark={{ borderColor: "gray.500" }}
          >
            <Box lineHeight="tall">
              <ReactMarkdown components={markdownComponents}>
                {normalizeMarkdown(chapter.transcript)}
                    </ReactMarkdown>
                  </Box>
                </Box>
              </Collapse>
            </Box>

            {/* Extract 弘源法師開示 if exists */}
            {chapter.transcript.includes('弘源法師') && (
              <Box as="section" role="region" aria-label="Teaching">
                <Button
                  onClick={() => setIsTeachingOpen(!isTeachingOpen)}
                  variant="ghost"
                  colorScheme="brand"
                  fontSize="inherit"
                  rightIcon={isTeachingOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  mb={3}
                >
                  弘源法師開示
                </Button>
                <Collapse in={isTeachingOpen} animateOpacity>
            <Box
              p={4}
              borderRadius="md"
              bg="orange.50"
              borderWidth="1px"
              borderColor="gray.300"
              _dark={{ borderColor: "gray.500", bg: "gray.700" }}
            >
                    <Box lineHeight="tall">
                      <ReactMarkdown components={markdownComponents}>
                        {normalizeMarkdown(extractTeaching(chapter.transcript))}
                      </ReactMarkdown>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            )}

            <Divider />
          </>
        )}

        {/* Original Text */}
        <Box
          as="section"
          role="region"
          aria-label="Original Text"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.300"
          _dark={{ borderColor: "gray.500" }}
        >
          <Heading as="h2" fontSize="1.5em" mb={4} color="brand.600" _dark={{ color: "brand.200" }}>
            原文
          </Heading>
          <Text 
            lineHeight="2" 
            whiteSpace="pre-line"
            color="gray.800"
            _dark={{ color: "whiteAlpha.900" }}
            sx={{
              '& > *:not(:last-child)': {
                marginBottom: '1em'
              }
            }}
          >
            {chapter.originalText}
          </Text>
        </Box>

        {/* Translation */}
        {chapter.translation && !chapter.detailedExplanation && (
          <>
            <Divider />
            <Box as="section" role="region" aria-label="Translation">
              <Heading as="h2" fontSize="1.5em" mb={4} color="brand.600">
                白話翻譯
              </Heading>
              <Text lineHeight="tall" whiteSpace="pre-line">
                {chapter.translation}
              </Text>
            </Box>
          </>
        )}

        {/* Detailed Explanation */}
        {chapter.detailedExplanation && chapter.detailedExplanation.length > 0 && (
          <>
            <Divider />
            <Box as="section" role="region" aria-label="Detailed Explanation">
              <Heading as="h2" fontSize="1.5em" mb={6} color="brand.600">
                逐段解釋
              </Heading>
              <VStack align="stretch" spacing={10}>
              {chapter.detailedExplanation.map((item, index) => (
                <Box key={index} p={5} borderRadius="md" shadow="sm" borderWidth="1px">
                  <Heading as="h3" fontSize="1.3em" mb={4} color="brand.600">
                    原文段落 {index + 1}
                  </Heading>
                  <Text lineHeight="tall" whiteSpace="pre-line" fontStyle="italic" color="gray.600" _dark={{ color: "gray.300" }} mb={6}>
                    {item.original}
                  </Text>

                  <Divider mb={4} />

                  <Heading as="h4" fontSize="1.1em" mb={3} color="brand.800" _dark={{ color: "brand.200" }}>
                    {item.commentaryTranslation ? '註解白話翻譯' : '白話翻譯'}
                  </Heading>
                  <Box mb={4}>
                    <ReactMarkdown components={markdownComponents}>
                      {normalizeMarkdown(item.commentaryTranslation || item.translation || '')}
                    </ReactMarkdown>
                  </Box>

                  {item.commentary && (
                    <>
                      <Button
                        onClick={() => toggleExplanation(index)}
                        variant="ghost"
                        colorScheme="brand"
                        fontSize="inherit"
                        rightIcon={openExplanations[index] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        mb={3}
                      >
                        六祖慧能註解原文
                      </Button>
                      
                      <Collapse in={openExplanations[index]} animateOpacity>
                        <Box
                          p={4}
                          borderRadius="md"
                          bg="gray.50"
                          _dark={{ bg: "gray.700" }}
                        >
                          <Text lineHeight="tall" whiteSpace="pre-line" color="gray.600" _dark={{ color: "gray.300" }}>
                            {item.commentary}
                          </Text>
                        </Box>
                      </Collapse>
                    </>
                  )}
                </Box>
              ))}
              </VStack>
            </Box>
          </>
        )}

        {/* Annotations */}

        {/* Practice Insights */}
        {chapter.practiceInsights && (
          <>
            <Divider />
            <Box 
              as="section" 
              role="region" 
              aria-label="Practice Insights"
              p={6}
              borderRadius="md"
              bg="brand.50"
              shadow="sm"
              borderWidth="1px"
              borderColor="gray.300"
              _dark={{ borderColor: "gray.500", bg: "gray.700" }}
            >
              <Heading as="h2" fontSize="1.5em" mb={4} color="brand.600">
                修行心得
              </Heading>
              <Box lineHeight="tall">
                <ReactMarkdown components={markdownComponents}>
                  {normalizeMarkdown(chapter.practiceInsights)}
                </ReactMarkdown>
              </Box>
            </Box>
          </>
        )}

        {/* Source Attribution */}
        {chapter.sourceAttribution && (
          <>
            <Divider />
            <Text color="gray.500" textAlign="center">
              來源：{chapter.sourceAttribution}
            </Text>
          </>
        )}

        {/* Bottom Chapter Navigation */}
        <Divider />
        <HStack justify="space-between" w="full">
          <Button
            leftIcon={<ChevronLeftIcon />}
            onClick={goToPrevChapter}
            isDisabled={!hasPrevChapter}
            variant="outline"
            colorScheme="brand"
            fontSize="inherit"
          >
            上一章
          </Button>
          <Button
            rightIcon={<ChevronRightIcon />}
            onClick={goToNextChapter}
            isDisabled={!hasNextChapter}
            variant="outline"
            colorScheme="brand"
            fontSize="inherit"
          >
            下一章
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
