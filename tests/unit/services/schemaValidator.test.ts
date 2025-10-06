import { describe, it, expect } from 'vitest';
import { validateSutraMeta, validateChapter } from '../../../src/services/schemaValidator';

describe('Schema Validator - Sutra Metadata', () => {
  it('should validate valid sutra metadata', () => {
    const validSutra = {
      schemaVersion: '1.0',
      id: 'heart-sutra',
      title: '般若波羅蜜多心經',
      titleEn: 'Heart Sutra',
      tradition: 'Mahayana',
      translator: '玄奘法師',
      translatorAttribution: '唐三藏法師玄奘奉詔譯',
      source: '大正新修大藏經第8冊 No.251',
      sourceAttribution: 'Taishō Tripitaka, Vol. 8, No. 251',
      description: '濃縮般若思想精華',
      chapters: 1,
    };

    const result = validateSutraMeta(validSutra);
    expect(result).toBe(true);
  });

  it('should fail when missing required field: id', () => {
    const invalidSutra = {
      schemaVersion: '1.0',
      title: '般若波羅蜜多心經',
      tradition: 'Mahayana',
      translator: '玄奘法師',
      translatorAttribution: '唐三藏法師玄奘奉詔譯',
      source: '大正新修大藏經第8冊 No.251',
      sourceAttribution: 'Taishō Tripitaka, Vol. 8, No. 251',
      chapters: 1,
    };

    const result = validateSutraMeta(invalidSutra);
    expect(result).toBe(false);
  });

  it('should fail when missing required field: translator', () => {
    const invalidSutra = {
      schemaVersion: '1.0',
      id: 'heart-sutra',
      title: '般若波羅蜜多心經',
      tradition: 'Mahayana',
      translatorAttribution: '唐三藏法師玄奘奉詔譯',
      source: '大正新修大藏經第8冊 No.251',
      sourceAttribution: 'Taishō Tripitaka, Vol. 8, No. 251',
      chapters: 1,
    };

    const result = validateSutraMeta(invalidSutra);
    expect(result).toBe(false);
  });

  it('should fail with invalid id pattern (uppercase)', () => {
    const invalidSutra = {
      schemaVersion: '1.0',
      id: 'Heart-Sutra',
      title: '般若波羅蜜多心經',
      tradition: 'Mahayana',
      translator: '玄奘法師',
      translatorAttribution: '唐三藏法師玄奘奉詔譯',
      source: '大正新修大藏經第8冊 No.251',
      sourceAttribution: 'Taishō Tripitaka, Vol. 8, No. 251',
      chapters: 1,
    };

    const result = validateSutraMeta(invalidSutra);
    expect(result).toBe(false);
  });

  it('should fail when missing translatorAttribution (constitutional requirement)', () => {
    const invalidSutra = {
      schemaVersion: '1.0',
      id: 'heart-sutra',
      title: '般若波羅蜜多心經',
      tradition: 'Mahayana',
      translator: '玄奘法師',
      source: '大正新修大藏經第8冊 No.251',
      sourceAttribution: 'Taishō Tripitaka, Vol. 8, No. 251',
      chapters: 1,
    };

    const result = validateSutraMeta(invalidSutra);
    expect(result).toBe(false);
  });
});

describe('Schema Validator - Chapter Content', () => {
  it('should validate valid chapter content', () => {
    const validChapter = {
      schemaVersion: '1.0',
      sutraId: 'heart-sutra',
      number: 1,
      title: '般若波羅蜜多心經',
      originalText: '觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。',
      translation: '觀世音菩薩在修行甚深般若智慧時，清楚地照見五蘊的本質都是空性。',
      annotations: [
        {
          paragraph: 1,
          text: '「五蘊」指色、受、想、行、識五種構成人的要素。',
          source: '印順導師《般若經講記》',
        },
      ],
      practiceInsights: '修行般若智慧的關鍵在於「照見」。',
      illustrations: [
        {
          url: '/images/heart-sutra/avalokitesvara.jpg',
          alt: '觀自在菩薩行深般若波羅蜜多時之圖像',
          caption: '觀世音菩薩入甚深禪定',
        },
      ],
      podcastUrl: 'https://example.com/podcast/heart-sutra-ep1',
      transcript: '觀自在菩薩，行深般若波羅蜜多時。',
    };

    const result = validateChapter(validChapter);
    expect(result).toBe(true);
  });

  it('should fail when missing required field: sutraId', () => {
    const invalidChapter = {
      schemaVersion: '1.0',
      number: 1,
      title: '般若波羅蜜多心經',
      originalText: '觀自在菩薩',
      translation: '觀世音菩薩',
    };

    const result = validateChapter(invalidChapter);
    expect(result).toBe(false);
  });

  it('should fail when missing required field: originalText', () => {
    const invalidChapter = {
      schemaVersion: '1.0',
      sutraId: 'heart-sutra',
      number: 1,
      title: '般若波羅蜜多心經',
      translation: '觀世音菩薩',
    };

    const result = validateChapter(invalidChapter);
    expect(result).toBe(false);
  });

  it('should fail with invalid podcastUrl format', () => {
    const invalidChapter = {
      schemaVersion: '1.0',
      sutraId: 'heart-sutra',
      number: 1,
      title: '般若波羅蜜多心經',
      originalText: '觀自在菩薩',
      translation: '觀世音菩薩',
      podcastUrl: 'not-a-valid-url',
    };

    const result = validateChapter(invalidChapter);
    expect(result).toBe(false);
  });

  it('should fail when annotation missing source (constitutional requirement)', () => {
    const invalidChapter = {
      schemaVersion: '1.0',
      sutraId: 'heart-sutra',
      number: 1,
      title: '般若波羅蜜多心經',
      originalText: '觀自在菩薩',
      translation: '觀世音菩薩',
      annotations: [
        {
          paragraph: 1,
          text: '「五蘊」指色、受、想、行、識。',
          // missing source field
        },
      ],
    };

    const result = validateChapter(invalidChapter);
    expect(result).toBe(false);
  });

  it('should fail when illustration missing alt (accessibility requirement)', () => {
    const invalidChapter = {
      schemaVersion: '1.0',
      sutraId: 'heart-sutra',
      number: 1,
      title: '般若波羅蜜多心經',
      originalText: '觀自在菩薩',
      translation: '觀世音菩薩',
      illustrations: [
        {
          url: '/images/heart-sutra/image.jpg',
          // missing alt field
        },
      ],
    };

    const result = validateChapter(invalidChapter);
    expect(result).toBe(false);
  });
});
