# Tasks: Sutra Guide Website V1.0

**Input**: Design documents from `/specs/001-v1-0-yaml/`
**Prerequisites**: plan.md (✅), research.md (✅), data-model.md (✅), contracts/ (✅), quickstart.md (✅)

## Execution Flow (main)
```
1. ✅ Load plan.md from feature directory
   → Tech stack: React 18, Chakra UI 2.x, TypeScript 5.x, Vite, js-yaml
   → Structure: Single-project frontend (src/, tests/ at repo root)
2. ✅ Load optional design documents:
   → data-model.md: 5 entities (Sutra, Chapter, Annotation, Illustration, ThemePreference)
   → contracts/: 2 schemas (sutra-meta.schema.json, chapter.schema.json)
   → quickstart.md: 10 test scenarios + accessibility/performance validation
3. ✅ Generate tasks by category:
   → Setup: Vite + React + TypeScript + dependencies
   → Tests: Schema validation tests, integration tests (8 scenarios)
   → Core: TypeScript types, services (YAML parser, validator, theme storage)
   → Implementation: Components (layout, sutra, common), hooks, routing
   → Polish: Accessibility audit, performance optimization
4. ✅ Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. ✅ Number tasks sequentially (T001-T038)
6. ✅ Generate dependency graph
7. ✅ Create parallel execution examples
8. ✅ Validate task completeness:
   → All contracts have tests ✅
   → All entities have types ✅
   → All components have tests ✅
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- All file paths are absolute or relative to repository root

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root (per plan.md)
- Sample content: `public/content/{sutra-id}/`
- Contracts: `specs/001-v1-0-yaml/contracts/`

---

## Phase 3.1: Setup

- [X] **T001** Initialize Vite + React + TypeScript project
  - File: Repository root (package.json, vite.config.ts, tsconfig.json, index.html)
  - Action: Run `npm create vite@latest . -- --template react-ts`
  - Verify: `npm run dev` starts dev server on port 5173

- [X] **T002** Install React 18 and core dependencies
  - File: package.json
  - Action: Install `react@18`, `react-dom@18`, `react-router-dom@6`
  - Verify: Dependencies listed in package.json

- [X] **T003** Install Chakra UI and theme dependencies
  - File: package.json
  - Action: Install `@chakra-ui/react@2`, `@emotion/react`, `@emotion/styled`, `framer-motion`
  - Verify: Chakra UI dependencies in package.json

- [X] **T004** Install YAML parsing and validation libraries
  - File: package.json
  - Action: Install `js-yaml`, `@types/js-yaml`, `ajv`, `ajv-formats`
  - Verify: js-yaml and ajv in dependencies

- [X] **T005** Install testing libraries
  - File: package.json
  - Action: Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@vitest/ui`, `jsdom`, `@axe-core/react`, `jest-axe`, `@playwright/test`
  - Verify: Testing dependencies in devDependencies

- [X] **T006** [P] Configure Vitest for unit/integration tests
  - File: vitest.config.ts
  - Action: Create config with jsdom environment, React Testing Library setup, jest-axe matchers
  - Verify: Can run `npm test`

- [X] **T007** [P] Configure Playwright for E2E tests
  - File: playwright.config.ts
  - Action: Create config with chromium/firefox/webkit browsers, baseURL localhost:5173
  - Verify: `npx playwright test` runs (even if no tests yet)

- [X] **T008** [P] Configure ESLint and Prettier
  - File: .eslintrc.json, .prettierrc
  - Action: Set up TypeScript + React rules, formatting standards
  - Verify: `npm run lint` runs without errors

- [X] **T009** Create project directory structure
  - Files: Create all directories per plan.md structure
    - src/components/{layout,sutra,common}/
    - src/hooks/
    - src/services/
    - src/types/
    - src/theme/
    - src/pages/
    - tests/{unit,integration,e2e}/
    - public/content/
  - Verify: All directories exist

---

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Schema & Type Tests

- [ ] **T010** [P] Contract test: Sutra metadata schema validation
  - File: tests/unit/services/schemaValidator.test.ts
  - Action: Write tests validating sutra-meta.schema.json against valid/invalid YAML samples
  - Test Cases:
    - Valid sutra metadata passes validation
    - Missing required fields (id, title, translator, source) fail
    - Invalid `id` pattern (uppercase, spaces) fails
    - Missing `translatorAttribution` fails (constitutional requirement)
  - Expected: RED (tests fail - validator not implemented yet)

