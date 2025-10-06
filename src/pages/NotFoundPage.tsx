import { Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Container maxW="container.md" py={16}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl">
          404
        </Heading>
        <Heading as="h2" size="lg">
          頁面不存在
        </Heading>
        <Text fontSize="md" color="gray.600">
          抱歉，您訪問的頁面不存在或已被移除。
        </Text>
        <Button as={RouterLink} to="/" colorScheme="brand" size="lg">
          返回首頁
        </Button>
      </VStack>
    </Container>
  );
}
