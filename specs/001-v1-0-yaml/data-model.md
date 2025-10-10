# Data Model: Sutra Guide Website V1.0

**Date**: 2025-10-05
**Feature**: Sutra Guide Website V1.0
**Source**: Extracted from spec.md Key Entities + constitutional requirements

## Entity Relationships

```
Sutra (1) ──< (many) Chapter
Chapter (1) ──< (many) Annotation
Chapter (1) ──< (many) Illustration
```

## Entities

### Sutra

Represents a complete Buddhist scripture collection.

**Storage**: `public/content/{sutra-id}/meta.yml`

**Fields**:
| Field | Type | Required | Description | Constitutional Requirement |
|-------|------|----------|-------------|----------------------------|
| `id` | string | Yes | Unique identifier (e.g., "heart-sutra", "diamond-sutra") | FR-001: Single-level ID |
| `title` | string | Yes | Chinese title (e.g., "般若波羅蜜多心經") | FR-006: Display metadata |
| `titleEn` | string | No | Optional English title (e.g., "Heart Sutra") | FR-006: Display metadata |
| `tradition` | string | Yes | Buddhist tradition (e.g., "Mahayana", "Theravada", "Vajrayana") | FR-004: Source attribution |
| `translator` | string | Yes | Translator name (e.g., "玄奘法師", "Xuanzang") | Principle I: Translator must be identified |
| `translatorAttribution` | string | Yes | Full citation for translator (e.g., "唐三藏法師玄奘奉詔譯") | Principle I: Source attribution |
| `source` | string | Yes | Original text source (e.g., "大正新修大藏經第8冊 No.251") | Principle I: Source must be verifiable |
| `sourceAttribution` | string | Yes | Full bibliographic citation | Principle I: Source documentation |
| `description` | string | No | Brief introduction to the sutra | FR-006: Display metadata |
| `chapters` | number | Yes | Total number of chapters in this sutra | FR-007: TOC needs chapter count |

**Validation Rules**:
- `id` must match pattern `^[a-z0-9-]+$` (lowercase, numbers, hyphens only)
- `id` must be unique across all sutras
- `chapters` must be > 0
- `translator`, `translatorAttribution`, `source`, `sourceAttribution` are MANDATORY (constitutional requirement)

**Example YAML**:
```yaml
id: heart-sutra
title: 般若波羅蜜多心經
titleEn: Heart Sutra
tradition: Mahayana
translator: 玄奘法師
translatorAttribution: 唐三藏法師玄奘奉詔譯
source: 大正新修大藏經第8冊 No.251
sourceAttribution: "Taishō Tripitaka, Vol. 8, No. 251"
description: 濃縮般若思想精華，闡述「色即是空，空即是色」之甚深般若智慧。
chapters: 1
```

---

### Chapter

Represents a single chapter/section of a sutra.

**Storage**: `public/content/{sutra-id}/chapter-{number}.yml`

**Fields**:
| Field | Type | Required | Description | Constitutional Requirement |
|-------|------|----------|-------------|----------------------------|
| `schemaVersion` | string | Yes | Schema version (semver format, e.g., "1.0") | Data versioning |
| `sutraId` | string | Yes | Parent sutra identifier (matches Sutra.id) | Data integrity |
| `number` | number | Yes | Chapter sequence number (0-indexed, where 0 can be preface/序) | FR-007: TOC ordering |
| `title` | string | Yes | Chapter title (e.g., "第一品", "觀自在菩薩品", "金剛般若波羅蜜經序") | FR-008: TOC display |
| `originalText` | string | Yes | Classical Chinese text (multi-paragraph, `

` separated) | FR-003: Display original text |
| `translation` | string | No | Modern Chinese vernacular translation (multi-paragraph) - used in simple format | FR-003: Display translation |
| `detailedExplanation` | DetailedExplanation[] | No | Paragraph-by-paragraph explanation array (alternative to simple translation) | FR-038: Detailed commentary format |
| `annotations` | Annotation[] | No | Optional commentary array | FR-003: Display annotations |
| `practiceInsights` | string | No | Optional practice guidance (multi-paragraph, supports Markdown) | FR-003, FR-040: Display insights |
| `illustrations` | Illustration[] | No | Optional images array | FR-003: Display illustrations |
| `podcastTitle` | string | No | Podcast episode display title (clearer than chapter title) | FR-039: Clear podcast context |
| `podcastUrl` | string | No | External podcast episode URL | FR-012: Display podcast link |
| `transcript` | string | No | Podcast episode transcript (multi-paragraph, `\n\n` separated) | FR-012: Display transcript with podcast |
| `sourceAttribution` | string | No | Chapter-specific source citation (if differs from sutra-level) | Principle I: Per-chapter attribution |