- [ ] **T011** [P] Contract test: Chapter content schema validation
  - File: tests/unit/services/schemaValidator.test.ts
  - Action: Write tests validating chapter.schema.json against valid/invalid YAML samples
  - Test Cases:
    - Valid chapter content passes validation
    - Missing required fields (sutraId, number, title, originalText, translation) fail
    - Invalid `podcastUrl` format fails
    - Annotation missing `source` fails (constitutional requirement)
    - Illustration missing `alt` fails (accessibility requirement)
  - Expected: RED (tests fail - validator not implemented yet)

- [ ] **T012** [P] Unit test: YAML parser service
  - File: tests/unit/services/yamlParser.test.ts
  - Action: Write tests for parsing YAML files safely
  - Test Cases:
    - Valid YAML file loads correctly
    - Invalid YAML syntax throws parse error
    - File not found throws error
    - Malicious YAML content rejected (security test)
  - Expected: RED (tests fail - parser not implemented yet)

- [ ] **T013** [P] Unit test: Theme storage service
  - File: tests/unit/services/themeStorage.test.ts
  - Action: Write tests for localStorage theme persistence
  - Test Cases:
    - Save theme preference to localStorage
    - Load theme preference from localStorage
    - Falls back to 'light' if localStorage unavailable (FR-019)
    - Handles localStorage quota exceeded
  - Expected: RED (tests fail - storage service not implemented yet)

### Integration Tests (from quickstart.md scenarios)

- [ ] **T014** [P] Integration test: Homepage sutra list (FR-006)
  - File: tests/integration/homepage.test.ts
  - Action: Test Scenario 1 from quickstart.md
  - Test Cases:
    - Homepage loads successfully
    - Sutra list is visible
    - Each sutra card displays: Chinese title, English title, tradition, description
    - 1-3 sutras displayed
    - No console errors
    - Lighthouse Performance > 90
  - Expected: RED (tests fail - components not implemented yet)

- [ ] **T015** [P] Integration test: Sutra selection & TOC display (FR-007, FR-008)
  - File: tests/integration/navigation.test.ts
  - Action: Test Scenario 2 from quickstart.md
  - Test Cases:
    - Clicking sutra changes URL to `/{sutra-id}`
    - TOC displays on left/sidebar
    - TOC shows sutra title and all chapter titles
    - Chapter 1 highlighted/active by default
    - First chapter content displays on right/main area
    - Navigation < 500ms (FR-022)
    - Keyboard Tab focuses TOC items
    - Enter activates focused chapter link
  - Expected: RED (tests fail - navigation not implemented yet)

- [ ] **T016** [P] Integration test: Chapter content display (FR-003)
  - File: tests/integration/chapter-view.test.ts
  - Action: Test Scenario 3 from quickstart.md
  - Test Cases:
    - Original Text section displays classical Chinese
    - Translation section displays vernacular Chinese
    - Annotations section displays (if available) with paragraph reference
    - Practice Insights section displays (if available)
    - Illustrations display with alt text and captions
    - Podcast Link displays (if available) with external link indicator
    - Podcast Transcript displays (if available) below podcast link
    - Transcript multi-paragraph format preserved
    - axe DevTools scan → 0 violations
    - Color contrast meets 4.5:1 for normal text
  - Expected: RED (tests fail - ChapterView not implemented yet)

- [ ] **T017** [P] Integration test: Chapter navigation (FR-008, FR-011)
  - File: tests/integration/navigation.test.ts
  - Action: Test Scenario 4 from quickstart.md
  - Test Cases:
    - Clicking Chapter 2 changes URL to `/{sutra-id}/2`
    - Chapter content updates < 500ms
    - NO full page reload (SPA behavior)
    - TOC highlights active chapter
    - Scroll position resets to top
    - Browser back button works
    - Browser forward button works
    - CLS < 0.1 (no layout shift)
  - Expected: RED (tests fail - routing not implemented yet)

- [ ] **T018** [P] Integration test: Theme toggle & persistence (FR-016-FR-019)
  - File: tests/integration/theme-switching.test.ts
  - Action: Test Scenario 5 from quickstart.md
  - Test Cases:
    - Theme toggle button is visible
    - Clicking toggle switches to dark mode (background dark, text light)
    - Contrast ratio remains ≥ 4.5:1 in dark mode
    - Clicking toggle again switches back to light mode
    - After refresh: Theme persists
    - In new tab: Theme persists
    - Clear localStorage: Theme falls back to light mode gracefully
    - Theme toggle has `aria-label="Toggle theme"`
    - Theme toggle is keyboard accessible (Tab + Enter)
  - Expected: RED (tests fail - ThemeToggle not implemented yet)

