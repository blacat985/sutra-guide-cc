import { useState, useEffect } from 'react';
import { loadYamlFromFile } from '../services/yamlParser';
import { validateSutraMeta } from '../services/schemaValidator';
import type { Sutra } from '../types/sutra';

interface UseSutraDataResult {
  sutra: Sutra | null;
  loading: boolean;
  error: Error | null;
}

export function useSutraData(sutraId: string): UseSutraDataResult {
  const [sutra, setSutra] = useState<Sutra | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSutra() {
      try {
        setLoading(true);
        setError(null);

        const data = await loadYamlFromFile(`${import.meta.env.BASE_URL}content/${sutraId}/meta.yml`);

        if (!validateSutraMeta(data)) {
          throw new Error('Invalid sutra metadata schema');
        }

        setSutra(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setSutra(null);
      } finally {
        setLoading(false);
      }
    }

    if (sutraId) {
      fetchSutra();
    }
  }, [sutraId]);

  return { sutra, loading, error };
}

// Hook to load all sutras from a list
export function useAllSutras(): UseSutraDataResult & { sutras: Sutra[] } {
  const [sutras, setSutras] = useState<Sutra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAllSutras() {
      try {
        setLoading(true);
        setError(null);

        // For V1.0, we'll hardcode the list of sutras
        // In V2.0, this could be dynamically discovered
        const sutraIds = ['diamond-sutra', 'heart-sutra', 'samyukta-agama']; // Expand as needed

        const sutraPromises = sutraIds.map(async (id) => {
          const data = await loadYamlFromFile(`${import.meta.env.BASE_URL}content/${id}/meta.yml`);
          if (validateSutraMeta(data)) {
            return data;
          }
          throw new Error(`Invalid metadata for ${id}`);
        });

        const results = await Promise.all(sutraPromises);
        setSutras(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setSutras([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllSutras();
  }, []);

  return { sutra: sutras[0] || null, sutras, loading, error };
}
