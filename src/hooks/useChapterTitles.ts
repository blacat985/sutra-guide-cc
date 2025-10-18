import { useState, useEffect } from 'react';
import { loadYamlFromFile } from '../services/yamlParser';

interface ChapterInfo {
  number: number;
  title: string;
  volume?: number;
  volumeTitle?: string;
}

interface UseChapterTitlesResult {
  titles: Map<number, string>;
  chapters: ChapterInfo[];
  loading: boolean;
  error: Error | null;
}

export function useChapterTitles(
  sutraId: string,
  totalChapters: number,
  startChapter: number = 0
): UseChapterTitlesResult {
  const [titles, setTitles] = useState<Map<number, string>>(new Map());
  const [chapters, setChapters] = useState<ChapterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTitles() {
      try {
        setLoading(true);
        setError(null);

        const titleMap = new Map<number, string>();
        const chapterList: ChapterInfo[] = [];

        const promises = Array.from({ length: totalChapters }, (_, i) => {
          const chapterNum = i + startChapter;
          return loadYamlFromFile(
            `${import.meta.env.BASE_URL}content/${sutraId}/chapter-${chapterNum}.yml`
          ).then((data: unknown) => {
            const chapterData = data as {
              title?: string;
              number?: number;
              volume?: number;
              volumeTitle?: string;
            };
            if (chapterData && chapterData.title) {
              titleMap.set(chapterNum, chapterData.title);
              chapterList.push({
                number: chapterData.number || chapterNum,
                title: chapterData.title,
                volume: chapterData.volume,
                volumeTitle: chapterData.volumeTitle,
              });
            }
          }).catch(() => {
            // Silently skip missing chapters
          });
        });

        await Promise.all(promises);

        // Sort chapters by number
        chapterList.sort((a, b) => a.number - b.number);

        setTitles(titleMap);
        setChapters(chapterList);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (sutraId && totalChapters >= 0) {
      fetchTitles();
    }
  }, [sutraId, totalChapters, startChapter]);

  return { titles, chapters, loading, error };
}