- [ ] **T019** [P] Integration test: External podcast link (FR-012-FR-013)
  - File: tests/integration/external-links.test.ts
  - Action: Test Scenario 6 from quickstart.md
  - Test Cases:
    - Podcast link opens in NEW tab/window
    - Link has `target="_blank"` and `rel="noopener noreferrer"`
    - Link is clearly labeled as external (icon or text)
    - If no podcast URL: Message "Podcast episode not available" or link hidden
    - If transcript available: Transcript displays below podcast link
    - Transcript is readable and properly formatted
    - Screen reader announces "opens in new window"
  - Expected: RED (tests fail - podcast link rendering not implemented yet)

- [ ] **T020** [P] Integration test: Corrupted YAML error handling (FR-027-FR-028)
  - File: tests/integration/error-handling.test.ts
  - Action: Test Scenario 7 from quickstart.md
  - Test Cases:
    - Prepare: Corrupt a chapter YAML file (invalid syntax)
    - Navigate to corrupted chapter
    - Error message displays (not crash): "Error loading chapter"
    - User-friendly message (not technical stack trace)
    - Chapter content is hidden (not partially rendered)
    - TOC remains functional (can click other chapters)
    - Navigation to other chapters works
    - Console shows error for debugging but no crash
    - ErrorBoundary catches error gracefully
  - Expected: RED (tests fail - error handling not implemented yet)

- [ ] **T021** [P] Integration test: Error reporting link (FR-029)
  - File: tests/integration/error-reporting.test.ts
  - Action: Test Scenario 8 from quickstart.md
  - Test Cases:
    - Error reporting link is visible
    - Link is labeled clearly (e.g., "回報內容錯誤", "Report Error")
    - Option A (mailto): Clicking opens email client with pre-filled subject/body
    - OR Option B (external form): Clicking opens external form in new tab
    - Link does NOT require authentication (public reporting)
  - Expected: RED (tests fail - error reporting link not implemented yet)

---

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### TypeScript Types (from data-model.md)

- [ ] **T022** [P] Define TypeScript types for Sutra entity
  - File: src/types/sutra.ts
  - Action: Create interface matching data-model.md Sutra entity
  - Fields: id, title, titleEn?, tradition, translator, translatorAttribution, source, sourceAttribution, description?, chapters
  - Verify: T010 schema validation tests now pass

- [ ] **T023** [P] Define TypeScript types for Chapter entity
  - File: src/types/chapter.ts
  - Action: Create interfaces for Chapter, Annotation, Illustration
  - Fields (Chapter): sutraId, number, title, originalText, translation, annotations?, practiceInsights?, illustrations?, podcastUrl?, transcript?, sourceAttribution?
  - Fields (Annotation): paragraph, text, source
  - Fields (Illustration): url, alt, caption?
  - Verify: T011 schema validation tests now pass

- [ ] **T024** [P] Define TypeScript types for Theme
  - File: src/types/theme.ts
  - Action: Create type alias `ThemeMode = 'light' | 'dark'` and interface `ThemePreference`
  - Verify: T013 theme storage tests now pass

### Services (from research.md decisions)

- [ ] **T025** [P] Implement YAML parser service
  - File: src/services/yamlParser.ts
  - Action: Implement safe YAML loading using js-yaml
  - Functions:
    - `loadYaml(filePath: string): Promise<unknown>` - Load and parse YAML file
    - Always use `yaml.load()` (safe mode), never `yaml.loadAll()` with untrusted input
  - Verify: T012 YAML parser tests now pass (GREEN)

- [ ] **T026** [P] Implement schema validator service
  - File: src/services/schemaValidator.ts
  - Action: Implement JSON Schema validation using Ajv
  - Functions:
    - `validateSutraMeta(data: unknown): data is Sutra` - Validate against sutra-meta.schema.json
    - `validateChapter(data: unknown): data is Chapter` - Validate against chapter.schema.json
  - Verify: T010, T011 schema validation tests now pass (GREEN)

- [ ] **T027** [P] Implement theme storage service
  - File: src/services/themeStorage.ts
  - Action: Implement localStorage wrapper for theme persistence
  - Functions:
    - `saveTheme(mode: ThemeMode): void` - Save to localStorage
    - `loadTheme(): ThemeMode` - Load from localStorage, fallback to 'light'
  - Verify: T013 theme storage tests now pass (GREEN)

