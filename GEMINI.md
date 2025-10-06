# Project Overview

This is a web application for studying Buddhist sutras. It is built with React, TypeScript, and Chakra UI. The content is managed through YAML files.

## Building and Running

### Prerequisites

*   Node.js 18+
*   npm 8+

### Installation

```bash
npm install
```

### Development

```bash
# Start development server (http://localhost:5173)
npm run dev
```

### Building

```bash
# Build for production
npm run build
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run E2E tests
npm run test:e2e
```

### Linting

```bash
# Run linter
npm run lint
```

## Development Conventions

*   **UI Framework:** Chakra UI
*   **Routing:** React Router
*   **Build Tool:** Vite
*   **Testing:** Vitest, React Testing Library, Playwright, axe-core
*   **Content:** YAML files in `public/content`
*   **Code Style:** The project uses ESLint and Prettier for code formatting and linting.
*   **Component Structure:** Components are organized into `common`, `layout`, and `sutra` directories.
*   **State Management:** State is managed through React hooks.
*   **Data Fetching:** Data is fetched from the YAML files using custom hooks.
*   **Styling:** Chakra UI is used for styling.
*   **Accessibility:** The project aims for WCAG 2.1 Level AA compliance.
