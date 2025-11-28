import { Box, Spinner, Center } from '@chakra-ui/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter="2rem">
          {sutras.map((sutra) => (
            <SutraCard key={sutra.id} sutra={sutra} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  );
}
