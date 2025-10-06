import { Container } from '@chakra-ui/react';
import SutraList from '../components/sutra/SutraList';

export default function HomePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <SutraList />
    </Container>
  );
}
