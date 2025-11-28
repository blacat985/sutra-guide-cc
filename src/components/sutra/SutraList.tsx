import { Box, Spinner, Center, Flex } from '@chakra-ui/react';
import { useAllSutras } from '../../hooks/useSutraData';
import SutraCard from './SutraCard';
import ErrorMessage from '../common/ErrorMessage';

export default function SutraList() {
  const { sutras, loading, error } = useAllSutras();

  if (loading) {
    return (
      <Center minH="400px">
        <Spinner size="xl" color="stone.500" />
      </Center>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Box as="main" role="main" aria-label="Sutra List" pb={20}>
      <Flex wrap="wrap" justify="center" gap={8}>
        {sutras.map((sutra) => (
          <Box key={sutra.id} w={{ base: "100%", md: "45%", lg: "30%" }} maxW="400px">
            <SutraCard sutra={sutra} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
