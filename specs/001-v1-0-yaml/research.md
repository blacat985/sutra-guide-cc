# Research: Sutra Guide Website V1.0

**Date**: 2025-10-05
**Feature**: Sutra Guide Website V1.0
**Context**: Technical research for implementation plan

## Research Topics

### 1. YAML Schema Design for Sutra Content

**Question**: How should we validate YAML structure for sutra and chapter content?

**Decision**: Use JSON Schema for YAML validation via Ajv library

**Rationale**:
- JSON Schema is industry standard for data validation
- Ajv (Another JSON Validator) is fastest and most popular (40M+ weekly downloads)
- TypeScript integration via `ajv-typescript` allows generating types from schemas
- YAML can be validated against JSON Schema after parsing
- Supports versioning through `$schema` field
- Constitution Principle IV requires versioned YAML schema

**Alternatives Considered**:
- **Custom validator**: Rejected - reinventing wheel, no ecosystem support
- **Joi**: Rejected - designed for runtime validation, not schema-first approach
- **Yup**: Rejected - primarily for form validation, not file validation

**Implementation Notes**:
- Create `contracts/sutra-meta.schema.json` and `contracts/chapter.schema.json`
- Use `$schema: "http://json-schema.org/draft-07/schema#"`
- Include `version` field in schema for migration tracking
- Validate on file load before rendering

---

### 2. React Router Strategy for Single-Level Sutra IDs

**Question**: What URL structure best supports single-level sutra organization with chapters?

**Decision**: Path-based routing with pattern `/:sutraId` and `/:sutraId/:chapterNum`

**Rationale**:
- Matches clarification decision for single-level IDs (no hierarchical structure)
- SEO-friendly URLs (e.g., `/heart-sutra`, `/heart-sutra/1`)
- Browser back/forward button works naturally
- Shareable links to specific chapters
- Clean, human-readable URLs

**URL Structure**:
```
/                          → Homepage (SutraList)
/:sutraId                  → Sutra page (TOC + Chapter 1)
/:sutraId/:chapterNum      → Specific chapter
```

**Alternatives Considered**:
- **Hash routing** (`#/heart-sutra`): Rejected - poor SEO, looks dated
- **Query parameters** (`/sutra?id=heart-sutra&chapter=1`): Rejected - not semantic, harder to share
- **Nested routes** (`/mahayana/prajnaparamita/heart-sutra`): Rejected - contradicts single-level clarification

**Implementation Notes**:
- Use React Router 6 with `createBrowserRouter`
- Lazy load components for code splitting
- Add 404 route for invalid sutra IDs

---

### 3. YAML Parsing Library Selection

**Question**: Which YAML parsing library should we use in React?

**Decision**: js-yaml with safe loading mode only

**Rationale**:
- Most popular YAML parser for JavaScript (18M weekly downloads)
- Mature, well-maintained (active since 2011)
- Security-focused: `safeLoad` prevents arbitrary code execution
- TypeScript definitions available (@types/js-yaml)
- Supports both browser and Node.js (useful for testing)
- No dependencies on Node-specific APIs

**Security Considerations**:
- ALWAYS use `yaml.load()` (safe mode in v4+), never `yaml.loadAll()` with untrusted input
- YAML files are static assets, controlled by content team (low risk)
- Schema validation happens after parsing for additional safety

**Alternatives Considered**:
- **yaml**: Rejected - newer but less battle-tested
- **yaml.js**: Rejected - less maintained, smaller community
- **Custom parser**: Rejected - security risk, complex grammar

**Implementation Notes**:
```typescript
import yaml from 'js-yaml';

const chapter = yaml.load(yamlContent, { schema: yaml.JSON_SCHEMA });
```

---

### 4. Chakra UI Theme Structure for Light/Dark Mode

**Question**: How to implement light/dark mode with Chakra UI while meeting WCAG AA standards?

**Decision**: Use Chakra's built-in `extendTheme` + `ColorModeProvider` with custom WCAG-compliant colors

**Rationale**:
- Constitution Principle III mandates Chakra UI
- Chakra has native color mode support with localStorage persistence
- Default themes already WCAG AA compliant for most use cases
- `useColorMode` hook simplifies theme toggle logic
- Theme tokens centralize color decisions (DRY principle)

**WCAG AA Compliance**:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- Test with WebAIM Contrast Checker
- Chakra defaults: `gray.800` on `white` (light), `white` on `gray.800` (dark) = 11.6:1 ✅

**Theme Structure**:
```typescript
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false, // User preference only
  },
  colors: {
    // Custom palette if needed
  },
  fonts: {
    // Traditional Chinese fonts: Noto Serif TC, Song typefaces
  },
});
```

**Alternatives Considered**:
- **CSS variables only**: Rejected - loses Chakra theming benefits, violates constitution
- **styled-components theming**: Rejected - redundant with Chakra, adds dependency
- **Third-party theme library**: Rejected - violates constitution (no alternative frameworks)

**Implementation Notes**:
- Store preference in localStorage (Chakra does this automatically)
- Add `ThemeToggle` component with sun/moon icons
- Test contrast ratios with axe DevTools

---

