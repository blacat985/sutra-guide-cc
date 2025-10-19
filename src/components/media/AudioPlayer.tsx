import { Box, Text } from '@chakra-ui/react';

interface AudioPlayerProps {
  url: string;
  title?: string;
}

/**
 * AudioPlayer component for embedding audio content
 * Supports local audio files (.m4a, .mp3), Google Drive, and external platforms (SoundCloud, YouTube audio)
 * Follows FR-054, FR-055, FR-057, FR-058 requirements
 */
export default function AudioPlayer({ url, title }: AudioPlayerProps) {
  // Detect audio platform
  const isSoundCloud = url.includes('soundcloud.com');
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isGoogleDrive = url.includes('drive.google.com');
  const isDirectFile = url.startsWith('/') || url.match(/\.(m4a|mp3|wav|ogg)$/i);

  // Render iframe for SoundCloud, YouTube audio, or Google Drive
  if (isSoundCloud || isYouTube || isGoogleDrive) {
    let embedUrl = url;

    if (isYouTube && !url.includes('/embed/')) {
      // Convert regular YouTube URL to embed format
      const videoId = url.match(/(?:v=|youtu.be\/)([^&?]+)/)?.[1];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0`;
      }
    }

    if (isGoogleDrive) {
      // Convert Google Drive URLs to preview format
      // From: https://drive.google.com/file/d/FILE_ID/view or /preview
      // To: https://drive.google.com/file/d/FILE_ID/preview
      const fileIdMatch = url.match(/\/file\/d\/([^/]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }

    return (
      <Box as="section" role="region" aria-label={title || "Audio content"}>
        {title && (
          <Text fontWeight="bold" mb={3} color="brand.600" _dark={{ color: "brand.200" }}>
            🎧 {title}
          </Text>
        )}
        <Box
          as="iframe"
          src={embedUrl}
          width="100%"
          height={isSoundCloud ? "166px" : isGoogleDrive ? "80px" : "200px"}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media"
          style={{ borderRadius: '8px' }}
        />
      </Box>
    );
  }

  // Render HTML5 audio for direct files
  if (isDirectFile) {
    const baseUrl = import.meta.env.BASE_URL;
    const audioSrc = url.startsWith('/') ? `${baseUrl}${url.replace(/^\//, '')}` : url;

    return (
      <Box as="section" role="region" aria-label={title || "Audio content"}>
        {title && (
          <Text fontWeight="bold" mb={3} color="brand.600" _dark={{ color: "brand.200" }}>
            🎧 {title}
          </Text>
        )}
        <Box
          as="audio"
          controls
          preload="metadata"
          src={audioSrc}
          w="100%"
          sx={{
            '&::-webkit-media-controls-panel': {
              backgroundColor: 'var(--chakra-colors-gray-100)',
            },
            '_dark &::-webkit-media-controls-panel': {
              backgroundColor: 'var(--chakra-colors-gray-700)',
            },
          }}
        >
          您的瀏覽器不支援 audio 標籤。
          <a href={audioSrc}>下載音頻</a>
        </Box>
      </Box>
    );
  }

  // Fallback for unsupported URLs
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="yellow.50" _dark={{ bg: "yellow.900" }}>
      <Text color="yellow.800" _dark={{ color: "yellow.200" }}>
        ⚠️ 不支援的音頻格式: {url}
      </Text>
    </Box>
  );
}