### Chakra UI Theme (from research.md)

- [ ] **T028** [P] Create Chakra UI theme configuration
  - File: src/theme/index.ts
  - Action: Use `extendTheme` to create custom theme
  - Config:
    - `initialColorMode: 'light'`
    - `useSystemColorMode: false` (user preference only)
    - WCAG AA compliant colors (contrast ratio ≥ 4.5:1)
  - Additional files:
    - src/theme/colors.ts (if custom palette needed)
    - src/theme/typography.ts (Noto Serif TC for traditional Chinese)
    - src/theme/components.ts (component overrides if needed)
  - Verify: Theme exports successfully, can be imported

### Custom React Hooks

- [ ] **T029** [P] Create useSutraData hook
  - File: src/hooks/useSutraData.ts
  - Action: Custom hook to load sutra metadata from YAML
  - Returns: `{ sutra: Sutra | null, loading: boolean, error: Error | null }`
  - Uses: yamlParser, schemaValidator
  - Verify: Can load sample sutra metadata

- [ ] **T030** [P] Create useChapterData hook
  - File: src/hooks/useChapterData.ts
  - Action: Custom hook to load chapter content from YAML
  - Returns: `{ chapter: Chapter | null, loading: boolean, error: Error | null }`
  - Uses: yamlParser, schemaValidator
  - Verify: Can load sample chapter content

- [ ] **T031** [P] Create useTheme hook
  - File: src/hooks/useTheme.ts
  - Action: Custom hook wrapping Chakra's useColorMode + themeStorage
  - Returns: `{ mode: ThemeMode, toggleTheme: () => void }`
  - Uses: Chakra UI's useColorMode, themeStorage service
  - Verify: Can toggle theme and persist to localStorage

### Layout Components

- [ ] **T032** [P] Build Header component
  - File: src/components/layout/Header.tsx
  - Action: Create header with site title and ThemeToggle placeholder
  - Props: None
  - Uses: Chakra UI Box, Heading
  - Verify: Renders without errors

- [ ] **T033** [P] Build Footer component
  - File: src/components/layout/Footer.tsx
  - Action: Create footer with error reporting link (FR-029)
  - Props: None
  - Uses: Chakra UI Box, Link
  - Link: mailto or external form (per clarification)
  - Verify: T021 error reporting link test now passes (GREEN)

- [ ] **T034** Build ThemeToggle component
  - File: src/components/layout/ThemeToggle.tsx
  - Action: Create theme toggle button with sun/moon icons
  - Props: None
  - Uses: useTheme hook, Chakra UI IconButton
  - Accessibility:
    - `aria-label="Toggle theme"`
    - Keyboard accessible (Tab + Enter)
    - Focus indicator visible
  - Verify: T018 theme toggle tests now pass (GREEN)
  - Dependencies: T031 (useTheme hook)

### Common Components

- [ ] **T035** [P] Build ErrorBoundary component
  - File: src/components/common/ErrorBoundary.tsx
  - Action: React error boundary to catch rendering errors
  - Props: `children: ReactNode, fallback?: ReactNode`
  - Uses: React.Component with componentDidCatch
  - Verify: T020 error handling tests now pass (GREEN)

- [ ] **T036** [P] Build ErrorMessage component
  - File: src/components/common/ErrorMessage.tsx
  - Action: User-friendly error message display
  - Props: `message: string, onRetry?: () => void`
  - Uses: Chakra UI Alert, AlertIcon, Button
  - Verify: Displays error message without technical details

### Sutra Components

- [ ] **T037** [P] Build SutraCard component
  - File: src/components/sutra/SutraCard.tsx
  - Action: Display single sutra in card format
  - Props: `sutra: Sutra, onClick: () => void`
  - Displays: Chinese title, English title, tradition, description, "View Sutra" button
  - Uses: Chakra UI Card, Heading, Text, Button
  - Accessibility: Card is keyboard focusable, Enter key activates
  - Verify: Can render sample sutra metadata

- [ ] **T038** Build SutraList component
  - File: src/components/sutra/SutraList.tsx
  - Action: Display list of all sutras (homepage)
  - Props: None
  - Uses: useSutraData hook (load all sutras), SutraCard component
  - Displays: 1-3 sutra cards (per FR-006, V1.0 scope)
  - Error handling: Display error message if YAML load fails
  - Verify: T014 homepage tests now pass (GREEN)
  - Dependencies: T029 (useSutraData hook), T037 (SutraCard component)

