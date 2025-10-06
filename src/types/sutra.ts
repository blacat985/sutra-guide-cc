export interface Sutra {
  schemaVersion?: string;
  id: string;
  title: string;
  titleEn?: string;
  tradition: 'Mahayana' | 'Theravada' | 'Vajrayana' | 'Other';
  translator: string;
  translatorAttribution: string;
  source: string;
  sourceAttribution: string;
  description?: string;
  chapters: number;
}
