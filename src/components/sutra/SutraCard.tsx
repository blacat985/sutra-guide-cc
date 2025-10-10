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
        <Heading as="h2" fontSize="1.3em">
          {sutra.title}
        </Heading>
        {sutra.titleEn && (
          <Text fontSize="0.85em" color="gray.600">
            {sutra.titleEn}
          </Text>
        )}
        {sutra.description && (
          <Text fontSize="0.9em" noOfLines={3}>
            {sutra.description}
          </Text>
        )}
        <Button
          as={RouterLink}
          to={sutra.id === 'diamond-sutra' ? `/${sutra.id}/0` : `/${sutra.id}`}
          colorScheme="brand"
          fontSize="inherit"
          width="full"
        >
          閱讀經文
        </Button>
      </VStack>
    </Box>
  );
}