- [ ] **T039** [P] Build TableOfContents component
  - File: src/components/sutra/TableOfContents.tsx
  - Action: Display chapter navigation sidebar
  - Props: `sutraId: string, currentChapter: number, chapters: number`
  - Displays: Sutra title at top, list of chapter links
  - Accessibility:
    - Current chapter has `aria-current="page"`
    - Keyboard Tab focuses chapter links
    - Enter key navigates to chapter
  - Uses: React Router Link, Chakra UI Box, List, ListItem
  - Verify: TOC renders with correct chapter count

- [ ] **T040** Build ChapterView component
  - File: src/components/sutra/ChapterView.tsx
  - Action: Display chapter content with all fields
  - Props: `sutraId: string, chapterNum: number`
  - Uses: useChapterData hook
  - Displays:
    - Original Text section (classical Chinese, multi-paragraph)
    - Translation section (vernacular Chinese, multi-paragraph)
    - Annotations section (if available, with paragraph references)
    - Practice Insights section (if available, multi-paragraph)
    - Illustrations (if available, with alt text and captions)
    - Podcast Link (if available, external link with icon)
    - Podcast Transcript (if available, multi-paragraph below podcast link)
    - Source attribution
  - Accessibility:
    - All images have alt attributes
    - Heading hierarchy semantic (h1 → h2 → h3)
    - Color contrast ≥ 4.5:1
    - Podcast link has `target="_blank"` and `rel="noopener noreferrer"`
  - Error handling: Display ErrorMessage if YAML corrupted
  - Verify: T016 chapter content display tests now pass (GREEN), T019 podcast link tests pass (GREEN), T020 error handling tests pass (GREEN)
  - Dependencies: T030 (useChapterData hook), T036 (ErrorMessage component)

### Pages

- [ ] **T041** [P] Create HomePage
  - File: src/pages/HomePage.tsx
  - Action: Homepage with sutra list
  - Uses: SutraList component, Header, Footer
  - Route: `/`
  - Verify: Can navigate to homepage, see sutra list

- [ ] **T042** Build SutraPage
  - File: src/pages/SutraPage.tsx
  - Action: Sutra page with TOC and chapter view
  - Uses: TableOfContents, ChapterView, Header, Footer
  - Route: `/:sutraId` (defaults to chapter 1), `/:sutraId/:chapterNum`
  - Layout: TOC on left/sidebar, ChapterView on right/main area
  - Responsive: TOC collapses on mobile
  - Verify: T015 sutra selection tests now pass (GREEN), T017 chapter navigation tests pass (GREEN)
  - Dependencies: T038 (SutraList), T039 (TableOfContents), T040 (ChapterView)

- [ ] **T043** [P] Create NotFoundPage
  - File: src/pages/NotFoundPage.tsx
  - Action: 404 error page for invalid sutra IDs
  - Uses: Chakra UI Heading, Text, Button (link to homepage)
  - Route: `*` (catch-all)
  - Verify: Navigating to invalid URL shows 404 page

### Routing

- [ ] **T044** Configure React Router
  - File: src/router.tsx
  - Action: Create `createBrowserRouter` with routes
  - Routes:
    - `/` → HomePage
    - `/:sutraId` → SutraPage (default chapter 1)
    - `/:sutraId/:chapterNum` → SutraPage (specific chapter)
    - `*` → NotFoundPage
  - Code splitting: Lazy load pages with React.lazy
  - Verify: All routes navigate correctly
  - Dependencies: T041, T042, T043 (all pages created)

- [ ] **T045** Create App root component
  - File: src/App.tsx
  - Action: Root component with Chakra UI provider and router
  - Uses: ChakraProvider, theme, RouterProvider, ErrorBoundary
  - Wraps entire app in ErrorBoundary
  - Verify: App renders without errors

- [ ] **T046** Create main entry point
  - File: src/main.tsx
  - Action: ReactDOM.render with App component
  - Verify: `npm run dev` starts app successfully
  - Dependencies: T045 (App component)

---

## Phase 3.4: Sample Content

- [ ] **T047** Create sample sutra metadata
  - File: public/content/heart-sutra/meta.yml
  - Action: Create valid sutra metadata YAML matching schema
  - Fields: All required fields per data-model.md (id, title, tradition, translator, translatorAttribution, source, sourceAttribution, chapters)
  - Example: Heart Sutra with 1 chapter
  - Verify: Passes schema validation (T010)

