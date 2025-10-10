export interface Annotation {
  paragraph: number;
  text: string;
  source: string;
}

export interface Illustration {
  url: string;
  alt: string;
  caption?: string;
}

export interface Chapter {
  schemaVersion?: string;
  sutraId: string;
  number: number;
  title: string;
  originalText: string;
  translation: string;
  annotations?: Annotation[];
  practiceInsights?: string;
  illustrations?: Illustration[];
  podcastTitle?: string;
  podcastUrl?: string;
  transcript?: string;
  sourceAttribution?: string;
  detailedExplanation?: DetailedExplanation[];
}

export interface DetailedExplanation {
  original: string;
  translation?: string;
  commentary?: string;
  commentaryTranslation?: string;
}
