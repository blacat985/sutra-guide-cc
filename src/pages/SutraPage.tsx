import { Grid, GridItem, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, IconButton, Box } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import TableOfContents from '../components/sutra/TableOfContents';
import ChapterView from '../components/sutra/ChapterView';

export default function SutraPage() {
  const { sutraId, chapterNum } = useParams<{
    sutraId: string;
    chapterNum?: string;
  }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentChapter = chapterNum ? parseInt(chapterNum, 10) : 1;

  if (!sutraId) {
    return <div>Invalid sutra ID</div>;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Box display={{ base: 'block', md: 'none' }} position="fixed" top={20} left={4} zIndex={10}>
        <IconButton
          aria-label="開啟章節選單"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          colorScheme="brand"
          size="lg"
          boxShadow="md"
        />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <TableOfContents sutraId={sutraId} currentChapter={currentChapter} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop & Mobile Layout */}
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={0}>
        <GridItem display={{ base: 'none', md: 'block' }}>
          <TableOfContents sutraId={sutraId} currentChapter={currentChapter} />
        </GridItem>
        <GridItem>
          <ChapterView sutraId={sutraId} chapterNum={currentChapter} />
        </GridItem>
      </Grid>
    </>
  );
}
