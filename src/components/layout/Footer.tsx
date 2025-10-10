import { Box, Link, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" py={6} px={8} borderTop="1px" borderColor="gray.200">
      <Text fontSize="0.9em" textAlign="center">
        <Link
          href="mailto:feedback@sutra-guide.example.com?subject=Content Error Report"
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
