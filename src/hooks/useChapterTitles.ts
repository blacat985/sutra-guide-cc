import { useState, useEffect } from 'react';
import { loadYamlFromFile } from '../services/yamlParser';

interface ChapterInfo {
  number: number | string;
  title: string;
  volume?: number;
  volumeTitle?: string;
}

interface UseChapterTitlesResult {
  titles: Map<string | number, string>;
  chapters: ChapterInfo[];
  loading: boolean;
  error: Error | null;
}

export function useChapterTitles(
  sutraId: string,
  totalChapters: number,
  startChapter: number = 0,
  chapterList?: (string | number)[]
): UseChapterTitlesResult {
  const [titles, setTitles] = useState<Map<string | number, string>>(new Map());
  const [chapters, setChapters] = useState<ChapterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTitles() {
      try {
        setLoading(true);
        setError(null);

        const titleMap = new Map<string | number, string>();
        const chapterInfos: ChapterInfo[] = []; // Renamed to avoid confusion with state

        // Determine the list of chapters to fetch
        let idsToFetch: (string | number)[] = [];
        if (chapterList && chapterList.length > 0) {
          idsToFetch = chapterList;
        } else {
          idsToFetch = Array.from({ length: totalChapters }, (_, i) => i + startChapter);
        }

        const promises = idsToFetch.map((chapterId) => {
          return loadYamlFromFile(
            `${import.meta.env.BASE_URL}content/${sutraId}/chapter-${chapterId}.yml`
          ).then((data: unknown) => {
            const chapterData = data as {
              title?: string;
              number?: number | string;
              volume?: number;
              volumeTitle?: string;
            };
            if (chapterData && chapterData.title) {
              titleMap.set(chapterId, chapterData.title);
              chapterInfos.push({
                number: chapterData.number || chapterId, // Use explicitly provided number or the ID
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

        // Sort chapters
        // If chapterList was provided, we might want to respect that order, or sort by number if possible.
        // For now, let's sort based on the order in the list if provided, otherwise numeric.
        if (chapterList && chapterList.length > 0) {
          // Sort based on index in chapterList
          chapterInfos.sort((a, b) => {
            const idxA = chapterList.indexOf(a.number);
            const idxB = chapterList.indexOf(b.number);
            return idxA - idxB;
          });
        } else {
          chapterInfos.sort((a, b) => {
            if (typeof a.number === 'number' && typeof b.number === 'number') {
              return a.number - b.number;
            }
            return String(a.number).localeCompare(String(b.number));
          });
        }

        setTitles(titleMap);
        setChapters(chapterInfos);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }

    if (sutraId) {
      // Allow fetching if we have a list OR a count
      if ((chapterList && chapterList.length > 0) || totalChapters >= 0) {
        fetchTitles();
      }
    }
  }, [sutraId, totalChapters, startChapter, chapterList]);

  return { titles, chapters, loading, error };
}
