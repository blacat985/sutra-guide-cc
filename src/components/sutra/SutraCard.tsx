import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import type { Sutra } from '../../types/sutra';

interface SutraCardProps {
  sutra: Sutra;
}

export default function SutraCard({ sutra }: SutraCardProps) {
  return (
    <Box
      as="article"
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      _hover={{ shadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <VStack align="start" spacing={3}>
        <Heading as="h2" size="md">
          {sutra.title}
        </Heading>
        {sutra.titleEn && (
          <Text fontSize="sm" color="gray.600">
            {sutra.titleEn}
          </Text>
        )}
        <Text fontSize="sm" fontWeight="bold" color="brand.600">
          {sutra.tradition}
        </Text>
        {sutra.description && (
          <Text fontSize="sm" noOfLines={3}>
            {sutra.description}
          </Text>
        )}
        <Button
          as={RouterLink}
          to={`/${sutra.id}`}
          colorScheme="brand"
          size="sm"
          width="full"
        >
          閱讀經文
        </Button>
      </VStack>
    </Box>
  );
}
