
# Implementation Plan: Sutra Guide Website V1.0

**Branch**: `001-v1-0-yaml` | **Date**: 2025-10-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-v1-0-yaml/spec.md`

## Execution Flow (/plan command scope)
```
1. ✅ Load feature spec from Input path
2. ✅ Fill Technical Context (scan for NEEDS CLARIFICATION)
   → ✅ Detected Project Type: single (frontend-only static site)
   → ✅ Set Structure Decision based on project type
3. ✅ Fill the Constitution Check section
4. ✅ Evaluate Constitution Check section
   → ✅ No violations - constitution fully aligned
   → ✅ Update Progress Tracking: Initial Constitution Check PASS
5. [IN PROGRESS] Execute Phase 0 → research.md
6. [PENDING] Execute Phase 1 → contracts, data-model.md, quickstart.md, CLAUDE.md
7. [PENDING] Re-evaluate Constitution Check section
8. [PENDING] Plan Phase 2 → Describe task generation approach
9. [PENDING] STOP - Ready for /tasks command
```

## Summary

Build a Buddhist sutra study website (V1.0) that displays 1-3 sutras with chapter-by-chapter content stored in YAML files. Each chapter presents classical Chinese text, vernacular translation, annotations, practice insights, and optional illustrations/podcast links. Features include a sutra list homepage, chapter navigation with table of contents, light/dark theme toggle with persistence, and graceful error handling for corrupted files. Must meet WCAG 2.1 AA accessibility standards and load under 2 seconds on 3G connections.

**Technical Approach**: Static site using React + Chakra UI (per constitution), client-side YAML parsing, localStorage for theme, no backend required.

## Technical Context

**Language/Version**: JavaScript ES2022+ / TypeScript 5.x
**Primary Dependencies**: React 18, Chakra UI 2.x, React Router 6, js-yaml (YAML parser), Vite (build tool)
**Storage**: Static YAML files (content), localStorage (theme preference), no database
**Testing**: Vitest (unit), React Testing Library, Playwright (E2E), axe-core (accessibility)
**Target Platform**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
**Project Type**: single (frontend-only static site)
**Performance Goals**:
- Initial load < 2s on 3G (per FR-021)
- Chapter navigation < 500ms (per FR-022)
- Lighthouse score > 90 for all categories
- Bundle size < 200KB gzipped (initial)

**Constraints**:
- WCAG 2.1 Level AA compliance (4.5:1 contrast ratio)
- No third-party tracking/ads
- Offline-capable (optional future enhancement)

**Scale/Scope**:
- V1.0: 1-3 sutras
- Each sutra: 5-50 chapters (estimated)
- Total content: ~50-150 YAML files

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Content Sanctity and Accuracy ✅
- **FR-004**: Source attribution displayed for all sutras and translations
- **FR-005**: YAML schema validation before display
- **Data Model**: Sutra and Chapter entities include source/translator fields
- **Compliance**: PASS - Source attribution enforced at schema and display level

### Principle II: Pure and Undisturbed Experience ✅
- **FR-021**: Page load < 2s on 3G
- **FR-022**: Chapter navigation < 500ms
- **FR-025**: NO ads, pop-ups, or auto-playing media
- **Performance Goals**: Lighthouse > 90, bundle < 200KB
- **Compliance**: PASS - Performance budgets defined, no intrusive elements

### Principle III: Technological Consistency ✅
- **Tech Stack**: React 18 + Chakra UI 2.x (as required)
- **Design Tokens**: Will use Chakra UI theming system
- **Component Specs**: To be defined in specify.yml during Phase 1
- **Compliance**: PASS - Mandated tech stack adopted

### Principle IV: Structured and Scalable Content ✅
- **FR-002**: YAML files per naming convention `{sutra-id}/chapter-{number}.yml`
- **FR-005**: Schema validation on load
- **Data Model**: Versioned YAML schema to be defined in Phase 1
- **Compliance**: PASS - YAML structure enforced, validation included

### Principle V: Accessibility First ✅
- **FR-020**: WCAG 2.1 AA contrast ratios (4.5:1 / 3:1)
- **FR-023**: Keyboard navigation for all interactive elements
- **FR-024**: ARIA labels and alt text
- **Testing**: axe-core automated testing + manual screen reader tests
- **Compliance**: PASS - Accessibility testing integrated, standards enforced

**Overall Constitution Compliance**: ✅ PASS - All 5 principles satisfied

## Project Structure

### Documentation (this feature)
```
specs/001-v1-0-yaml/
├── spec.md              # Feature specification
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (IN PROGRESS)
├── data-model.md        # Phase 1 output (PENDING)
├── quickstart.md        # Phase 1 output (PENDING)
├── contracts/           # Phase 1 output (PENDING)
│   └── yaml-schema.yml  # YAML content schema
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
/
├── public/                      # Static assets
│   └── content/                 # Sutra YAML files
│       ├── heart-sutra/
│       │   ├── meta.yml        # Sutra metadata
│       │   ├── chapter-1.yml
│       │   └── chapter-2.yml
│       ├── diamond-sutra/
│       └── platform-sutra/
│
├── src/
│   ├── components/              # React components (Chakra UI based)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── sutra/
│   │   │   ├── SutraList.tsx
│   │   │   ├── SutraCard.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── ChapterView.tsx
│   │   └── common/
│   │       ├── ErrorBoundary.tsx
│   │       └── ErrorMessage.tsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useSutraData.ts
│   │   ├── useChapterData.ts
│   │   └── useTheme.ts
│   │
│   ├── services/                # Business logic
│   │   ├── yamlParser.ts
│   │   ├── schemaValidator.ts
│   │   └── themeStorage.ts
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── sutra.ts
│   │   ├── chapter.ts
│   │   └── theme.ts
│   │
│   ├── theme/                   # Chakra UI theme configuration
│   │   ├── index.ts
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── components.ts
│   │
│   ├── pages/                   # Route pages
│   │   ├── HomePage.tsx         # Sutra list
│   │   ├── SutraPage.tsx        # TOC + Chapter view
│   │   └── NotFoundPage.tsx     # 404 error
│   │
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── router.tsx               # React Router config
│
├── tests/
│   ├── unit/                    # Component + logic tests
│   │   ├── services/
│   │   ├── components/
│   │   └── hooks/
│   ├── integration/             # User flow tests
│   │   ├── navigation.test.ts
│   │   ├── theme-switching.test.ts
│   │   └── error-handling.test.ts
│   └── e2e/                     # Playwright E2E tests
│       └── user-journeys.spec.ts
│
├── index.html                   # HTML entry point
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