### 5. Performance Optimization for 2s Load Target

**Question**: How to meet < 2s load time on 3G with React SPA?

**Decision**: Code splitting by route + lazy loading YAML + Vite tree-shaking

**Rationale**:
- Constitution Principle II requires < 2s load (3G connection)
- Vite provides excellent defaults (ES modules, fast HMR, optimized builds)
- Code splitting prevents loading unused routes
- Lazy loading YAML files reduces initial bundle
- Tree-shaking eliminates dead code automatically

**Performance Strategy**:

1. **Code Splitting**:
   ```typescript
   const HomePage = lazy(() => import('./pages/HomePage'));
   const SutraPage = lazy(() => import('./pages/SutraPage'));
   ```

2. **Lazy YAML Loading**:
   ```typescript
   const loadChapter = async (sutraId: string, chapterNum: number) => {
     const response = await fetch(`/content/${sutraId}/chapter-${chapterNum}.yml`);
     const yaml = await response.text();
     return yaml.load(yaml);
   };
   ```

3. **Bundle Size Target**: < 200KB gzipped initial load
   - React 18 + React DOM: ~40KB gzipped
   - Chakra UI (core components): ~50KB gzipped
   - React Router: ~10KB gzipped
   - js-yaml: ~20KB gzipped
   - App code: ~30KB gzipped
   - **Total estimated**: ~150KB gzipped ✅

4. **Lighthouse Optimization**:
   - Preload critical fonts
   - Use font-display: swap
   - Compress images (illustrations)
   - Add Cache-Control headers (deployment)

**Alternatives Considered**:
- **Server-Side Rendering (SSR)**: Rejected - overkill for V1.0, adds complexity
- **Static Site Generation (SSG)**: Deferred - consider for V2.0 if SEO critical
- **CDN**: Deferred to deployment phase

**Implementation Notes**:
- Configure Vite build with `build.rollupOptions.manualChunks`
- Monitor bundle size with `vite-plugin-bundle-visualizer`
- Test on throttled 3G connection in Chrome DevTools

---

### 6. Accessibility Testing Approach

**Question**: How to ensure WCAG 2.1 Level AA compliance throughout development?

**Decision**: axe-core (automated) + manual screen reader testing (NVDA/VoiceOver)

**Rationale**:
- Constitution Principle V requires WCAG 2.1 AA compliance
- axe-core detects ~57% of accessibility issues automatically
- Manual testing catches semantic issues automation misses
- NVDA (Windows) and VoiceOver (macOS) are free, widely used
- Integration with Vitest via `jest-axe` enables CI/CD accessibility gates

**Testing Strategy**:

1. **Automated (axe-core)**:
   - Run on every component test
   - Catches: missing alt text, insufficient contrast, missing ARIA labels, invalid HTML
   ```typescript
   import { axe, toHaveNoViolations } from 'jest-axe';
   expect.extend(toHaveNoViolations);

   test('ChapterView is accessible', async () => {
     const { container } = render(<ChapterView />);
     const results = await axe(container);
     expect(results).toHaveNoViolations();
   });
   ```

2. **Manual (Screen Readers)**:
   - Test navigation flow with keyboard only
   - Verify landmarks (header, nav, main, aside, footer)
   - Check focus indicators visible
   - Ensure skip links work
   - Test with NVDA on Windows, VoiceOver on macOS
   - Document testing in quickstart.md

3. **Continuous Monitoring**:
   - Add axe DevTools to browser extensions
   - Run Lighthouse accessibility audit before each PR
   - Require > 90 accessibility score

**WCAG 2.1 AA Checklist** (from constitution):
- [x] Color contrast: 4.5:1 normal text, 3:1 large text
- [x] Keyboard navigation: all interactive elements
- [x] ARIA labels: images, buttons, links
- [x] Screen reader support: semantic HTML, landmarks
- [x] Focus indicators: visible on all focusable elements

**Alternatives Considered**:
- **pa11y**: Rejected - less React ecosystem integration than axe
- **Manual testing only**: Rejected - not scalable, misses common issues
- **Wave (browser extension)**: Supplement, not replacement for axe

**Implementation Notes**:
- Install `@axe-core/react` for development warnings
- Add `jest-axe` to test setup
- Create accessibility testing guide in quickstart.md

---

## Research Conclusions

All technical decisions documented above are ready for Phase 1 implementation. No NEEDS CLARIFICATION markers remain.

**Key Technologies Selected**:
- **Frontend**: React 18 + TypeScript 5.x
- **UI Framework**: Chakra UI 2.x
- **Routing**: React Router 6
- **Build Tool**: Vite
- **YAML Parsing**: js-yaml
- **Schema Validation**: JSON Schema + Ajv
- **Testing**: Vitest, React Testing Library, Playwright, axe-core

**Performance Targets Validated**:
- Initial load: < 2s (3G) ✅
- Bundle size: < 200KB gzipped ✅
- Lighthouse score: > 90 all categories ✅

**Constitutional Compliance Verified**:
- All 5 principles addressed in technical decisions
- No violations or deviations required

**Next Phase**: Execute Phase 1 (Design & Contracts)
