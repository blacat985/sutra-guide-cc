import React from 'react';
import { Box, Text, VStack, Icon, Container, useColorModeValue } from '@chakra-ui/react';
import { Feather } from 'lucide-react';

export const ConstructionPlaceholder: React.FC = () => {
    const bg = useColorModeValue('stone.50', 'stone.900');
    const borderColor = useColorModeValue('stone.200', 'stone.700');
    const iconColor = useColorModeValue('stone.400', 'stone.500');
    const textColor = useColorModeValue('stone.500', 'stone.400');

    return (
        <Container maxW="container.md" py={12}>
            <Box
                bg={bg}
                p={12}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor={borderColor}
                borderStyle="dashed"
                textAlign="center"
                position="relative"
                overflow="hidden"
            >
                <VStack spacing={6}>
                    <Box
                        p={4}
                        borderRadius="full"
                        bg={useColorModeValue('white', 'stone.800')}
                        shadow="sm"
                    >
                        <Icon as={Feather} boxSize={10} color={iconColor} />
                    </Box>

                    <VStack spacing={2}>
                        <Text
                            fontSize="xl"
                            fontFamily="heading"
                            fontWeight="medium"
                            color={useColorModeValue('stone.700', 'stone.200')}
                        >
                            內容撰寫中
                        </Text>
                        <Text fontSize="md" color={textColor} fontStyle="italic">
                            墨韻未乾，敬請期待
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </Container>
    );
};
