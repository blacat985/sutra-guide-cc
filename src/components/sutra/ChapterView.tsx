import {
  Box,
  VStack,
  Heading,
  Text,
  Spinner,
  Center,
  Image,
  Collapse,
  Button,
  HStack,
  Container,
  useColorModeValue,
  Icon,
  Flex,
  IconButton,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
  Divider,
  Link,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heart, Sun, BookOpen, MessageCircle, ExternalLink, List } from 'lucide-react';
import PdfSlidePlayer from '../media/PdfSlidePlayer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { useChapterData } from '../../hooks/useChapterData';
import { checkChapterExists } from '../../services/yamlParser';
import { useSutraData } from '../../hooks/useSutraData';
import ErrorMessage from '../common/ErrorMessage';
import VideoPlayer from '../media/VideoPlayer';
import AudioPlayer from '../media/AudioPlayer';
import { ConstructionPlaceholder } from '../common/ConstructionPlaceholder';
import { useFontSize } from '../../hooks/useFontSize';

interface ChapterViewProps {
  sutraId: string;
  chapterNum: number;
  onMenuClick?: () => void;
}

const markdownComponents: Components = {
  h1: ({ children }) => <Heading as="h1" fontSize="1.5em" mt={5} mb={3} fontFamily="heading" color="amber.700">{children}</Heading>,
  h2: ({ children }) => <Heading as="h2" fontSize="1.3em" mt={4} mb={2} fontFamily="heading" color="amber.700">{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" fontSize="1.15em" mt={3} mb={2} fontFamily="heading" color="amber.600">{children}</Heading>,
  h4: ({ children }) => <Heading as="h4" fontSize="1em" fontWeight="semibold" mt={2} mb={1}>{children}</Heading>,
  p: ({ children }) => <Text mb={4} lineHeight="tall">{children}</Text>,
  ul: ({ children }) => <UnorderedList mb={4} spacing={2}>{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList mb={4} spacing={2}>{children}</OrderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  code: ({ children }) => <Code>{children}</Code>,
  strong: ({ children }) => <Text as="strong" fontWeight="bold">{children}</Text>,
  br: () => <Box h="1em" />,
};

const normalizeMarkdown = (text: string): string => {
  const lines = text.split('\n');
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);
    if (i < lines.length - 1 && lines[i].trim() !== '' && lines[i + 1].trim() !== '') {
      result.push('');
    }
  }
  return result.join('\n');
};

