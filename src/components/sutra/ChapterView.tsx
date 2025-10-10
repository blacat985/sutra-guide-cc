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
import { useSutraData } from '../../hooks/useSutraData';
import ErrorMessage from '../common/ErrorMessage';

interface ChapterViewProps {
  sutraId: string;
  chapterNum: number;
  onMenuClick?: () => void;
}

const markdownComponents: Components = {
  h1: ({ children }) => <Heading as="h1" size="lg" mt={5} mb={3} color="brand.600">{children}</Heading>,
  h2: ({ children }) => <Heading as="h2" size="md" mt={4} mb={2} color="brand.600">{children}</Heading>,
  h3: ({ children }) => <Heading as="h3" size="sm" mt={3} mb={2} color="brand.600">{children}</Heading>,
  h4: ({ children }) => <Heading as="h4" size="xs" mt={2} mb={1}>{children}</Heading>,
  p: ({ children }) => <Text mb={4} fontSize="md" lineHeight="tall">{children}</Text>,
  ul: ({ children }) => <UnorderedList mb={4} spacing={2}>{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList mb={4} spacing={2}>{children}</OrderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  code: ({ children }) => <Code>{children}</Code>,
  strong: ({ children }) => <Text as="strong" fontWeight="bold">{children}</Text>,
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
  const startChapter = sutraId === 'diamond-sutra' ? 0 : 1;
  const totalChapters = sutra?.chapters ?? 0;
  const lastChapter = startChapter === 0 ? totalChapters : totalChapters;
  
  const hasPrevChapter = chapterNum > startChapter;
  const hasNextChapter = chapterNum < lastChapter;

  const goToPrevChapter = () => {
    if (hasPrevChapter) {
      navigate(`/${sutraId}/${chapterNum - 1}`);
    }
  };

  const goToNextChapter = () => {
    if (hasNextChapter) {
      navigate(`/${sutraId}/${chapterNum + 1}`);
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
  const extractTeaching = (transcript: string): string => {
    const match = transcript.match(/### 弘源法師開示[\s\S]*?(?=\n### |\n##|$)/);
    return match ? match[0] : '';
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
              size="md"
            />
          </HStack>
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
            {chapter.title}
          </Text>
          <IconButton
            aria-label="下一章"
            icon={<ChevronRightIcon />}
            onClick={goToNextChapter}
            isDisabled={!hasNextChapter}
            variant="outline"
            colorScheme="brand"
            size="md"
          />
        </HStack>

        {/* Chapter Title */}
        <Heading as="h1" size="xl" textAlign="center">
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
                    />
                    {illustration.caption && (
                      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }} mt={2} textAlign="center">
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
              fontSize="lg"
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

        {/* Podcast Transcript */}
        {chapter.transcript && (
          <>
            <Box as="section" role="region" aria-label="Transcript">
              <Button
                onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                variant="ghost"
                colorScheme="brand"
                size="sm"
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
            <Box fontSize="sm" lineHeight="tall">
              <ReactMarkdown components={markdownComponents}>
                {chapter.transcript}
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
                  size="sm"
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
                    <Box fontSize="md" lineHeight="tall">
                      <ReactMarkdown components={markdownComponents}>
                        {extractTeaching(chapter.transcript)}
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
          <Heading as="h2" size="md" mb={4} color="brand.600" _dark={{ color: "brand.200" }}>
            原文
          </Heading>
          <Text 
            fontSize="lg" 
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
              <Heading as="h2" size="md" mb={4} color="brand.600">
                白話翻譯
              </Heading>
              <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line">
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
              <Heading as="h2" size="md" mb={6} color="brand.600">
                逐段解釋
              </Heading>
              <VStack align="stretch" spacing={10}>
              {chapter.detailedExplanation.map((item, index) => (
                <Box key={index} p={5} borderRadius="md" shadow="sm" borderWidth="1px">
                  <Heading as="h3" size="md" mb={4} color="brand.600">
                    原文段落 {index + 1}
                  </Heading>
                  <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-line" fontStyle="italic" color="gray.600" _dark={{ color: "gray.300" }} mb={6}>
                    {item.original}
                  </Text>

                  <Divider mb={4} />

                  <Heading as="h4" size="sm" mb={3} color="brand.800" _dark={{ color: "brand.200" }}>
                    {item.commentaryTranslation ? '註解白話翻譯' : '白話翻譯'}
                  </Heading>
                  <Box mb={4}>
                    <ReactMarkdown components={markdownComponents}>
                      {item.commentaryTranslation || item.translation || ''}
                    </ReactMarkdown>
                  </Box>

                  {item.commentary && (
                    <>
                      <Button
                        onClick={() => toggleExplanation(index)}
                        variant="ghost"
                        colorScheme="brand"
                        size="sm"
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
                          <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line" color="gray.600" _dark={{ color: "gray.300" }}>
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
              <Heading as="h2" size="md" mb={4} color="brand.600">
                修行心得
              </Heading>
              <Box fontSize="md" lineHeight="tall">
                <ReactMarkdown components={markdownComponents}>
                  {chapter.practiceInsights}
                </ReactMarkdown>
              </Box>
            </Box>
          </>
        )}

        {/* Source Attribution */}
        {chapter.sourceAttribution && (
          <>
            <Divider />
            <Text fontSize="xs" color="gray.500" textAlign="center">
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
            size="md"
          >
            上一章
          </Button>
          <Button
            rightIcon={<ChevronRightIcon />}
            onClick={goToNextChapter}
            isDisabled={!hasNextChapter}
            variant="outline"
            colorScheme="brand"
            size="md"
          >
            下一章
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
