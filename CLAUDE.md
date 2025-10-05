# sutra-guide-cc Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-06

## Active Technologies
- JavaScript ES2022+ / TypeScript 5.x + React 18, Chakra UI 2.x, React Router 6, js-yaml (YAML parser), Vite (build tool) (001-v1-0-yaml)

## Project Structure
```
src/
tests/
```

## Commands
npm test [ONLY COMMANDS FOR ACTIVE TECHNOLOGIES][ONLY COMMANDS FOR ACTIVE TECHNOLOGIES] npm run lint

## Code Style
JavaScript ES2022+ / TypeScript 5.x: Follow standard conventions

## Recent Changes
- 001-v1-0-yaml: Added JavaScript ES2022+ / TypeScript 5.x + React 18, Chakra UI 2.x, React Router 6, js-yaml (YAML parser), Vite (build tool)

<!-- MANUAL ADDITIONS START -->

## Development Best Practices

### Library Version Management
- **ALWAYS** use the context7 tool to query the latest library versions and documentation before writing code
- Verify compatibility between library versions
- Check for breaking changes in latest releases
- Consult official documentation for current best practices
- Example workflow:
  1. Before implementing a feature with React Router, query: `context7 resolve-library-id "react-router"`
  2. Then query: `context7 get-library-docs` with the returned library ID
  3. Review the latest API patterns before writing code

### Why This Matters
- Libraries evolve rapidly (breaking changes, deprecated APIs, new features)
- Using outdated patterns can introduce technical debt
- Latest documentation ensures optimal performance and best practices
- Reduces debugging time from version incompatibilities

## Implementation Tools

### Code Writing
- **Use Serena MCP** for semantic code editing and file operations
- Serena provides symbol-level tools for precise editing (find_symbol, replace_symbol_body, etc.)
- Read code intelligently - use overview tools and symbolic tools to read only necessary code
- Leverage memory files for codebase knowledge

### Testing & Debugging
- **Use Playwright MCP** for E2E testing and browser debugging
- Playwright provides browser automation tools:
  - `browser_navigate`: Navigate to URLs
  - `browser_snapshot`: Capture accessibility snapshots (better than screenshots)
  - `browser_click`, `browser_type`: Interact with elements
  - `browser_take_screenshot`: Visual debugging when needed
  - `browser_console_messages`: Check for errors
- Use Playwright for manual testing scenarios from quickstart.md
- Debug UI issues with browser inspection tools

### Development Workflow
1. **Before writing code**: Query context7 for latest library documentation
2. **During implementation**: Use Serena for precise code editing
3. **For testing**: Use Playwright MCP to automate browser testing
4. **For debugging**: Use Playwright to inspect live application state

<!-- MANUAL ADDITIONS END -->