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
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useChapterData } from '../../hooks/useChapterData';
import ErrorMessage from '../common/ErrorMessage';

interface ChapterViewProps {
  sutraId: string;
  chapterNum: number;
}

export default function ChapterView({ sutraId, chapterNum }: ChapterViewProps) {
  const { chapter, loading, error } = useChapterData(sutraId, chapterNum);

  if (loading) {
    return (
      <Center minH="400px">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!chapter) {
    return <ErrorMessage message="Chapter not found" />;
  }

  return (
    <Box as="main" role="main" p={8} maxW="800px" mx="auto">
      <VStack align="stretch" spacing={8}>
        {/* Chapter Title */}
        <Heading as="h1" size="xl" textAlign="center">
          {chapter.title}
        </Heading>

        {/* Original Text */}
        <Box as="section" role="region" aria-label="Original Text">
          <Heading as="h2" size="md" mb={4} color="brand.600">
            原文
          </Heading>
          <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-line">
            {chapter.originalText}
          </Text>
        </Box>

        <Divider />

        {/* Translation */}
        {chapter.translation && !chapter.detailedExplanation && (
          <Box as="section" role="region" aria-label="Translation">
            <Heading as="h2" size="md" mb={4} color="brand.600">
              白話翻譯
            </Heading>
            <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line">
              {chapter.translation}
            </Text>
          </Box>
        )}

        {chapter.translation && !chapter.detailedExplanation && <Divider />}

        {/* Detailed Explanation */}
        {chapter.detailedExplanation && chapter.detailedExplanation.length > 0 && (
          <Box as="section" role="region" aria-label="Detailed Explanation">
            <Heading as="h2" size="lg" mb={6} color="brand.700" textAlign="center">
              逐段解釋
            </Heading>
            <VStack align="stretch" spacing={10}>
              {chapter.detailedExplanation.map((item, index) => (
                <Box key={index} p={5} borderRadius="md" shadow="sm" borderWidth="1px">
                  <Heading as="h3" size="md" mb={4} color="brand.600">
                    原文段落 {index + 1}
                  </Heading>
                  <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-line" fontStyle="italic" color="gray.700" mb={6}>
                    {item.original}
                  </Text>

                  <Divider mb={6} />

                  <Heading as="h4" size="sm" mb={3} color="brand.800">
                    六祖慧能註解
                  </Heading>
                  <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line" color="gray.600" mb={4}>
                    {item.commentary}
                  </Text>
                  
                  <Heading as="h4" size="sm" mb={3} color="brand.800">
                    註解白話翻譯
                  </Heading>
                  <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line">
                    {item.commentaryTranslation}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {/* Annotations */}
        {chapter.annotations && chapter.annotations.length > 0 && (
          <>
            <Divider />
            <Box as="section" role="region" aria-label="Annotations">
              <Heading as="h2" size="md" mb={4} color="brand.600">
                註解
              </Heading>
              <VStack align="stretch" spacing={4}>
                {chapter.annotations.map((annotation, index) => (
                  <Box key={index} pl={4} borderLeft="3px solid" borderColor="brand.200">
                    <Text fontSize="sm" fontWeight="bold" color="brand.700" mb={1}>
                      第 {annotation.paragraph} 段
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      {annotation.text}
                    </Text>
                    <Text fontSize="xs" color="gray.600" fontStyle="italic">
                      來源：{annotation.source}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </>
        )}

        {/* Practice Insights */}
        {chapter.practiceInsights && (
          <>
            <Divider />
            <Box as="section" role="region" aria-label="Practice Insights">
              <Heading as="h2" size="md" mb={4} color="brand.600">
                修行心得
              </Heading>
              <Text fontSize="md" lineHeight="tall" whiteSpace="pre-line">
                {chapter.practiceInsights}
              </Text>
            </Box>
          </>
        )}

        {/* Illustrations */}
        {chapter.illustrations && chapter.illustrations.length > 0 && (
          <>
            <Divider />
            <Box as="section" role="region" aria-label="Illustrations">
              <VStack align="stretch" spacing={4}>
                {chapter.illustrations.map((illustration, index) => (
                  <Box key={index}>
                    <Image
                      src={illustration.url}
                      alt={illustration.alt}
                      borderRadius="md"
                      maxW="full"
                    />
                    {illustration.caption && (
                      <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
                        {illustration.caption}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          </>
        )}

        {/* Podcast Link */}
        {chapter.podcastUrl && (
          <>
            <Divider />
            <Box as="section">
              <Link
                href={chapter.podcastUrl}
                isExternal
                color="brand.600"
                fontSize="md"
                fontWeight="bold"
              >
                收聽 Podcast 📻 <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
          </>
        )}

        {/* Podcast Transcript */}
        {chapter.transcript && (
          <Box as="section" role="region" aria-label="Transcript">
            <Heading as="h3" size="sm" mb={3} color="brand.600">
              Podcast 文字稿
            </Heading>
            <Text fontSize="sm" lineHeight="tall" whiteSpace="pre-line" color="gray.700">
              {chapter.transcript}
            </Text>
          </Box>
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
      </VStack>
    </Box>
  );
}
