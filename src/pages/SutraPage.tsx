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

  /* 
     If chapterNum contains non-digits (like '604-1'), we keep it as string.
     If it's undefined, we default to 1. 
     Note that '1' as string vs 1 as number is handled by components now.
  */
  const currentChapter = chapterNum || 1;

  if (!sutraId) {
    return <div>Invalid sutra ID</div>;
  }

  return (
    <>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        closeOnOverlayClick={true}
        closeOnEsc={true}
      >
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
      <Grid templateColumns={{ base: '1fr', xl: '250px 1fr' }} gap={0}>
        <GridItem display={{ base: 'none', xl: 'block' }}>
          <TableOfContents sutraId={sutraId} currentChapter={currentChapter} />
        </GridItem>
        <GridItem>
          <ChapterView sutraId={sutraId} chapterNum={currentChapter} onMenuClick={onOpen} />
        </GridItem>
      </Grid>
    </>
  );
}
