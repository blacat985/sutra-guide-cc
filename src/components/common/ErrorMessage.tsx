import { Box, VStack, Heading, Text, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  chapterNum?: number;
  chapterTitle?: string;
  hasPrevChapter?: boolean;
  hasNextChapter?: boolean;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  onMenuClick?: () => void;
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
  chapterTitle,
  hasPrevChapter,
  hasNextChapter,
  onPrevChapter,
  onNextChapter,
  onMenuClick
}: ErrorMessageProps) {
  return (
    <Box as="main" role="main" p={8} maxW="800px" mx="auto">
      <VStack align="stretch" spacing={8}>
        {/* Chapter Navigation */}
        {chapterNum !== undefined && (
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
                onClick={onPrevChapter}
                isDisabled={!hasPrevChapter}
                variant="outline"
                colorScheme="brand"
                size="md"
              />
            </HStack>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {chapterTitle || (chapterNum === 0 ? '序' : `第 ${chapterNum} 章`)}
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

        {/* Under Construction Message */}
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
      </VStack>
    </Box>
  );
}
