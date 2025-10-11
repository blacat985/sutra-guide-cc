import { Box, Link, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" py={6} px={8} borderTop="1px" borderColor="gray.200">
      <Text fontSize="0.9em" textAlign="center">
        <Link
          href="https://github.com/blacat985/sutra-guide-cc/issues/new?labels=content-error&template=content-error-report.md"
          color="brand.600"
          isExternal
        >
          回報內容錯誤
        </Link>
      </Text>
      <Text fontSize="0.8em" textAlign="center" mt={2} color="gray.600">
        © 2025 Sutra Guide. All rights reserved.
      </Text>
    </Box>
  );
}