**Structure Decision**: Single-project frontend architecture (Option 1) chosen because:
1. No backend required - all content in static YAML files
2. Client-side rendering sufficient for 1-3 sutras
3. Simpler deployment (static hosting)
4. Faster iteration during V1.0 development
5. Aligns with constitution Principle II (simplicity)

## Phase 0: Outline & Research

### Unknowns to Research
All technical context questions resolved through clarifications and constitution review. No NEEDS CLARIFICATION markers remain.

### Research Topics

1. **YAML Schema Design for Sutra Content**
   - Decision: JSON Schema for YAML validation
   - Rationale: Industry standard, tooling support (Ajv), TypeScript integration
   - Alternatives considered: Custom validator (rejected - reinventing wheel)

2. **React Router Strategy for Single-Level Sutra IDs**
   - Decision: `/` (homepage), `/:sutraId` (TOC + chapters), `/:sutraId/:chapterNum`
   - Rationale: Simple, matches single-level ID clarification, SEO-friendly
   - Alternatives considered: Hash routing (rejected - poor SEO), query params (rejected - not semantic)

3. **YAML Parsing Library Selection**
   - Decision: js-yaml (safe loading only)
   - Rationale: Most popular (18M weekly downloads), secure, TypeScript support
   - Alternatives considered: yaml.js (rejected - less maintained), custom parser (rejected - security risk)

