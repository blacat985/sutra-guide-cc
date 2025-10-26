import { Box, AspectRatio, Text } from '@chakra-ui/react';

interface VideoPlayerProps {
  url: string;
  title?: string;
}

/**
 * VideoPlayer component for embedding video content
 * Supports Google Vids, Google Drive, YouTube, and direct video files
 * Follows FR-053, FR-055, FR-056, FR-058 requirements
 */
export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  // Detect video platform
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isGoogleVids = url.includes('docs.google.com/videos');
  const isGoogleDrive = url.includes('drive.google.com');
  const isDirectFile = url.startsWith('/') || url.includes('.mp4') || url.includes('.webm');

  // Render iframe for YouTube, Google Vids, or Google Drive
  if (isYouTube || isGoogleVids || isGoogleDrive) {
    // Ensure proper embed URL format
    let embedUrl = url;

    if (isYouTube && !url.includes('/embed/')) {
      // Convert regular YouTube URL to embed format
      const videoId = url.match(/(?:v=|youtu\.be\/)([^&?]+)/)?.[1];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0`;
      }
    }

    if (isGoogleVids && !url.includes('/preview')) {
      // Ensure Google Vids uses /preview for embedding
      embedUrl = url.replace('/play', '/preview');
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
      <Box as="section" role="region" aria-label={title || "Video content"}>
        {title && (
          <Text fontWeight="bold" mb={3} color="brand.600" _dark={{ color: "brand.200" }}>
            🎬 {title}
          </Text>
        )}
        <AspectRatio ratio={16 / 9} maxW="100%">
          <iframe
            src={embedUrl}
            title={title || "Video player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{
              border: 'none',
              borderRadius: '8px',
            }}
          />
        </AspectRatio>
      </Box>
    );
  }

  // Render HTML5 video for direct files
  if (isDirectFile) {
    const baseUrl = import.meta.env.BASE_URL;
    const videoSrc = url.startsWith('/') ? `${baseUrl}${url.replace(/^\//, '')}` : url;

    return (
      <Box as="section" role="region" aria-label={title || "Video content"}>
        {title && (
          <Text fontWeight="bold" mb={3} color="brand.600" _dark={{ color: "brand.200" }}>
            🎬 {title}
          </Text>
        )}
        <AspectRatio ratio={16 / 9} maxW="100%">
          <Box
            as="video"
            controls
            preload="metadata"
            src={videoSrc}
            style={{
              borderRadius: '8px',
              objectFit: 'contain',
            }}
          >
            您的瀏覽器不支援 video 標籤。
          </Box>
        </AspectRatio>
      </Box>
    );
  }

  // Fallback for unsupported URLs
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="yellow.50" _dark={{ bg: "yellow.900" }}>
      <Text color="yellow.800" _dark={{ color: "yellow.200" }}>
        ⚠️ 不支援的影片格式: {url}
      </Text>
    </Box>
  );
}
