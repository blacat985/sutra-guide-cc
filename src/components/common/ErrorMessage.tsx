import { Box, VStack, Heading, Text, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  chapterNum?: number;
  hasPrevChapter?: boolean;
  hasNextChapter?: boolean;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
}

const pulseRing = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
`;

export default function ErrorMessage({ 
  message: _message, 
  onRetry: _onRetry,
  chapterNum,
  hasPrevChapter,
  hasNextChapter,
  onPrevChapter,
  onNextChapter
}: ErrorMessageProps) {
  return (
    <Box
      minH="400px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(135deg, rgba(237, 242, 247, 0.4) 0%, rgba(226, 232, 240, 0.6) 100%)"
      _dark={{
        bg: "linear-gradient(135deg, rgba(26, 32, 44, 0.6) 0%, rgba(45, 55, 72, 0.4) 100%)"
      }}
      borderRadius="2xl"
      position="relative"
      overflow="hidden"
      role="alert"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="20%"
        left="50%"
        transform="translateX(-50%)"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="brand.100"
        opacity={0.2}
        sx={{
          animation: `${pulseRing} 3s ease-in-out infinite`
        }}
        _dark={{ bg: "brand.800" }}
      />

      <VStack spacing={6} zIndex={1} px={8} w="full" maxW="600px">
        {/* Chapter Navigation */}
        {chapterNum !== undefined && (
          <HStack justify="space-between" w="full">
            <IconButton
              aria-label="上一章"
              icon={<ChevronLeftIcon />}
              onClick={onPrevChapter}
              isDisabled={!hasPrevChapter}
              variant="outline"
              colorScheme="brand"
              size="md"
            />
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {chapterNum === 0 ? '序' : `第 ${chapterNum} 章`}
            </Text>
            <IconButton
              aria-label="下一章"
              icon={<ChevronRightIcon />}
              onClick={onNextChapter}
              isDisabled={!hasNextChapter}
              variant="outline"
              colorScheme="brand"
              size="md"
            />
          </HStack>
        )}

        <Box fontSize="5xl">
          📿
        </Box>

        <Heading
          as="h2"
          size="lg"
          color="brand.700"
          _dark={{ color: "brand.200" }}
          fontWeight="semibold"
          letterSpacing="wide"
        >
          內容建構中
        </Heading>

        <Text
          fontSize="md"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          textAlign="center"
          maxW="md"
          lineHeight="tall"
        >
          此章節內容正在用心準備中
          <br />
          敬請期待 🙏
        </Text>
      </VStack>
    </Box>
  );
}