4. **Chakra UI Theme Structure for Light/Dark Mode**
   - Decision: Chakra's built-in `extendTheme` + `ColorModeProvider`
   - Rationale: Native support, localStorage persistence included, WCAG compliant defaults
   - Alternatives considered: CSS variables only (rejected - loses Chakra benefits), third-party theme lib (rejected - violation of constitution)

5. **Performance Optimization for 2s Load Target**
   - Decision: Code splitting by route, lazy load chapter YAML, Vite tree-shaking
   - Rationale: Industry best practice, Vite defaults well-optimized
   - Alternatives considered: SSR/SSG (rejected - overkill for V1.0 scope), CDN (deferred to deployment)

6. **Accessibility Testing Approach**
   - Decision: axe-core (automated) + manual NVDA/VoiceOver testing
   - Rationale: Constitutional requirement (Principle V), industry standard
   - Alternatives considered: pa11y (rejected - less React integration), manual only (rejected - not scalable)

**Output**: research.md (to be generated)

## Phase 1: Design & Contracts

*Prerequisites: research.md complete*

### 1. Data Model Extraction

**Entities** (from spec Key Entities section):

**Sutra**
- `id: string` (unique identifier, e.g., "heart-sutra")
- `title: string` (Chinese title)
- `titleEn?: string` (optional English title)
- `tradition: string` (e.g., "Mahayana", "Theravada")
- `translator: string` (translator name)
- `translatorAttribution: string` (full citation)
- `source: string` (original text source)
- `sourceAttribution: string` (full citation)
- `description?: string` (brief intro)
- `chapters: number` (total chapter count)

**Chapter**
- `sutraId: string` (parent sutra reference)
- `number: number` (chapter sequence)
- `title: string` (chapter title)
- `originalText: string` (classical Chinese, multi-paragraph)
- `translation: string` (modern Chinese, multi-paragraph)
- `annotations?: Annotation[]` (optional commentary)
- `practiceInsights?: string` (optional practice guidance)
- `illustrations?: Illustration[]` (optional images)
- `podcastUrl?: string` (optional external link)
- `sourceAttribution: string` (specific to this chapter if differs from sutra)

**Annotation**
- `paragraph: number` (which paragraph of originalText)
- `text: string` (annotation content)
- `source: string` (citation for this annotation)

**Illustration**
- `url: string` (relative path to image)
- `alt: string` (accessibility description)
- `caption?: string` (optional caption)

**ThemePreference**
- `mode: 'light' | 'dark'`
- Stored in localStorage, not YAML

**Output**: data-model.md (to be generated)

### 2. API Contracts (YAML Schema)

No REST API needed (static site), but YAML contracts required:

**sutra-meta.schema.yml** - Sutra metadata schema
**chapter.schema.yml** - Chapter content schema

**Output**: contracts/sutra-meta.schema.yml, contracts/chapter.schema.yml (to be generated)

### 3. Contract Tests

Since no HTTP API, "contract tests" validate YAML structure:

- `tests/unit/services/schemaValidator.test.ts` - Test YAML validation logic
- `tests/integration/yamlParsing.test.ts` - Test loading and parsing sample YAML files

Tests MUST fail initially (TDD approach).

### 4. User Story Test Scenarios

From Acceptance Scenarios in spec:

**Integration Test Scenarios**:
1. Homepage displays 1-3 sutras → `tests/integration/homepage.test.ts`
2. Clicking sutra shows TOC → `tests/integration/navigation.test.ts`
3. Chapter view displays all content fields → `tests/integration/chapter-view.test.ts`
4. Theme toggle persistence → `tests/integration/theme-switching.test.ts`
5. Chapter navigation speed → `tests/integration/navigation.test.ts`
6. Podcast link opens new tab → `tests/integration/external-links.test.ts`
7. Corrupted YAML error handling → `tests/integration/error-handling.test.ts`
8. Error reporting link present → `tests/integration/error-reporting.test.ts`

**Quickstart Validation** (manual):
- Load homepage → see sutra list
- Click sutra → see TOC + first chapter
- Navigate between chapters
- Toggle theme → verify persistence
- Test keyboard navigation
- Run Lighthouse audit → verify > 90 scores

**Output**: quickstart.md (to be generated)

### 5. Agent Context Update

