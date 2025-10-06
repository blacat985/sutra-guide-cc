import { Grid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import TableOfContents from '../components/sutra/TableOfContents';
import ChapterView from '../components/sutra/ChapterView';

export default function SutraPage() {
  const { sutraId, chapterNum } = useParams<{
    sutraId: string;
    chapterNum?: string;
  }>();

  const currentChapter = chapterNum ? parseInt(chapterNum, 10) : 1;

  if (!sutraId) {
    return <div>Invalid sutra ID</div>;
  }

  return (
    <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={0}>
      <GridItem display={{ base: 'none', md: 'block' }}>
        <TableOfContents sutraId={sutraId} currentChapter={currentChapter} />
      </GridItem>
      <GridItem>
        <ChapterView sutraId={sutraId} chapterNum={currentChapter} />
      </GridItem>
    </Grid>
  );
}
