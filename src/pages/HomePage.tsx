import { Container, Box, Heading, Text } from '@chakra-ui/react';
import SutraList from '../components/sutra/SutraList';
export default function HomePage() {

  return (
    <Box minH="100vh" position="relative">
      {/* Full Page Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        sx={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/home-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.98)",
        }}
      />

      {/* Hero Header */}
      <Box
        as="header"
        position="relative"
        h={{ base: "80vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        overflow="hidden"
        pb={{ base: 12, md: 16 }}
        pr={{ base: 8, md: 24, lg: 32 }}
      >
        {/* Content Overlay - Vertical Layout (Inscription Style) */}
        <Box
          position="relative"
          zIndex={1}
          color="stone.800"
          sx={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
          }}
          h="auto"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          gap={6}
          pt={12}
          p={8}
          bg="rgba(253, 252, 248, 0.6)" // Rice paper backing
          borderRadius="sm"
          backdropFilter="blur(2px)"
          boxShadow="0 4px 6px rgba(0,0,0,0.05)"
        >
          {/* Title - Reduced size for elegance */}
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontFamily="'Kaiti TC', '楷體', 'STKaiti', '华文楷体', serif"
            fontWeight="bold"
            letterSpacing="0.2em"
            lineHeight="1.2"
          >
            虛廣
          </Heading>

          {/* Subtitle - Smaller and delicate */}
          <Box
            display="flex"
            gap={3}
            pt={4}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="'Kaiti TC', '楷體', 'STKaiti', '华文楷体', serif"
              letterSpacing="0.3em"
              fontWeight="medium"
              lineHeight="1.5"
              color="stone.900" // Darker for better contrast
            >
              以虛懷容萬境
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="'Kaiti TC', '楷體', 'STKaiti', '华文楷体', serif"
              letterSpacing="0.3em"
              fontWeight="medium"
              lineHeight="1.5"
              mt={8} // Stagger effect
              color="stone.900"
            >
              以廣心納須彌
            </Text>
          </Box>

          {/* Seal (Chop) - Adds authenticity */}
          <Box
            mt={6}
            w="32px"
            h="32px"
            bg="red.700"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="sm"
            opacity={0.9}
            sx={{ writingMode: "horizontal-tb" }} // Reset for seal text
          >
            <Text
              fontSize="xs"
              fontFamily="'Kaiti TC', serif"
              fontWeight="bold"
              lineHeight="1"
            >
              禪
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pb={20}>
        <SutraList />
      </Container>
    </Box>
  );
}
