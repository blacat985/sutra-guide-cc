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
  volume?: number;
  volumeTitle?: string;
  title: string;
  gist?: string;
  originalText: string;
  translation: string;
  annotations?: Annotation[];
  practiceInsights?: string;
  illustrations?: Illustration[];
  podcastTitle?: string;
  podcastUrl?: string;
  pdfUrl?: string;
  pdfTitle?: string;
  transcript?: string;
  videoUrl?: string;
  videoTitle?: string;
  audioUrl?: string;
  audioTitle?: string;
  sourceAttribution?: string;
  detailedExplanation?: DetailedExplanation[];
}

export interface DetailedExplanation {
  original: string;
  translation?: string;
  commentary?: string;
  commentaryTranslation?: string;
}