**Validation Rules**:
- `sutraId` must reference an existing Sutra.id
- `number` must match filename pattern (e.g., `chapter-0.yml` → `number: 0`, `chapter-1.yml` → `number: 1`)
- `schemaVersion` must follow semver format (e.g., "1.0")
- `originalText` is MANDATORY (core content)
- Either `translation` OR `detailedExplanation` should be provided (at least one)
- `podcastUrl` must be valid URL if provided (starts with `http://` or `https://`)
- Paragraphs in text fields separated by double newline (`\n\n`)

**Example YAML**:
```yaml
sutraId: heart-sutra
number: 1
title: 般若波羅蜜多心經
originalText: |
  觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。

  舍利子，色不異空，空不異色，色即是空，空即是色，受想行識，亦復如是。

  舍利子，是諸法空相，不生不滅，不垢不淨，不增不減。

translation: |
  觀世音菩薩在修行甚深般若智慧時，清楚地照見五蘊（色、受、想、行、識）的本質都是空性，因而度脫了一切苦難。

  舍利弗啊，物質現象與空性並無差別，空性與物質現象也無差別；物質現象就是空性，空性就是物質現象。感受、思想、意志、認識也都是這樣。

  舍利弗啊，一切法的本性都是空相，不生不滅，不垢不淨，不增不減。

annotations:
  - paragraph: 1
    text: 「五蘊」指色、受、想、行、識五種構成人的要素，代表物質與精神的總和。
    source: 印順導師《般若經講記》

  - paragraph: 2
    text: 「色即是空，空即是色」是般若思想的核心，表達現象與本質的不二關係。
    source: 聖嚴法師《心經講記》

practiceInsights: |
  修行般若智慧的關鍵在於「照見」，不是概念理解，而是親證體悟。透過禪定與觀察，我們能直接體驗到五蘊的空性本質，從而放下執著，解脫煩惱。

  日常生活中，當遇到困境時，可以觀察自己的執著從何而來，練習以「空」的智慧看待得失成敗，逐漸培養出更自在的心境。

illustrations:
  - url: /images/heart-sutra/avalokitesvara.jpg
    alt: 觀自在菩薩行深般若波羅蜜多時之圖像
    caption: 觀世音菩薩入甚深禪定

podcastUrl: https://example.com/podcast/heart-sutra-ep1
transcript: |
  觀自在菩薩，行深般若波羅蜜多時，照見五蘊皆空，度一切苦厄。這段經文告訴我們，觀世音菩薩在修行深般若智慧的時候，清楚地看到五蘊的本質都是空性。

  五蘊是什麼呢？就是色、受、想、行、識，代表我們身心的五個層面。色是物質，受是感受，想是思想，行是意志行為，識是認知意識。

  當我們能夠照見這五蘊皆空時，就能度脫一切的苦厄。這裡的「空」不是什麼都沒有，而是指這些現象沒有固定不變的本質，都是因緣和合而生。
sourceAttribution: 同經典來源
```

---

### DetailedExplanation

Represents a paragraph-by-paragraph detailed explanation with original text, master's commentary, and vernacular translation.

**Storage**: Embedded within Chapter YAML as array (not separate file)

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `original` | string | Yes | Original text segment for this paragraph |
| `commentary` | string | No | Master's commentary (e.g., 六祖慧能註解) |
| `translation` | string | Yes | Vernacular translation of the commentary or original text |

**Validation Rules**:
- At least `original` and `translation` must be provided
- Used as an alternative to simple `translation` field for more structured content
- Supports Markdown formatting in `translation` field

**Example**:
```yaml
- original: |
    夫金剛經者，無相為宗，無住為體，玅有為用。
  commentary: |
    此段闡明金剛經之三大要義
  translation: |
    《金剛經》這部經典，以「無相」為根本宗旨，以「無住」為本體，以「妙有」為作用。
```

---

### Annotation

Represents a commentary or explanatory note for a specific paragraph.

**Storage**: Embedded within Chapter YAML (not separate file)

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `paragraph` | number | Yes | Which paragraph of `originalText` this annotates (1-indexed) |
| `text` | string | Yes | Annotation content (can be multi-paragraph) |
| `source` | string | Yes | Citation for this annotation (teacher, book, lineage) |

**Validation Rules**:
- `paragraph` must be <= number of paragraphs in `originalText`
- `source` is MANDATORY (constitutional requirement: cite all interpretations)