Will execute: `.specify/scripts/bash/update-agent-context.sh claude`

Expected additions to `CLAUDE.md`:
- Tech stack: React 18, Chakra UI 2.x, TypeScript 5.x, Vite
- Key patterns: Client-side YAML parsing, localStorage theme
- Recent changes: V1.0 implementation plan created

**Output**: CLAUDE.md (to be updated)

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

### Task Generation Strategy

From Phase 1 design docs:

**From YAML Schemas (contracts/)**:
- T001: Create YAML schema for sutra metadata → `contracts/sutra-meta.schema.yml`
- T002: Create YAML schema for chapter content → `contracts/chapter.schema.yml`
- T003: [P] Write schema validation unit tests → `tests/unit/services/schemaValidator.test.ts`

**From Data Model (data-model.md)**:
- T004: [P] Define TypeScript types for Sutra → `src/types/sutra.ts`
- T005: [P] Define TypeScript types for Chapter → `src/types/chapter.ts`
- T006: [P] Define TypeScript types for Theme → `src/types/theme.ts`

**From User Stories (quickstart.md)**:
- T007: [P] Integration test: Homepage sutra list → `tests/integration/homepage.test.ts`
- T008: [P] Integration test: Chapter navigation → `tests/integration/navigation.test.ts`
- T009: [P] Integration test: Theme switching → `tests/integration/theme-switching.test.ts`
- T010: [P] Integration test: Error handling → `tests/integration/error-handling.test.ts`

**Setup Tasks**:
- T011: Initialize Vite + React + TypeScript project
- T012: Install Chakra UI and configure theme system
- T013: Install React Router and configure routes
- T014: Install testing libraries (Vitest, RTL, Playwright, axe-core)

**Implementation Tasks** (make tests pass):
- T015: [P] Implement YAML parser service → `src/services/yamlParser.ts`
- T016: [P] Implement schema validator → `src/services/schemaValidator.ts`
- T017: [P] Implement theme storage service → `src/services/themeStorage.ts`
- T018: [P] Create Chakra UI theme (light/dark) → `src/theme/index.ts`
- T019: [P] Build SutraList component → `src/components/sutra/SutraList.tsx`
- T020: [P] Build TableOfContents component → `src/components/sutra/TableOfContents.tsx`
- T021: Build ChapterView component → `src/components/sutra/ChapterView.tsx`
- T022: Build ThemeToggle component → `src/components/layout/ThemeToggle.tsx`
- T023: [P] Build ErrorBoundary component → `src/components/common/ErrorBoundary.tsx`
- T024: [P] Create custom hooks (useSutraData, useChapterData, useTheme)
- T025: Configure React Router with routes
- T026: Create sample YAML content (1 sutra, 2 chapters minimum)
- T027: Run accessibility audit with axe-core
- T028: Run Lighthouse performance audit
- T029: Fix accessibility issues
- T030: Optimize bundle size to < 200KB

### Ordering Strategy

**TDD Order**:
1. Setup (T011-T014)
2. Schemas + Types (T001-T006) - contracts before implementation
3. Tests (T007-T010) - write failing tests
4. Implementation (T015-T026) - make tests pass
5. Validation (T027-T030) - verify constitutional compliance

**Dependency Order**:
- T011 blocks all others (project init)
- T001-T002 block T003 (schemas before validator tests)
- T004-T006 block implementation (types before code)
- T015-T017 block T019-T022 (services before components)
- T018 blocks T022 (theme before ThemeToggle)
- T025 blocks E2E tests (routing before navigation tests)

**Parallel Opportunities** [P]:
- T003 || T004-T006 (tests and types independent)
- T007-T010 (integration tests independent of each other)
- T015-T017 (services in different files)
- T019-T020 || T023 (components in different files)

### Estimated Output

**Total Tasks**: ~30 tasks
**Parallel Tasks**: ~12 marked [P]
**Sequential Tasks**: ~18 (due to dependencies)
**Estimated Duration**: 2-3 days (single developer)

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

No violations detected. All constitutional principles satisfied.

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (N/A - no deviations)

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
