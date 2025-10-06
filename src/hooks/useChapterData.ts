import { useState, useEffect } from 'react';
import { loadYamlFromFile } from '../services/yamlParser';
import { validateChapter } from '../services/schemaValidator';
import type { Chapter } from '../types/chapter';

interface UseChapterDataResult {
  chapter: Chapter | null;
  loading: boolean;
  error: Error | null;
}

export function useChapterData(
  sutraId: string,
  chapterNum: number
): UseChapterDataResult {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchChapter() {
      try {
        setLoading(true);
        setError(null);

        const data = await loadYamlFromFile(
          `${import.meta.env.BASE_URL}content/${sutraId}/chapter-${chapterNum}.yml`
        );

        if (!validateChapter(data)) {
          throw new Error('Invalid chapter schema');
        }

        setChapter(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setChapter(null);
      } finally {
        setLoading(false);
      }
    }

    if (sutraId && chapterNum > 0) {
      fetchChapter();
    }
  }, [sutraId, chapterNum]);

  return { chapter, loading, error };
}
