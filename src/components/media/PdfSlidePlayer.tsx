import { useState, useEffect } from 'react';
import { Box, Button, HStack, Text, Spinner, Center, Icon, AspectRatio } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Document, Page, pdfjs } from 'react-pdf';
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfSlidePlayerProps {
    url: string;
    title?: string;
}

export default function PdfSlidePlayer({ url, title }: PdfSlidePlayerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Reset page number when URL changes
    useEffect(() => {
        setPageNumber(1);
        setScale(1.0);
    }, [url]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const goToPrevPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setPageNumber(prev => Math.min(prev + 1, numPages || prev));
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('pdf-container')?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Adjust width based on container, but currently we let Page handle it or use scale
    // For responsiveness, 'width' prop on Page can be used, but let's start with scale

    return (
        <Box
            id="pdf-container"
            bg={isFullscreen ? "stone.900" : "stone.100"}
            _dark={{ bg: "stone.900" }}
            borderRadius={isFullscreen ? "0" : "xl"}
            overflow="hidden"
            borderWidth={isFullscreen ? "0" : "1px"}
            borderColor="stone.200"
            _dark={{ borderColor: "stone.700" }}
            p={isFullscreen ? 0 : 4}
            h={isFullscreen ? "100vh" : "auto"}
            display="flex"
            flexDirection="column"
        >
            {/* Controls Header */}
            <HStack justify="space-between" mb={4} px={2} display="flex">
                <Text fontSize="sm" fontWeight="bold" color="stone.600" _dark={{ color: "stone.300" }}>
                    {title ? `PDF: ${title}` : 'PDF 預覽'} ({pageNumber} / {numPages || '--'})
                </Text>
                <HStack>
                    <Button size="sm" variant="ghost" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><Icon as={ZoomOut} /></Button>
                    <Text fontSize="xs" w="40px" textAlign="center">{Math.round(scale * 100)}%</Text>
                    <Button size="sm" variant="ghost" onClick={() => setScale(s => Math.min(2.0, s + 0.1))}><Icon as={ZoomIn} /></Button>
                    <Button size="sm" variant="ghost" onClick={toggleFullscreen}>
                        <Icon as={isFullscreen ? Minimize2 : Maximize2} />
                    </Button>
                </HStack>
            </HStack>

            {/* PDF Canvas Area */}
            <Box
                flex={1}
                overflow="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bg={isFullscreen ? "black" : "stone.200"}
                _dark={{ bg: isFullscreen ? "black" : "stone.800" }}
                width="100%"
            >
                {isFullscreen ? (
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <Center h="300px">
                                <Spinner size="xl" color="amber.500" />
                            </Center>
                        }
                        error={
                            <Center h="300px" color="red.500">
                                <Text>無法載入 PDF</Text>
                            </Center>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="pdf-page-shadow"
                        />
                    </Document>
                ) : (
                    <AspectRatio ratio={16 / 9} width="100%" maxH="80vh">
                        <Box>
                            <Document
                                file={url}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <Center h="100%" w="100%">
                                        <Spinner size="xl" color="amber.500" />
                                    </Center>
                                }
                                error={
                                    <Center h="100%" w="100%" color="red.500">
                                        <Text>無法載入 PDF</Text>
                                    </Center>
                                }
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="pdf-page-shadow"
                                    height={500} // Set a base height for aspect ratio ref, though scale overrides
                                />
                            </Document>
                        </Box>
                    </AspectRatio>
                )}
            </Box>

            {/* Navigation Footer */}
            <HStack justify="center" mt={4} spacing={8}>
                <Button
                    leftIcon={<ChevronLeftIcon />}
                    onClick={goToPrevPage}
                    isDisabled={pageNumber <= 1}
                    colorScheme="stone"
                    variant="solid"
                >
                    上一頁
                </Button>
                <Text fontWeight="bold" color="stone.600" _dark={{ color: "stone.300" }}>
                    {pageNumber} / {numPages || '--'}
                </Text>
                <Button
                    rightIcon={<ChevronRightIcon />}
                    onClick={goToNextPage}
                    isDisabled={numPages !== null && pageNumber >= numPages}
                    colorScheme="stone"
                    variant="solid"
                >
                    下一頁
                </Button>
            </HStack>
        </Box>
    );
}