export default function ChapterView({ sutraId, chapterNum, onMenuClick }: ChapterViewProps) {
  const { chapter, loading: chapterLoading, error } = useChapterData(sutraId, chapterNum);
  const { sutra, loading: sutraLoading } = useSutraData(sutraId);
  const { fontSize } = useFontSize();
  const navigate = useNavigate();
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isTeachingOpen, setIsTeachingOpen] = useState(false);
  const [openExplanations, setOpenExplanations] = useState<Record<number, boolean>>({});
  const baseUrl = import.meta.env.BASE_URL;

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sutraId, chapterNum]);

  // Theme colors
  const heroBg = useColorModeValue('stone.100', 'stone.900');
  const contentBg = useColorModeValue('white', 'stone.800');
  const translationBg = useColorModeValue('stone.50', 'stone.900');


  // Font size mapping
  const fontSizes = {
    small: { original: 'lg', translation: 'md', explanation: 'md', title: '2xl' },
    medium: { original: 'xl', translation: 'lg', explanation: 'lg', title: '3xl' },
    large: { original: '2xl', translation: 'xl', explanation: 'xl', title: '4xl' },
    'x-large': { original: '3xl', translation: '2xl', explanation: '2xl', title: '5xl' },
  };

  const currentFontSize = fontSizes[fontSize];

  const toggleExplanation = (index: number) => {
    setOpenExplanations(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const startChapter = sutra?.startChapter ?? 1;
  const totalChapters = sutra?.chapters ?? 0;
  const lastChapter = startChapter + totalChapters - 1;

  // Only enable navigation if sutra data is loaded
  const hasPrevChapter = sutra ? chapterNum > startChapter : false;
  const hasNextChapter = sutra ? chapterNum < lastChapter : false;

  const findNextValidChapter = async (direction: 'next' | 'prev', maxAttempts: number = 5): Promise<number | null> => {
    const step = direction === 'next' ? 1 : -1;
    let targetChapter = chapterNum + step;
    for (let i = 0; i < maxAttempts; i++) {
      if (targetChapter < startChapter || targetChapter > lastChapter) return null;
      const exists = await checkChapterExists(sutraId, targetChapter);
      if (exists) return targetChapter;
      targetChapter += step;
    }
    return null;
  };

  const goToPrevChapter = async () => {
    if (!hasPrevChapter) return;
    const prevChapter = await findNextValidChapter('prev');
    if (prevChapter !== null) {
      navigate(`/${sutraId}/${prevChapter}`);
    } else if (chapterNum - 1 >= startChapter) {
      // Fallback: if check fails but logically valid, try navigating anyway
      navigate(`/${sutraId}/${chapterNum - 1}`);
    }
  };

  const goToNextChapter = async () => {
    if (!hasNextChapter) return;
    const nextChapter = await findNextValidChapter('next');
    if (nextChapter !== null) {
      navigate(`/${sutraId}/${nextChapter}`);
    } else if (chapterNum + 1 <= lastChapter) {
      navigate(`/${sutraId}/${chapterNum + 1}`);
    }
  };

  const extractTeaching = (transcript: string): string => {
    const startMarker = '### 弘源法師開示';
    const startIdx = transcript.indexOf(startMarker);
    if (startIdx === -1) return '';
    const afterStart = transcript.slice(startIdx + startMarker.length);
    const lines = afterStart.split('\n');
    let endIdx = afterStart.length;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('### ') || line.startsWith('## ')) {
        endIdx = lines.slice(0, i).join('\n').length;
        break;
      }
    }
    // Remove blockquote markers for cleaner rendering if needed, 
    // but react-markdown handles them. We'll just return the content.
    return startMarker + afterStart.slice(0, endIdx);
  };

  if (chapterLoading || sutraLoading) return <Center minH="400px"><Spinner size="xl" color="amber.500" /></Center>;

  // If we have a critical error (like network failure) and NO chapter data, show error
  if (error && !chapter) return <ErrorMessage message={error.message} />;

  // If no chapter data at all, show not found
  if (!chapter) return <ErrorMessage message="Chapter not found" />;

  // Check if content is effectively empty or a placeholder
  const hasValidOriginalText = chapter.originalText && !chapter.originalText.includes('[待填入') && chapter.originalText.trim() !== '';
  const hasDetailedExplanation = chapter.detailedExplanation && chapter.detailedExplanation.length > 0;
  const hasTranslation = chapter.translation && chapter.translation.trim() !== '';

  const isUnderConstruction = !hasValidOriginalText && !hasDetailedExplanation && !hasTranslation;

  const heroImage = chapter.illustrations?.[0];
  const hasMedia = Boolean(chapter.podcastUrl || chapter.videoUrl || chapter.audioUrl || chapter.transcript);

  return (
    <Box as="main" role="main" pb={20}>
      {/* Hero Section */}
      <Box
        position="relative"
        w="full"
        h={heroImage ? { base: "65vh", md: "75vh" } : "30vh"}
        bg={heroBg}
        mt="-80px" // Go under fixed header
        pt="80px"
        overflow="hidden"
      >
        {heroImage ? (
          <>
            {/* Background Layer (Blurred) */}
            <Image
              src={`${baseUrl}${heroImage.url.replace(/^\//, '')}`}
              alt={heroImage.alt}
              objectFit="cover"
              w="full"
              h="full"
              filter="blur(20px) brightness(0.6)"
              transform="scale(1.1)" // Scale up slightly to avoid blur edges
            />
            {/* Foreground Layer (Contained) */}
            <Box
              position="absolute"
              top="80px" // Start below the header
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
              <Image
                src={`${baseUrl}${heroImage.url.replace(/^\//, '')}`}
                alt={heroImage.alt}
                objectFit="contain"
                maxH="100%"
                maxW="100%"
                shadow="2xl"
                borderRadius="md"
              />
            </Box>
          </>
        ) : (
          <Center h="full" bgGradient="linear(to-b, stone.200, stone.50)">
            <Icon as={BookOpen} boxSize={20} color="stone.300" />
          </Center>
        )}

        {/* Gradient Overlay for Text Readability */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="150px"
          bgGradient="linear(to-t, stone.50, transparent)"
          _dark={{ bgGradient: "linear(to-t, stone.900, transparent)" }}
        />
      </Box>

      <Container maxW="container.lg" mt={-10} position="relative" zIndex={1}>
        <VStack align="stretch" spacing={12}>

          {/* Title Section */}
          <Box textAlign="center" mb={8}>
            <Flex justify="center" align="center" gap={4} mb={2}>
              <IconButton
                aria-label="Previous Chapter"
                icon={<ChevronLeftIcon />}
                onClick={goToPrevChapter}
                isDisabled={!hasPrevChapter}
                variant="ghost"
                size="sm"
                color="stone.400"
                _hover={{ bg: 'stone.100', color: 'stone.600' }}
              />
              <Flex align="center" gap={2}>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  letterSpacing="widest"
                  color="stone.500"
                  textTransform="uppercase"
                >
                  Chapter {chapterNum}
                </Text>
                {onMenuClick && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onMenuClick}
                    leftIcon={<Icon as={List} />}
                    color="stone.500"
                    borderColor="stone.300"
                    _hover={{ bg: 'stone.100' }}
                  >
                    目錄
                  </Button>
                )}
              </Flex>
              <IconButton
                aria-label="Next Chapter"
                icon={<ChevronRightIcon />}
                onClick={goToNextChapter}
                isDisabled={!hasNextChapter}
                variant="ghost"
                size="sm"
                color="stone.400"
                _hover={{ bg: 'stone.100', color: 'stone.600' }}
              />
            </Flex>
            <Heading
              as="h1"
              fontSize={{ base: currentFontSize.title, md: currentFontSize.title }}
              fontFamily="heading"
              color="stone.800"
              _dark={{ color: "stone.100" }}
              lineHeight="tight"
            >
              {chapter.title}
            </Heading>
          </Box>

          {isUnderConstruction ? (
            <ConstructionPlaceholder />
          ) : (
            <>
              {/* Media Section */}
              {hasMedia && (
                <Box mb={12}>
                  <VStack spacing={6} align="stretch">
                    {/* Podcast Link */}
                    {chapter.podcastUrl && (
                      <Link
                        href={chapter.podcastUrl}
                        isExternal
                        color="amber.600"
                        fontWeight="bold"
                        display="inline-flex"
                        alignItems="center"
                        _hover={{ textDecoration: 'none', color: 'amber.700' }}
                      >
                        {chapter.podcastTitle ? (
                          <>
                            📻 Podcast｜{chapter.podcastTitle} <Icon as={ExternalLink} ml={2} boxSize={4} />
                          </>
                        ) : (
                          <>
                            📻 收聽 Podcast <Icon as={ExternalLink} ml={2} boxSize={4} />
                          </>
                        )}
                      </Link>
                    )}




                    {/* Video Player */}
                    {chapter.videoUrl && (
                      <Box
                        borderRadius="2xl"
                        overflow="hidden"
                        shadow="lg"
                        bg="black"
                        borderWidth="1px"
                        borderColor="stone.200"
                        _dark={{ borderColor: "stone.700" }}
                      >
                        <VideoPlayer url={chapter.videoUrl} title={chapter.videoTitle || chapter.title} />
                      </Box>
                    )}

                    {/* Audio Player */}
                    {chapter.audioUrl && (
                      <Box
                        p={6}
                        bg={contentBg}
                        borderRadius="2xl"
                        shadow="sm"
                        borderWidth="1px"
                        borderColor="stone.100"
                        _dark={{ borderColor: "stone.700" }}
                      >
                        <AudioPlayer url={chapter.audioUrl} title={chapter.audioTitle || chapter.title} />
                      </Box>
                    )}

                    {/* Transcript & Teaching Toggles */}
                    {chapter.transcript && (
                      <Box>
                        <HStack spacing={4} justify="center" pt={2} mb={4}>
                          <Button
                            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                            variant="ghost"
                            size="sm"
                            leftIcon={<Icon as={MessageCircle} />}
                            rightIcon={isTranscriptOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            color="stone.500"
                          >
                            Podcast 文字稿
                          </Button>
                          {extractTeaching(chapter.transcript) && (
                            <Button
                              onClick={() => setIsTeachingOpen(!isTeachingOpen)}
                              variant="ghost"
                              size="sm"
                              leftIcon={<Icon as={Sun} />}
                              rightIcon={isTeachingOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                              color="amber.600"
                            >
                              法師開示
                            </Button>
                          )}
                        </HStack>

                        <Collapse in={isTranscriptOpen} animateOpacity>
                          <Box p={6} bg={contentBg} borderRadius="xl" shadow="inner" mb={4}>
                            <ReactMarkdown components={markdownComponents}>
                              {normalizeMarkdown(chapter.transcript)}
                            </ReactMarkdown>
                          </Box>
                        </Collapse>

                        <Collapse in={isTeachingOpen} animateOpacity>
                          <Box p={6} bg="orange.50" _dark={{ bg: "stone.800" }} borderRadius="xl" borderLeftWidth="4px" borderLeftColor="orange.400" mb={4}>
                            <ReactMarkdown components={markdownComponents}>
                              {normalizeMarkdown(extractTeaching(chapter.transcript))}
                            </ReactMarkdown>
                          </Box>
                        </Collapse>
                      </Box>
                    )}

                    {/* PDF Slide Player */}
                    {chapter.pdfUrl && (
                      <Box mt={4} mb={6}>
                        <PdfSlidePlayer
                          url={`${baseUrl}${chapter.pdfUrl.replace(/^\//, '')}`}
                          title={chapter.pdfTitle || "相關文件"}
                        />
                      </Box>
                    )}
                  </VStack>
                </Box>
              )}

              {/* Original Text */}
              {chapter.originalText && (
                <Box position="relative" pl={{ base: 4, md: 8 }} mb={12}>
                  <Box
                    position="absolute"
                    left={0}
                    top={0}
                    bottom={0}
                    w="4px"
                    bg="stone.300"
                    borderRadius="full"
                  />
                  <HStack spacing={2} mb={4} color="stone.400">
                    <Icon as={BookOpen} boxSize={4} />
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                    >
                      經文原文
                    </Text>
                  </HStack>
                  <Box
                    fontSize={{ base: currentFontSize.original, md: currentFontSize.original }}
                    fontFamily="heading"
                    lineHeight="1.8"
                    color="stone.800"
                    _dark={{ color: "stone.100" }}
                    sx={{
                      '& p': { mb: 4 },
                      '& h1, & h2, & h3': { mt: 6, mb: 4, fontWeight: 'bold' },
                      '& strong': { fontWeight: 'bold', color: 'amber.700', _dark: { color: 'amber.400' } }
                    }}
                  >
                    <ReactMarkdown components={markdownComponents}>
                      {normalizeMarkdown(chapter.originalText)}
                    </ReactMarkdown>
                  </Box>
                </Box>
              )}

              {/* Translation */}
              {chapter.translation && !chapter.detailedExplanation && (
                <Box
                  bg={translationBg}
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  mb={12}
                >
                  <HStack mb={4} color="stone.500">
                    <Icon as={Sun} size={18} />
                    <Text fontSize="sm" fontWeight="bold" letterSpacing="wide">TRANSLATION</Text>
                  </HStack>
                  <Text fontSize={currentFontSize.translation} lineHeight="relaxed" color="stone.600" _dark={{ color: "stone.300" }} whiteSpace="pre-line">
                    {chapter.translation}
                  </Text>
                </Box>
              )}

              {/* Detailed Explanation */}
              {chapter.detailedExplanation && chapter.detailedExplanation.length > 0 && (
                <VStack align="stretch" spacing={8} mb={12}>
                  {chapter.detailedExplanation.map((item, index) => (
                    <Box key={index} bg={contentBg} p={6} borderRadius="xl" shadow="sm" borderWidth="1px" borderColor="stone.100" _dark={{ borderColor: "stone.700" }}>
                      <HStack mb={3} color="stone.500">
                        <Icon as={BookOpen} size={16} />
                        <Text fontSize="xs" fontWeight="bold" letterSpacing="wide">原文段落</Text>
                      </HStack>
                      <Text fontSize={currentFontSize.explanation} fontFamily="heading" color="stone.800" _dark={{ color: "stone.200" }} mb={6} whiteSpace="pre-line">
                        {item.original}
                      </Text>

                      <Divider mb={6} borderColor="stone.200" />

                      <HStack mb={3} color="stone.500">
                        <Icon as={MessageCircle} size={16} />
                        <Text fontSize="xs" fontWeight="bold" letterSpacing="wide">白話翻譯</Text>
                      </HStack>
                      <Box fontSize={currentFontSize.explanation} lineHeight="relaxed">
                        <ReactMarkdown components={markdownComponents}>
                          {normalizeMarkdown(item.commentaryTranslation || item.translation || '')}
                        </ReactMarkdown>
                      </Box>

                      {item.commentary && (
                        <Box mt={4}>
                          <Button
                            onClick={() => toggleExplanation(index)}
                            variant="link"
                            colorScheme="stone"
                            size="sm"
                            rightIcon={openExplanations[index] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          >
                            查看註解原文
                          </Button>
                          <Collapse in={openExplanations[index]} animateOpacity>
                            <Box mt={3} p={4} bg="stone.50" _dark={{ bg: "stone.900" }} borderRadius="md" fontSize="sm">
                              {item.commentary}
                            </Box>
                          </Collapse>
                        </Box>
                      )}
                    </Box>
                  ))}
                </VStack>
              )}

              {/* Practice Insights */}
              {chapter.practiceInsights && (
                <Box
                  mb={12}
                >
                  <VStack align="stretch" spacing={6} position="relative">
                    <HStack spacing={4} mb={2} align="center">
                      <Center boxSize="40px" bg="white" _dark={{ bg: "stone.800" }} borderRadius="full" shadow="md">
                        <Icon as={Heart} color="rose.400" boxSize={5} />
                      </Center>
                      <Heading as="h3" fontSize="xl" fontFamily="heading" color="stone.700" _dark={{ color: "stone.200" }}>
                        修行心得
                      </Heading>
                    </HStack>

                    <Box
                      fontSize={currentFontSize.explanation}
                      color="stone.700"
                      _dark={{ color: "stone.300" }}
                      pl={{ base: 0, md: 2 }}
                    >
                      <ReactMarkdown components={markdownComponents}>
                        {normalizeMarkdown(chapter.practiceInsights)}
                      </ReactMarkdown>
                    </Box>
                  </VStack>
                </Box>
              )}
            </>
          )}

          {/* Bottom Navigation */}
          <Flex justify="space-between" pt={8} borderTopWidth="1px" borderColor="stone.200" _dark={{ borderColor: "stone.700" }}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={goToPrevChapter}
              isDisabled={!hasPrevChapter}
              variant="ghost"
              size="lg"
              colorScheme="stone"
              _hover={{ bg: 'stone.100' }}
            >
              上一章
            </Button>
            <Button
              rightIcon={<ChevronRightIcon />}
              onClick={goToNextChapter}
              isDisabled={!hasNextChapter}
              variant="solid"
              size="lg"
              colorScheme="stone"
              bg="stone.800"
              color="white"
              _hover={{ bg: 'stone.700' }}
              _dark={{ bg: "stone.200", color: "stone.900", _hover: { bg: "stone.300" } }}
            >
              下一章
            </Button>
          </Flex>
        </VStack>
      </Container >
    </Box >
  );
}