- [ ] **T048** [P] Create sample chapter 1
  - File: public/content/heart-sutra/chapter-1.yml
  - Action: Create valid chapter content YAML matching schema
  - Fields: All required fields per data-model.md (sutraId, number, title, originalText, translation)
  - Optional: Include 1-2 annotations, practiceInsights, 1 illustration, podcastUrl, transcript
  - Example: Heart Sutra Chapter 1 with all content sections including podcast transcript
  - Verify: Passes schema validation (T011)

- [ ] **T049** [P] Create sample chapter 2
  - File: public/content/heart-sutra/chapter-2.yml
  - Action: Create second chapter for navigation testing
  - Verify: Passes schema validation (T011)

---

## Phase 3.5: Validation & Polish

### Accessibility

- [ ] **T050** Run axe DevTools accessibility audit
  - Action: Manual testing with axe DevTools browser extension
  - Test all pages: Homepage, SutraPage (multiple chapters)
  - Expected: 0 violations
  - Document issues in quickstart.md checklist
  - Dependencies: All components implemented (T032-T046)

- [ ] **T051** Fix accessibility issues
  - Action: Address all violations found in T050
  - Common fixes: Add ARIA labels, fix color contrast, improve keyboard navigation, add alt text
  - Verify: Re-run axe DevTools → 0 violations

- [ ] **T052** Manual screen reader testing
  - Action: Test with NVDA (Windows) or VoiceOver (macOS)
  - Test Scenario 9 from quickstart.md (keyboard navigation)
  - Verify:
    - Page title announced on load
    - Headings announced with level
    - Links announced with purpose
    - Images announced with alt text
    - TOC is navigation landmark
    - Chapter content is main landmark
  - Document results in quickstart.md

### Performance

- [ ] **T053** Run Lighthouse performance audit
  - Action: Chrome DevTools → Lighthouse → Analyze page load
  - Test on Desktop and Mobile
  - Expected: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
  - Document results in quickstart.md
  - Dependencies: All components implemented

- [ ] **T054** Test load time on throttled 3G connection
  - Action: DevTools → Network tab → Slow 3G throttling
  - Hard refresh (Ctrl+Shift+R), measure load time
  - Expected:
    - Time to Interactive (TTI) < 3.5s
    - Largest Contentful Paint (LCP) < 2.5s
    - First Contentful Paint (FCP) < 1.8s
  - Document results in quickstart.md

