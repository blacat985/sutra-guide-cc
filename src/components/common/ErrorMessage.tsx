import { Alert, AlertIcon, AlertTitle, AlertDescription, Button, VStack } from '@chakra-ui/react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      minH="200px"
      role="alert"
    >
      <VStack spacing={4}>
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          載入失敗
        </AlertTitle>
        <AlertDescription maxW="sm">
          {message}
        </AlertDescription>
        {onRetry && (
          <Button onClick={onRetry} colorScheme="red" variant="outline" mt={4}>
            重試
          </Button>
        )}
      </VStack>
    </Alert>
  );
}
