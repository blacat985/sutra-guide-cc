# Sutra Guide Website V1.0

虛廣禪苑 - A Buddhist sutra study website built with React, TypeScript, and Chakra UI.

## Features

- 📖 Display 1-3 Buddhist sutras with chapter-by-chapter content
- 🌓 Light/Dark theme toggle with localStorage persistence
- ♿ WCAG 2.1 Level AA accessibility compliance
- 🚀 Fast performance (<2s load on 3G)
- 🎨 Beautiful, distraction-free reading experience
- 📝 YAML-based content management
- 🔍 Schema validation for data integrity

## Prerequisites

- Node.js 18+
- npm 8+

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Footer, ThemeToggle
│   ├── sutra/          # SutraList, SutraCard, TableOfContents, ChapterView
│   └── common/         # ErrorBoundary, ErrorMessage
├── hooks/              # Custom React hooks
│   ├── useSutraData.ts
│   ├── useChapterData.ts
│   └── useTheme.ts
├── services/           # Business logic
│   ├── yamlParser.ts
│   ├── schemaValidator.ts
│   └── themeStorage.ts
├── types/              # TypeScript definitions
├── theme/              # Chakra UI theme
├── pages/              # Route pages
├── App.tsx             # Root component
├── router.tsx          # React Router config
└── main.tsx            # Entry point

public/content/         # Sutra YAML files
tests/                  # Unit, integration, E2E tests
specs/001-v1-0-yaml/    # Feature specification and design docs
```

## Content Management

Content is stored in YAML files under `public/content/{sutra-id}/`:

- `meta.yml` - Sutra metadata
- `chapter-N.yml` - Chapter content

See `specs/001-v1-0-yaml/contracts/` for JSON schemas.

## Technology Stack

- **Frontend**: React 18, TypeScript 5.x
- **UI Framework**: Chakra UI 2.x
- **Routing**: React Router 6
- **Build Tool**: Vite
- **YAML Parsing**: js-yaml
- **Schema Validation**: Ajv
- **Testing**: Vitest, React Testing Library, Playwright, axe-core

## Performance Targets

- Initial load: <2s on 3G
- Chapter navigation: <500ms
- Bundle size: <200KB gzipped
- Lighthouse score: >90 (all categories)

## Accessibility

- WCAG 2.1 Level AA compliant
- Color contrast ratio ≥ 4.5:1
- Full keyboard navigation
- Screen reader support
- axe-core automated testing

## Constitutional Principles

This project adheres to 5 core principles:

1. **Content Sanctity** - All content includes source attribution
2. **Pure Experience** - Fast, clean, no ads or distractions
3. **Tech Consistency** - React + Chakra UI stack
4. **Structured Content** - YAML with schema validation
5. **Accessibility First** - WCAG AA compliance

## License

© 2025 Sutra Guide. All rights reserved.

## Contributing

This is a personal project. For feedback or bug reports, please use the error reporting link in the application footer.