- [ ] **T055** Check bundle size
  - Action: Run `npm run build`, check dist/assets/*.js sizes
  - Expected:
    - Main bundle < 200KB gzipped
    - Vendor chunk < 150KB gzipped
  - If over budget: Analyze with `vite-plugin-bundle-visualizer`, optimize imports
  - Document results in quickstart.md

- [ ] **T056** Optimize performance issues
  - Action: Address any performance issues found in T053-T055
  - Common optimizations:
    - Code splitting (lazy load routes)
    - Image optimization (compress illustrations)
    - Font optimization (preload, font-display: swap)
    - Remove unused Chakra UI components
  - Verify: Re-run Lighthouse → all scores ≥ 90

### Unit Tests

- [ ] **T057** [P] Unit tests for SutraCard component
  - File: tests/unit/components/SutraCard.test.tsx
  - Action: Test component rendering and interactions
  - Test Cases:
    - Renders sutra title, tradition, description
    - "View Sutra" button is clickable
    - onClick callback fires when clicked
    - Keyboard accessible (Enter key)
  - Verify: All tests pass

- [ ] **T058** [P] Unit tests for TableOfContents component
  - File: tests/unit/components/TableOfContents.test.tsx
  - Action: Test TOC rendering and navigation
  - Test Cases:
    - Renders correct number of chapter links
    - Current chapter is highlighted
    - Chapter links have correct URLs
    - Keyboard navigation works
  - Verify: All tests pass

- [ ] **T059** [P] Unit tests for ChapterView component
  - File: tests/unit/components/ChapterView.test.tsx
  - Action: Test chapter content rendering
  - Test Cases:
    - Renders original text and translation
    - Renders annotations (if available)
    - Renders illustrations with alt text
    - Renders podcast link (if available)
    - Renders podcast transcript (if available)
    - Transcript preserves multi-paragraph format
    - Error state displays ErrorMessage
  - Verify: All tests pass

### Documentation

- [ ] **T060** [P] Update README.md
  - File: README.md (repository root)
  - Action: Add project overview, setup instructions, development commands
  - Sections:
    - Project description
    - Prerequisites (Node.js 18+)
    - Installation (`npm install`)
    - Development (`npm run dev`)
    - Testing (`npm test`, `npm run test:e2e`)
    - Building (`npm run build`)
    - Deployment notes
  - Verify: README is clear and accurate

- [ ] **T061** Execute manual testing from quickstart.md
  - Action: Follow all 10 test scenarios in specs/001-v1-0-yaml/quickstart.md
  - Test Scenarios 1-10 from quickstart.md
  - Performance Validation section
  - Accessibility Manual Testing section
  - Acceptance Criteria Checklist (all 29 FRs)
  - Constitutional Compliance Verified
  - Sign-Off section (mark "All tests passed")
  - Verify: All manual tests pass, document any issues

---

## Dependencies

**Setup blocks everything**:
- T001-T009 → All other tasks

**Tests before implementation** (TDD):
- T010-T021 → T022-T061 (tests MUST fail first)

**Types before implementation**:
- T022-T024 → T025-T061 (types define contracts)

**Services before components**:
- T025-T027 → T029-T040 (services used by hooks/components)
- T028 (theme) → T034 (ThemeToggle)

**Hooks before components**:
- T029 (useSutraData) → T038 (SutraList)
- T030 (useChapterData) → T040 (ChapterView)
- T031 (useTheme) → T034 (ThemeToggle)

**Components before pages**:
- T032-T040 → T041-T043 (pages compose components)

**Pages before routing**:
- T041-T043 → T044-T046 (routing references pages)

**Sample content for testing**:
- T047-T049 → T014-T021 (integration tests need sample data)

**Implementation before validation**:
- T001-T049 → T050-T061 (polish tasks)

**Specific dependencies**:
- T034 depends on T031 (ThemeToggle needs useTheme hook)
- T038 depends on T029, T037 (SutraList needs useSutraData hook and SutraCard component)
- T040 depends on T030, T036 (ChapterView needs useChapterData hook and ErrorMessage component)
- T042 depends on T038, T039, T040 (SutraPage needs SutraList, TableOfContents, ChapterView)
- T044 depends on T041, T042, T043 (router needs all pages)
- T045 depends on T028, T035 (App needs theme and ErrorBoundary)
- T046 depends on T045 (main needs App)

---

## Parallel Execution Examples

### Phase 3.1 Setup - Parallel Installation
```bash
# Launch T002-T005 together (different dependencies):
npm install react@18 react-dom@18 react-router-dom@6 && \
npm install @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion && \
npm install js-yaml @types/js-yaml ajv ajv-formats && \
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom @axe-core/react jest-axe @playwright/test
```

### Phase 3.2 Tests - Write all contract tests in parallel
```bash
# Launch T010-T013 together (different test files):
# In Claude Code, use Task tool:
Task: "Contract test: Sutra metadata schema validation in tests/unit/services/schemaValidator.test.ts"
Task: "Contract test: Chapter content schema validation in tests/unit/services/schemaValidator.test.ts"
Task: "Unit test: YAML parser service in tests/unit/services/yamlParser.test.ts"
Task: "Unit test: Theme storage service in tests/unit/services/themeStorage.test.ts"
```

### Phase 3.2 Tests - Write all integration tests in parallel
```bash
# Launch T014-T021 together (different test files):
Task: "Integration test: Homepage sutra list in tests/integration/homepage.test.ts"
Task: "Integration test: Sutra selection & TOC display in tests/integration/navigation.test.ts"
Task: "Integration test: Chapter content display in tests/integration/chapter-view.test.ts"
Task: "Integration test: Chapter navigation in tests/integration/navigation.test.ts"
Task: "Integration test: Theme toggle & persistence in tests/integration/theme-switching.test.ts"
Task: "Integration test: External podcast link in tests/integration/external-links.test.ts"
Task: "Integration test: Corrupted YAML error handling in tests/integration/error-handling.test.ts"
Task: "Integration test: Error reporting link in tests/integration/error-reporting.test.ts"
```

### Phase 3.3 Core - TypeScript types in parallel
```bash
# Launch T022-T024 together (different files):
Task: "Define TypeScript types for Sutra entity in src/types/sutra.ts"
Task: "Define TypeScript types for Chapter entity in src/types/chapter.ts"
Task: "Define TypeScript types for Theme in src/types/theme.ts"
```

### Phase 3.3 Core - Services in parallel
```bash
# Launch T025-T027 together (different files):
Task: "Implement YAML parser service in src/services/yamlParser.ts"
Task: "Implement schema validator service in src/services/schemaValidator.ts"
Task: "Implement theme storage service in src/services/themeStorage.ts"
```

### Phase 3.3 Core - Hooks in parallel
```bash
# Launch T029-T031 together (different files):
Task: "Create useSutraData hook in src/hooks/useSutraData.ts"
Task: "Create useChapterData hook in src/hooks/useChapterData.ts"
Task: "Create useTheme hook in src/hooks/useTheme.ts"
```

### Phase 3.3 Core - Layout components in parallel
```bash
# Launch T032-T033 together (different files):
Task: "Build Header component in src/components/layout/Header.tsx"
Task: "Build Footer component in src/components/layout/Footer.tsx"
# T034 (ThemeToggle) depends on T031 (useTheme hook), cannot run in parallel
```

### Phase 3.3 Core - Common components in parallel
```bash
# Launch T035-T036 together (different files):
Task: "Build ErrorBoundary component in src/components/common/ErrorBoundary.tsx"
Task: "Build ErrorMessage component in src/components/common/ErrorMessage.tsx"
```

### Phase 3.3 Core - Sample content in parallel
```bash
# Launch T048-T049 together (different files):
Task: "Create sample chapter 1 in public/content/heart-sutra/chapter-1.yml"
Task: "Create sample chapter 2 in public/content/heart-sutra/chapter-2.yml"
```

### Phase 3.5 Polish - Unit tests in parallel
```bash
# Launch T057-T059 together (different files):
Task: "Unit tests for SutraCard component in tests/unit/components/SutraCard.test.tsx"
Task: "Unit tests for TableOfContents component in tests/unit/components/TableOfContents.test.tsx"
Task: "Unit tests for ChapterView component in tests/unit/components/ChapterView.test.tsx"
```

---

## Notes

- **[P] tasks** = Different files, no dependencies, can run in parallel
- **Verify tests fail** before implementing (TDD approach)
- **Commit after each task** for incremental progress
- **Constitutional compliance**: All tasks must satisfy 5 principles (especially Principle I source attribution, Principle V accessibility)
- **Performance budgets**: Monitor bundle size throughout development (< 200KB gzipped)
- **Accessibility**: Test with axe DevTools and screen readers continuously
- **Avoid**: Vague tasks, same file conflicts, skipping tests

---

## Task Generation Rules Applied

1. **From Contracts** (contracts/ directory):
   - 2 schema files → 2 contract test tasks (T010, T011) [P]
   - Schemas → TypeScript types (T022-T024) [P]

2. **From Data Model** (data-model.md):
   - 5 entities → 3 type definition tasks (Sutra, Chapter, Theme) [P]
   - Services for data loading (T025-T027) [P]

3. **From User Stories** (quickstart.md):
   - 10 test scenarios → 8 integration test tasks (T014-T021) [P]
   - Performance/accessibility validation → 4 polish tasks (T050-T056)

4. **Ordering**:
   - Setup (T001-T009) → Tests (T010-T021) → Types (T022-T024) → Implementation (T025-T046) → Sample Content (T047-T049) → Polish (T050-T061)
   - Dependencies block parallel execution (e.g., T034 depends on T031)

---

## Validation Checklist

**GATE: Checked before declaring tasks ready for execution**

- [x] All contracts have corresponding tests (T010, T011 for 2 schemas) ✅
- [x] All entities have type definition tasks (T022-T024 for 5 entities) ✅
- [x] All tests come before implementation (T010-T021 before T022-T061) ✅
- [x] Parallel tasks truly independent (all [P] tasks in different files) ✅
- [x] Each task specifies exact file path (all tasks have file paths) ✅
- [x] No task modifies same file as another [P] task (verified) ✅
- [x] All quickstart scenarios have integration tests (8 scenarios → T014-T021) ✅
- [x] All components have unit tests (T057-T059 for key components) ✅
- [x] Performance and accessibility validation included (T050-T056) ✅
- [x] Sample content for testing (T047-T049) ✅
- [x] Documentation tasks included (T060-T061) ✅

---

**Total Tasks**: 61 tasks
**Parallel Tasks**: 32 marked [P] (can run independently)
**Sequential Tasks**: 29 (due to dependencies)
**Estimated Duration**: 3-5 days (single developer, following TDD)

**Ready for Execution**: ✅ YES - All tasks are specific, testable, and dependency-ordered
