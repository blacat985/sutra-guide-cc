import { Box, Heading, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import { useAllSutras } from '../../hooks/useSutraData';
import SutraCard from './SutraCard';
import ErrorMessage from '../common/ErrorMessage';

export default function SutraList() {
  const { sutras, loading, error } = useAllSutras();

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

  return (
    <Box as="main" role="main" aria-label="Sutra List" py={8}>
      <Heading as="h1" fontSize="2em" mb={8} textAlign="center">
        佛經典籍
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {sutras.map((sutra) => (
          <SutraCard key={sutra.id} sutra={sutra} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
