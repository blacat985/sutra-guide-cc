import { useState, useEffect } from 'react';
import { loadYamlFromFile } from '../services/yamlParser';

interface ChapterTitle {
  number: number;
  title: string;
}

interface UseChapterTitlesResult {
  titles: Map<number, string>;
  loading: boolean;
  error: Error | null;
}

export function useChapterTitles(
  sutraId: string,
  totalChapters: number,
  startChapter: number = 0
): UseChapterTitlesResult {
  const [titles, setTitles] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTitles() {
      try {
        setLoading(true);
        setError(null);

        const titleMap = new Map<number, string>();
        const chapterCount = totalChapters + (startChapter === 0 ? 1 : 0);
        
        const promises = Array.from({ length: chapterCount }, (_, i) => {
          const chapterNum = i + startChapter;
          return loadYamlFromFile(
            `${import.meta.env.BASE_URL}content/${sutraId}/chapter-${chapterNum}.yml`
          ).then((data: any) => {
            if (data && data.title) {
              titleMap.set(chapterNum, data.title);
            }
          }).catch(() => {
            // Silently skip missing chapters
          });
        });

        await Promise.all(promises);
        setTitles(titleMap);
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

  return { titles, loading, error };
}
