import { Grid, GridItem, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, DrawerHeader } from '@chakra-ui/react';
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

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">章節選單</DrawerHeader>
          <DrawerBody p={0}>
            <TableOfContents sutraId={sutraId} currentChapter={currentChapter} onNavigate={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop & Mobile Layout */}
      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={0}>
        <GridItem display={{ base: 'none', md: 'block' }}>
          <TableOfContents sutraId={sutraId} currentChapter={currentChapter} />
        </GridItem>
        <GridItem>
          <ChapterView sutraId={sutraId} chapterNum={currentChapter} onMenuClick={onOpen} />
        </GridItem>
      </Grid>
    </>
  );
}