**Example**:
```yaml
paragraph: 2
text: 「色即是空，空即是色」是般若思想的核心，表達現象與本質的不二關係。
source: 聖嚴法師《心經講記》
```

---

### Illustration

Represents an image related to a chapter.

**Storage**: Embedded within Chapter YAML (image file stored separately)

**Fields**:
| Field | Type | Required | Description | Constitutional Requirement |
|-------|------|----------|-------------|----------------------------|
| `url` | string | Yes | Relative path to image (e.g., `/images/heart-sutra/image1.jpg`) | FR-003: Display illustrations |
| `alt` | string | Yes | Accessibility description for screen readers | Principle V: WCAG AA compliance |
| `caption` | string | No | Optional visible caption below image | FR-003: Display illustrations |

**Validation Rules**:
- `url` must be valid relative path starting with `/`
- `alt` is MANDATORY (accessibility requirement)
- Image files must exist at specified path

**Example**:
```yaml
url: /images/heart-sutra/avalokitesvara.jpg
alt: 觀自在菩薩行深般若波羅蜜多時之圖像
caption: 觀世音菩薩入甚深禪定
```

---

### ThemePreference

Represents user's UI preferences (not stored in YAML).

**Storage**: Browser localStorage

**Fields**:
| Field | Type | Values | Description |
|-------|------|--------|-------------|
| `mode` | string | 'light' \| 'dark' | Current theme mode |
| `fontSize` | string | 'small' \| 'medium' \| 'large' \| 'x-large' | Current font size preference (FR-044~048) |

**localStorage Keys**:
- Theme: `chakra-ui-color-mode` (Chakra UI default)
- Font Size: `fontSize` (custom key)

**Font Size Mapping**:
- `small`: 14px base font size
- `medium`: 16px base font size (default)
- `large`: 18px base font size
- `x-large`: 20px base font size

**Validation Rules**:
- Theme falls back to 'light' if localStorage unavailable (FR-019)
- Font size falls back to 'medium' if localStorage unavailable (FR-046)
- No server-side storage (stateless application)
- Font size applies globally to all text content (FR-047)

---

## File Naming Conventions

Per Constitution Principle IV and FR-002:

```
public/content/
├── {sutra-id}/
│   ├── meta.yml              # Sutra metadata
│   ├── chapter-1.yml         # Chapter 1
│   ├── chapter-2.yml         # Chapter 2
│   └── chapter-N.yml         # Chapter N
```

**Pattern**: `{sutra-id}/chapter-{number}.yml`

**Examples**:
- `heart-sutra/meta.yml`
- `heart-sutra/chapter-1.yml`
- `diamond-sutra/meta.yml`
- `diamond-sutra/chapter-32.yml`
- `platform-sutra/meta.yml`
- `platform-sutra/chapter-10.yml`

---

## Schema Version

All YAML files MUST include schema version for migration tracking:

```yaml
schemaVersion: "1.0"
# ... rest of content
```

Schema changes:
- **PATCH** (1.0 → 1.0.1): Add optional fields, fix descriptions
- **MINOR** (1.0 → 1.1): Add backward-compatible fields
- **MAJOR** (1.0 → 2.0): Breaking changes (require migration script)

---

## Data Integrity Rules

1. **Referential Integrity**: All `chapter.sutraId` must match existing `sutra.id`
2. **Filename Consistency**: `chapter-{N}.yml` filename must match `number: N` field
3. **Sequential Numbering**: Chapters should be numbered sequentially (1, 2, 3...) without gaps
4. **Source Attribution**: All content MUST cite sources (constitutional requirement)
5. **Schema Compliance**: All YAML files must validate against JSON Schema before display

---

## TypeScript Type Definitions

Types derived from this data model (to be implemented in Phase 2):

```typescript
// src/types/sutra.ts
export interface Sutra {
  id: string;
  title: string;
  titleEn?: string;
  tradition: string;
  translator: string;
  translatorAttribution: string;
  source: string;
  sourceAttribution: string;
  description?: string;
  chapters: number;
}

// src/types/chapter.ts
export interface Chapter {
  sutraId: string;
  number: number;
  title: string;
  originalText: string;
  translation: string;
  annotations?: Annotation[];
  practiceInsights?: string;
  illustrations?: Illustration[];
  podcastUrl?: string;
  transcript?: string;
  sourceAttribution?: string;
}

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

// src/types/theme.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemePreference {
  mode: ThemeMode;
}
```

---

**Next Phase**: Create JSON Schema contracts in `contracts/` directory
